const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const API_KEY = '';
const API_URL = 'https://api.sree.shop/v1';

exports.costestimation = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one image file is required' });
    }

    const {
        vehicleType,
        vehicleCompany,
        vehicleName,
        model,
        fuelType,
        damagedAreas,
        location
    } = req.body;

    try {
        // Limit number of images to 2 (optional, helps keep payload small)
        const selectedFiles = req.files.slice(0, 2);

        // Resize & compress images, then convert to base64
        const base64Images = await Promise.all(
            selectedFiles.map(async (file) => {
                const resizedBuffer = await sharp(file.path)
                    .resize({ width: 600 }) // Resize to width of 600px
                    .jpeg({ quality: 60 })  // Reduce quality to shrink size
                    .toBuffer();
                return resizedBuffer.toString('base64');
            })
        );

        const prompt = `
You are an expert automobile damage assessor AI. Based on the provided vehicle details and images, return a structured JSON with:

{
  "vehicleCompany": "...",
  "vehicleName": "...",
  "model": "...",
  "fuelType": "...",
  "damagedAreas": [...],
  "estimatedRepairCost": "...",
  "damageSeverity": "...",
  "repairBreakdown": {
    "part1": "cost",
    "part2": "cost",
    ...
  },
  "remarks": "..."
}

Vehicle Details:
- Type: ${vehicleType}
- Company: ${vehicleCompany}
- Name: ${vehicleName}
- Model: ${model}
- Fuel Type: ${fuelType}
- Damaged Areas: ${damagedAreas}
- Location: ${location}

Images (base64 format):
${base64Images.map((img, i) => `Image ${i + 1}: ${img.substring(0, 200)}... [truncated]`).join('\n\n')}
        `;

        const response = await axios.post(
            `${API_URL}/chat/completions`,
            {
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const rawContent = response.data.choices[0].message.content;
        const jsonStart = rawContent.indexOf('{');
        const jsonEnd = rawContent.lastIndexOf('}');
        const extractedJSON = rawContent.slice(jsonStart, jsonEnd + 1);
        const parsedResult = JSON.parse(extractedJSON);

        res.status(200).json(parsedResult);

    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        res.status(500).json({
            message: 'Failed to get structured damage estimate',
            error: error.response?.data || error.message
        });
    } finally {
        req.files.forEach(file => fs.unlinkSync(file.path));
    }
};

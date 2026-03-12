// Convert complex quiz JSON format to simple format
const fs = require('fs');
const path = require('path');

function convertQuizFormat(inputData) {
    return inputData.map(question => {
        return {
            text: question.text,
            info: question.info || 'ไม่มีคำอธิบาย',
            difficulty: question.difficulty || 'medium',
            answers: question.answers.map(answer => ({
                text: answer.text,
                correct: answer.correct
            }))
        };
    });
}

// Process all JSON files in json directory
const jsonDir = path.join(__dirname, 'json');
const files = fs.readdirSync(jsonDir);

files.forEach(file => {
    if (!file.endsWith('.json')) return;
    
    const filePath = path.join(jsonDir, file);
    console.log(`Processing: ${file}`);
    
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        const inputData = JSON.parse(rawData);
        
        // Check if conversion is needed
        if (inputData.length > 0 && inputData[0].quiz_id !== undefined) {
            const convertedData = convertQuizFormat(inputData);
            fs.writeFileSync(filePath, JSON.stringify(convertedData, null, 2));
            console.log(`✅ Converted: ${file}`);
        } else {
            console.log(`⏭️  Skipped (already in correct format): ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
    }
});

console.log('\n✅ Conversion complete!');

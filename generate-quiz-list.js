// Node.js script to generate quiz-list.json dynamically
const fs = require('fs');
const path = require('path');

const jsonDir = path.join(__dirname, 'json');
const outputFile = path.join(__dirname, 'quiz-list.json');

try {
    // Read all files in json directory
    const files = fs.readdirSync(jsonDir);
    
    // Filter only .json files
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    // Write to quiz-list.json
    fs.writeFileSync(outputFile, JSON.stringify(jsonFiles, null, 2));
    
    console.log('✅ Generated quiz-list.json with', jsonFiles.length, 'quizzes:');
    jsonFiles.forEach(file => console.log('  -', file));
} catch (error) {
    console.error('❌ Error generating quiz-list.json:', error.message);
    process.exit(1);
}

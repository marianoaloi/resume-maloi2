#!/usr/bin/env node

/**
 * Security script to replace TinyMCE API key placeholder
 * Usage: node setup-api-key.js YOUR_API_KEY_HERE
 */

const fs = require('fs');
const path = require('path');

const API_KEY_PLACEHOLDER = '#$API_KEY_$#';

function replaceApiKeyInFile(filePath, apiKey) {
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: File ${filePath} not found`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes(API_KEY_PLACEHOLDER)) {
    console.log(`No placeholder found in ${filePath}`);
    return false;
  }

  const updatedContent = content.replace(new RegExp(API_KEY_PLACEHOLDER, 'g'), apiKey);
  fs.writeFileSync(filePath, updatedContent);
  console.log(`✅ Updated API key in ${filePath}`);
  return true;
}

function main() {
  const apiKey = process.argv[2];
  
  if (!apiKey) {
    console.error('Usage: node setup-api-key.js YOUR_API_KEY_HERE');
    console.error('Get your free API key from: https://www.tiny.cloud/get-tiny/');
    process.exit(1);
  }

  if (apiKey === API_KEY_PLACEHOLDER) {
    console.error('Please provide a real API key, not the placeholder');
    process.exit(1);
  }

  console.log('🔧 Setting up TinyMCE API key...');

  const filesToUpdate = [
    'angular-app/src/environments/environment.ts',
    'angular-app/src/environments/environment.prod.ts'
  ];

  let updatedFiles = 0;
  filesToUpdate.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (replaceApiKeyInFile(fullPath, apiKey)) {
      updatedFiles++;
    }
  });

  if (updatedFiles > 0) {
    console.log(`\\n✅ Successfully updated ${updatedFiles} files with API key`);
    console.log('⚠️  Remember to restart your development server if it\'s running');
    console.log('🔒 Keep your API key secure and never commit it to version control');
  } else {
    console.log('❌ No files were updated');
  }
}

if (require.main === module) {
  main();
}
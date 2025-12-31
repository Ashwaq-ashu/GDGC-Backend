// Install required packages first:
// npm install qrcode @supabase/supabase-js

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root directory
dotenv.config({ path: path.join(__dirname, '../.env') });

import QRCode from 'qrcode'
import { createClient } from '@supabase/supabase-js';
import Qr from '../src/models/Qrmodel.js';
import User from '../src/models/User.js';
import connectDB from '../src/mongodb/index.js';

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Debug: Check if environment variables are loaded
console.log('SUPABASE_URL:', SUPABASE_URL ? 'Loaded ✓' : 'Missing ✗');
console.log('SUPABASE_KEY:', SUPABASE_KEY ? 'Loaded ✓' : 'Missing ✗');

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('SUPABASE_URL:', SUPABASE_URL ? '✓' : '✗ Missing');
  console.error('SUPABASE_KEY:', SUPABASE_KEY ? '✓' : '✗ Missing');
  console.error('\nPlease check your .env file in the root directory.');
  process.exit(1);
}

const STORAGE_BUCKET = 'qrCodes'; // Create this bucket in Supabase

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to generate QR code as buffer
async function generateQRCode(url) {
  try {
    const qrBuffer = await QRCode.toBuffer(url, {
      errorCorrectionLevel: 'H',
      type: 'png',
      width: 500,
      margin: 2
    });
    return qrBuffer;
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
}

// Function to upload QR code to Supabase storage
async function uploadToSupabase(buffer, fileName) {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, buffer, {
        contentType: 'image/png',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (err) {
    console.error('Error uploading to Supabase:', err);
    throw err;
  }
}

// Function to insert record into database
async function insertRecord(id, destination, qrcode , authority , qrcodeurl) {
  try {
    const data = await Qr.create({
        id : id ,
        destination ,
        qrcode : qrcode ,
        qrcodeurl ,
        authority : authority ,
    })  
    return data;
  } catch (err) {
    console.error('Error inserting record:', err);
    throw err;
  }
}

// Main function to generate 50 QR codes
async function generateQRCodesForGB() {
  console.log('Starting QR code generation...');
  
  // Connect to MongoDB
  await connectDB();
  console.log('✅ Connected to MongoDB');

  for (let i = 1; i <= 10; i++) {
    try {
      const url = `https://api.gdgcmjcet.in/${i}`;
      const fileName = `qr-code-${i}.png`;
      
      console.log(`Generating QR code ${i}/50 for ${url}`);

      // Generate QR code
      const qrBuffer = await generateQRCode(url);

      // Upload to Supabase storage
      const publicUrl = await uploadToSupabase(qrBuffer, fileName);
      console.log(`Uploaded: ${publicUrl}`);
        
      // Insert record into database
      await insertRecord(i, `https://gdgcmjcet.in/initialSetup/${i}`, publicUrl , "gb" , url);
      console.log(`Record ${i} inserted successfully`);
      
    //   await createUser(username , password);
      
      // Optional: Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (err) {
      console.error(`Failed to process QR code ${i}:`, err);
    }
  }
  console.log('QR code generation completed!');
}

// async function createUser(id , username , password) {
//     const username = id + "%sos%" + Math.floor(Math.random()*50)
// }

async function generateQRCodesForExecom() {
  console.log('Starting QR code generation...');
  
  // Connect to MongoDB
  await connectDB();
  console.log('✅ Connected to MongoDB');

  for (let i = 11; i <= 40; i++) {
    try {
      const url = `https://api.gdgcmjcet.in/${i}`;
      const fileName = `qr-code-${i}.png`;
      
      console.log(`Generating QR code ${i}/50 for ${url}`);

      // Generate QR code
      const qrBuffer = await generateQRCode(url);

      // Upload to Supabase storage
      const publicUrl = await uploadToSupabase(qrBuffer, fileName);
      console.log(`Uploaded: ${publicUrl}`);

      // Insert record into database
      await insertRecord(i, `https://gdgcmjcet.in/initialSetup/${i}`, publicUrl , "execom" , url);
      console.log(`Record ${i} inserted successfully`);

      // Optional: Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (err) {
      console.error(`Failed to process QR code ${i}:`, err);
    }
  }
  console.log('QR code generation completed!');
}
async function generateQRCodesFornewCore_Execom() {
  console.log('Starting QR code generation...');
  
  // Connect to MongoDB
  await connectDB();
  console.log('✅ Connected to MongoDB');

  // for (let i = 41; i <= 70; i++) {
  //   try {
  //     const url = `https://api.gdgcmjcet.in/${i}`;
  //     const fileName = `qr-code-${i}.png`;
      
  //     console.log(`Generating QR code ${i}/50 for ${url}`);

  //     // Generate QR code
  //     const qrBuffer = await generateQRCode(url);

  //     // Upload to Supabase storage
  //     const publicUrl = await uploadToSupabase(qrBuffer, fileName);
  //     console.log(`Uploaded: ${publicUrl}`);

  //     // Insert record into database
  //     await insertRecord(i, `https://gdgcmjcet.in/initialSetup/${i}`, publicUrl , "execom" , url);
  //     console.log(`Record ${i} inserted successfully`);

  //     // Optional: Add a small delay to avoid rate limiting
  //     await new Promise(resolve => setTimeout(resolve, 100));

  //   } catch (err) {
  //     console.error(`Failed to process QR code ${i}:`, err);
  //   }
  // }
  for (let i = 151; i <= 160; i++) {
    try {
      const url = `https://api.gdgcmjcet.in/${i}`;
      const fileName = `qr-code-${i}.png`;
      
      console.log(`Generating QR code ${i}/50 for ${url}`);

      // Generate QR code
      const qrBuffer = await generateQRCode(url);

      // Upload to Supabase storage
      const publicUrl = await uploadToSupabase(qrBuffer, fileName);
      console.log(`Uploaded: ${publicUrl}`);

      // Insert record into database
      await insertRecord(i, `https://gdgcmjcet.in/initialSetup/${i}`, publicUrl , "core" , url);
      console.log(`Record ${i} inserted successfully`);

      // Optional: Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (err) {
      console.error(`Failed to process QR code ${i}:`, err);
    }
  }
  console.log('QR code generation completed!');
}

async function updateQRstuff() {
    const data = await Qr.updateMany({
        destination : "https://gdgcmjcet.in/user/initialSetup"
    })
}

// Run the script
// generateQRCodesForGB();
// generateQRCodesForExecom();
generateQRCodesFornewCore_Execom()
/* 
SETUP INSTRUCTIONS:

1. Install dependencies:
   npm install qrcode @supabase/supabase-js

2. Create a Supabase project and get your URL and anon key from:
   Project Settings > API

3. Create a storage bucket named 'qr-codes':
   - Go to Storage in Supabase dashboard
   - Create new bucket
   - Set it to public if you want public URLs

4. Create a table named 'qr_codes' with this SQL:

   CREATE TABLE qr_codes (
     id INTEGER PRIMARY KEY,
     destination TEXT NOT NULL,
     qr_url TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );

5. Update the configuration variables:
   - SUPABASE_URL
   - SUPABASE_KEY
   - STORAGE_BUCKET (if different)

6. Run the script:
   node script.js
*/
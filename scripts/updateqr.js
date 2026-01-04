// we will multiply by 11131

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root directory
dotenv.config({ path: path.join(__dirname, '../.env') });

import connectDB from '../src/mongodb/index.js';
import Qr from '../src/models/Qrmodel.js';

const MULTIPLIER = 11131;

async function updateQrDestinations() {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('✅ Connected to MongoDB');

        // Get all QR records
        const allQrCodes = await Qr.find({});
        console.log(`Found ${allQrCodes.length} QR codes to update`);

        for (const qr of allQrCodes) {
            try {
                const oldDestination = qr.destination;
                
                // Extract the ID from the destination URL
                // e.g., https://gdgcmjcet.in/initialsetup/41 -> 41
                const match = oldDestination.match(/\/initialsetup\/(\d+)$/i) || 
                              oldDestination.match(/\/initialSetup\/(\d+)$/i);
                
                if (match && match[1]) {
                    const originalId = parseInt(match[1]);
                    const newId = originalId * MULTIPLIER;
                    
                    // Replace the old ID with the new multiplied ID
                    const newDestination = oldDestination.replace(
                        /\/initialsetup\/\d+$/i,
                        `/initialSetup/${newId}`
                    );
                    
                    // Update the QR record
                    await Qr.updateOne(
                        { _id: qr._id },
                        { destination: newDestination }
                    );
                    
                    console.log(`✅ Updated QR ${qr.id}: ${originalId} -> ${newId}`);
                    console.log(`   Old: ${oldDestination}`);
                    console.log(`   New: ${newDestination}`);
                } else {
                    console.log(`⚠️ Skipping QR ${qr.id}: destination doesn't match expected pattern`);
                    console.log(`   Current: ${oldDestination}`);
                }
            } catch (err) {
                console.error(`❌ Error updating QR ${qr.id}:`, err.message);
            }
        }

        console.log('\n🎉 QR destination update completed!');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Script failed:', error);
        process.exit(1);
    }
}

// Run the script
updateQrDestinations();
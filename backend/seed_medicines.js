const mysql = require('mysql2/promise');
require('dotenv').config();

const medicinesData = [
    ['Paracetamol 500mg', 25.00, 'Pain reliever and a fever reducer', 'Pain Relief', 500],
    ['Ibuprofen 400mg', 40.00, 'Treats pain, fever, and inflammation', 'Pain Relief', 300],
    ['Aspirin 81mg', 30.00, 'Pain relief and blood thinner', 'Pain Relief', 400],
    ['Naproxen 250mg', 55.00, 'Relieves pain from various conditions', 'Pain Relief', 200],
    ['Diclofenac Gel', 85.00, 'Topical gel for joint pain', 'Pain Relief', 150],

    // Antibiotics 
    ['Amoxicillin 500mg', 120.00, 'Penicillin antibiotic', 'Antibiotics', 250],
    ['Azithromycin 250mg', 150.00, 'Macrolide type antibiotic', 'Antibiotics', 200],
    ['Ciprofloxacin 500mg', 180.00, 'Fluoroquinolone antibiotic', 'Antibiotics', 150],
    ['Doxycycline 100mg', 90.00, 'Tetracycline antibiotic', 'Antibiotics', 300],
    ['Cephalexin 500mg', 140.00, 'Cephalosporin antibiotic', 'Antibiotics', 180],

    // Vitamins & Supplements
    ['Vitamin C 1000mg', 120.00, 'Immune system support', 'Supplements', 600],
    ['Vitamin D3 2000 IU', 150.00, 'Bone and immune health', 'Supplements', 500],
    ['Multivitamin Men', 250.00, 'Daily multivitamin for men', 'Supplements', 300],
    ['Multivitamin Women', 250.00, 'Daily multivitamin for women', 'Supplements', 300],
    ['Omega-3 Fish Oil', 300.00, 'Heart and brain health', 'Supplements', 400],
    ['Magnesium 250mg', 180.00, 'Muscle and nerve function support', 'Supplements', 250],
    ['Zinc 50mg', 110.00, 'Immune system support', 'Supplements', 350],
    ['Iron 65mg', 95.00, 'Treats or prevents low blood levels of iron', 'Supplements', 400],
    ['B-Complex Vitamin', 210.00, 'Energy metabolism support', 'Supplements', 300],
    ['Calcium 600mg', 160.00, 'Bone health support', 'Supplements', 450],

    // Diabetes
    ['Metformin 500mg', 80.00, 'Controls high blood sugar in type 2 diabetes', 'Diabetes', 500],
    ['Glimepiride 1mg', 60.00, 'Used with diet and exercise to control blood sugar', 'Diabetes', 400],
    ['Sitagliptin 100mg', 450.00, 'DPP-4 inhibitor for type 2 diabetes', 'Diabetes', 200],
    ['Insulin Glargine', 950.00, 'Long-acting insulin for diabetes', 'Diabetes', 100],
    ['Empagliflozin 10mg', 680.00, 'SGLT2 inhibitor for type 2 diabetes', 'Diabetes', 150],

    // Blood Pressure / Heart
    ['Amlodipine 5mg', 45.00, 'Calcium channel blocker for high blood pressure', 'Heart Health', 600],
    ['Lisinopril 10mg', 55.00, 'ACE inhibitor for high blood pressure', 'Heart Health', 500],
    ['Losartan 50mg', 70.00, 'Angiotensin II receptor blocker', 'Heart Health', 450],
    ['Metoprolol 25mg', 65.00, 'Beta blocker for high blood pressure and chest pain', 'Heart Health', 400],
    ['Atorvastatin 20mg', 90.00, 'Statin for lowering cholesterol', 'Heart Health', 550],
    ['Rosuvastatin 10mg', 110.00, 'Used to lower cholesterol and triglycerides', 'Heart Health', 350],
    ['Clopidogrel 75mg', 130.00, 'Prevents blood clots', 'Heart Health', 300],
    ['Digoxin 0.25mg', 40.00, 'Used to treat heart failure', 'Heart Health', 200],
    ['Nitroglycerin 0.4mg', 85.00, 'Treats and prevents chest pain', 'Heart Health', 250],
    ['Furosemide 40mg', 30.00, 'Diuretic (water pill)', 'Heart Health', 400],

    // Digestion
    ['Omeprazole 20mg', 60.00, 'Proton pump inhibitor for acid reflux', 'Digestive Health', 500],
    ['Pantoprazole 40mg', 75.00, 'Decreases the amount of acid produced in the stomach', 'Digestive Health', 450],
    ['Ondansetron 4mg', 120.00, 'Prevents nausea and vomiting', 'Digestive Health', 300],
    ['Loperamide 2mg', 40.00, 'Treats diarrhea', 'Digestive Health', 600],
    ['Ranitidine 150mg', 45.00, 'Reduces stomach acid', 'Digestive Health', 400],
    ['Domperidone 10mg', 55.00, 'Anti-sickness medicine', 'Digestive Health', 350],
    ['Esomeprazole 40mg', 85.00, 'Treats gastroesophageal reflux disease (GERD)', 'Digestive Health', 300],
    ['Mebeverine 135mg', 95.00, 'Relieves symptoms of irritable bowel syndrome (IBS)', 'Digestive Health', 250],
    ['Senna 8.6mg', 35.00, 'Natural laxative', 'Digestive Health', 450],
    ['Bisacodyl 5mg', 40.00, 'Stimulant laxative', 'Digestive Health', 500],

    // Allergey / Asthma
    ['Cetirizine 10mg', 35.00, 'Antihistamine for allergy relief', 'Allergy', 600],
    ['Levocetirizine 5mg', 45.00, 'Non-drowsy allergy relief', 'Allergy', 500],
    ['Fexofenadine 120mg', 65.00, 'Relieves allergy symptoms without drowsiness', 'Allergy', 400],
    ['Loratadine 10mg', 40.00, 'Treats allergies and hives', 'Allergy', 550],
    ['Montelukast 10mg', 110.00, 'Prevents asthma attacks and treats allergies', 'Asthma', 350],
    ['Salbutamol Inhaler', 200.00, 'Reliever inhaler for asthma', 'Asthma', 250],
    ['Budesonide Inhaler', 350.00, 'Preventer inhaler for asthma', 'Asthma', 150],
    ['Fluticasone Nasal Spray', 180.00, 'Treats nasal allergy symptoms', 'Allergy', 200],
    ['Diphenhydramine 25mg', 30.00, 'Antihistamine and sleep aid', 'Allergy', 450],
    ['Chlorpheniramine 4mg', 25.00, 'Classic antihistamine for allergies', 'Allergy', 500],

    // First Aid / Skin
    ['Povidone-Iodine Solution', 80.00, 'Antiseptic for minor wounds', 'First Aid', 300],
    ['Hydrogen Peroxide 3%', 40.00, 'Mild antiseptic', 'First Aid', 400],
    ['Neosporin Ointment', 150.00, 'Antibiotic ointment for cuts', 'First Aid', 250],
    ['Hydrocortisone Cream 1%', 60.00, 'Reduces itching and inflammation', 'First Aid', 350],
    ['Clotrimazole Cream', 75.00, 'Antifungal cream', 'Skin Care', 300],
    ['Mupirocin Ointment', 110.00, 'Topical antibiotic', 'Skin Care', 200],
    ['Calamine Lotion', 90.00, 'Relieves itching and minor skin irritation', 'Skin Care', 400],
    ['Ketoconazole Shampoo', 180.00, 'Treats fungal infections of the scalp', 'Skin Care', 150],
    ['Salicylic Acid Gel', 120.00, 'Acne treatment', 'Skin Care', 250],
    ['Benzoyl Peroxide Wash', 140.00, 'Cleanses and treats acne', 'Skin Care', 200],

    // Sleep / Neuro / Mental
    ['Melatonin 3mg', 90.00, 'Natural sleep aid', 'Sleep Aids', 400],
    ['Amitriptyline 10mg', 55.00, 'Tricyclic antidepressant sometimes used for pain', 'Mental Health', 250],
    ['Escitalopram 10mg', 85.00, 'SSRI for depression and anxiety', 'Mental Health', 300],
    ['Sertraline 50mg', 75.00, 'Treats depression and OCD', 'Mental Health', 350],
    ['Fluoxetine 20mg', 70.00, 'Antidepressant', 'Mental Health', 300],
    ['Clonazepam 0.5mg', 45.00, 'Treats seizures and panic attacks', 'Mental Health', 200],
    ['Diazepam 5mg', 50.00, 'Treats anxiety and alcohol withdrawal', 'Mental Health', 250],
    ['Zolpidem 10mg', 120.00, 'Sedative used for insomnia', 'Sleep Aids', 150],
    ['Pregabalin 75mg', 140.00, 'Treats nerve pain and epilepsy', 'Mental Health', 200],
    ['Gabapentin 300mg', 110.00, 'Treats seizures and nerve pain', 'Mental Health', 250],

    // Women's Health & Baby
    ['Folic Acid 5mg', 30.00, 'Important for pregnancy', 'Women Health', 500],
    ['Calcium + D3 Supplement', 110.00, 'Bone health for women', 'Women Health', 400],
    ['Iron + C Supplement', 125.00, 'Iron deficiency treatment', 'Women Health', 350],
    ['Clotrimazole Vaginal Suppository', 180.00, 'Treats yeast infections', 'Women Health', 200],
    ['Drospirenone / Ethinyl Estradiol', 250.00, 'Oral contraceptive', 'Women Health', 150],
    ['Levonorgestrel 1.5mg', 150.00, 'Emergency contraceptive', 'Women Health', 200],
    ['Baby Paracetamol Drops', 60.00, 'Fever and pain relief for infants', 'Baby Care', 300],
    ['Diaper Rash Cream', 140.00, 'Protects and heals diaper rash', 'Baby Care', 250],
    ['Gripe Water', 80.00, 'Relieves baby colic', 'Baby Care', 400],
    ['Nasal Saline Drops', 50.00, 'Clears stuffy baby noses', 'Baby Care', 500],

    // Cold & Cough
    ['Dextromethorphan Syrup', 85.00, 'Cough suppressant', 'Cold & Flu', 450],
    ['Guaifenesin Syrup', 90.00, 'Expectorant to loosen chest congestion', 'Cold & Flu', 400],
    ['Pseudoephedrine 30mg', 55.00, 'Nasal decongestant', 'Cold & Flu', 350],
    ['Phenylephrine 10mg', 45.00, 'Treats nasal and sinus congestion', 'Cold & Flu', 400],
    ['Ambroxol Syrup', 75.00, 'Mucolytic for productive cough', 'Cold & Flu', 300],
    ['Paracetamol + Phenylephrine', 60.00, 'Multi-symptom cold relief', 'Cold & Flu', 500],
    ['Levocetirizine + Montelukast', 120.00, 'Anti-allergy and asthma combination', 'Cold & Flu', 350],
    ['Throat Lozenges (Honey/Lemon)', 35.00, 'Soothes sore throat', 'Cold & Flu', 800],
    ['Vicks VapoRub', 65.00, 'Topical cough suppressant', 'Cold & Flu', 600],
    ['Steam Inhalation Capsules', 40.00, 'Relieves nasal congestion via steam', 'Cold & Flu', 500],

    // Eye & Dental
    ['Carboxymethylcellulose Eye Drops', 130.00, 'Lubricant for dry eyes', 'Eyecare', 300],
    ['Timolol Eye Drops', 150.00, 'Treats glaucoma', 'Eyecare', 200],
    ['Moxifloxacin Eye Drops', 180.00, 'Antibiotic for eye infections', 'Eyecare', 150],
    ['Ketorolac Eye Drops', 140.00, 'Reduces eye pain/inflammation', 'Eyecare', 200],
    ['Sodium Hyaluronate Eye Drops', 210.00, 'Advanced moisturization for dry eyes', 'Eyecare', 250],
    ['Chlorhexidine Mouthwash', 80.00, 'Antimicrobial mouthwash', 'Dental Care', 400],
    ['Potassium Nitrate Toothpaste', 110.00, 'For sensitive teeth', 'Dental Care', 350],
    ['Povidone-Iodine Gargle', 75.00, 'Sore throat gargle', 'Dental Care', 300],
    ['Benzocaine Oral Gel', 60.00, 'Relieves mouth ulcers/toothache', 'Dental Care', 400],
    ['Dental Floss Mint', 45.00, 'Oral hygiene', 'Dental Care', 600]
];

(async () => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || 'medicare'
        });

        console.log('Connected to the database. Seeding ' + medicinesData.length + ' medicines...');

        // Option to clear first or just insert all
        for (const med of medicinesData) {
            // Check if medicine already exists to avoid duplicate entries entirely
            const [rows] = await conn.query('SELECT id FROM medicines WHERE name = ?', [med[0]]);
            if (rows.length === 0) {
                await conn.query(
                    'INSERT INTO medicines (name, price, description, category, stock) VALUES (?, ?, ?, ?, ?)',
                    med
                );
            }
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (e) {
        console.error('Seeding failed:', e);
        process.exit(1);
    }
})();

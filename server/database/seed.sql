-- KJ & Associates CMS Database Seed Data
-- Run this after schema.sql to populate initial data

-- =====================================================
-- SEED SLIDES
-- =====================================================
INSERT INTO slides (tagline, title, title_highlight, button_text, button_link, image, active, order_index) VALUES
('BUILD ANYTHING WITH US', 'Precision Through', 'Digital Tools.', 'Contact Us', 'contact.html', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80', true, 1),
('PROFESSIONAL QUANTITY SURVEYING', 'Expert Cost', 'Management.', 'Our Services', 'services.html', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80', true, 2),
('17+ YEARS OF EXCELLENCE', 'Cost Control', 'Expertise.', 'About Us', 'about.html', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', true, 3),
('TRUSTED BY LEADING ORGANIZATIONS', 'Government &', 'Private Sector.', 'View Projects', 'projects.html', 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=1200&q=80', true, 4),
('COMMITTED TO YOUR SUCCESS', 'Delivering Value', 'Every Project.', 'Get Started', 'contact.html', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80', true, 5)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED TEAM MEMBERS
-- =====================================================
INSERT INTO team_members (name, role, experience, qualifications, bio, photo, email, category, order_index) VALUES
('QS Kashebo Jassony Rwezaula', 'Managing Director & Lead Quantity Surveyor', 35, 'Registered Quantity Surveyor', 'Registered Quantity Surveyor with over 35 years'' experience in pre-contract and post-contract quantity surveying, cost control, contract administration, and supervision of large public, private, and donor-funded construction projects.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', 'kashebo@kjassociates.co.tz', 'leadership', 1),
('QS Adelhard A. Kweyamba', 'Director & Senior Quantity Surveyor', 20, 'Registered Quantity Surveyor', 'Senior Quantity Surveyor with over 20 years'' experience in cost estimation, bills of quantities, tender documentation, contract administration, and delivery of building and civil engineering projects.', '/images/team/adelhard-kweyamba.jpg', '', 'leadership', 2),
('Esther Ndosi', 'Registered Quantity Surveyor', 8, 'Registered Quantity Surveyor', 'Registered Quantity Surveyor experienced in pre- and post-contract services, including cost planning, valuations, and contract administration.', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80', '', 'technical', 3),
('Temu L. Godlove', 'Registered Quantity Surveyor', 6, 'Registered Quantity Surveyor', 'Registered Quantity Surveyor with experience in cost control, preparation of bills of quantities, valuations, and project support.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', '', 'technical', 4),
('Phillemon J. Rwezaula', 'Registered Quantity Surveyor', 5, 'Registered Quantity Surveyor', 'Registered Quantity Surveyor involved in tendering processes, cost management, and contract administration across various construction projects.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', '', 'technical', 5),
('Tillya Innocent Donald', 'Registered Quantity Surveyor', 5, 'Registered Quantity Surveyor', 'Registered Quantity Surveyor with experience in pre- and post-contract duties, project management support, and contract administration.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', '', 'technical', 6),
('Mary Gobolo', 'Assistant Quantity Surveyor', 6, 'Assistant Quantity Surveyor', 'Assistant Quantity Surveyor providing measurement, bills of quantities preparation, and site-based quantity surveying support.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', '', 'technical', 7)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED BOARD MEMBERS
-- =====================================================
INSERT INTO board_members (name, role, qualifications, experience, bio, photo, is_chairman, order_index) VALUES
('QS Kashebo J. Rwezaula', 'Board Chairman', 'Registered Quantity Surveyor', 37, 'Experienced in pre and post contract duties, project management and contract administration. Extensive background in both public and private sector projects.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', true, 1),
('QS Phillemon J. Rwezaula', 'Board Member', 'Registered Quantity Surveyor', 0, '', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', false, 2),
('QS Adelhard A. Kweyamba', 'Board Member', 'Registered Quantity Surveyor', 0, '', '/images/team/adelhard-kweyamba.jpg', false, 3)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED CLIENTS
-- =====================================================
INSERT INTO clients (name, category, logo, website, order_index) VALUES
('Bank of Tanzania', 'Government', '', 'https://www.bot.go.tz', 1),
('World Bank', 'Donor', '', 'https://www.worldbank.org', 2),
('TANROADS', 'Government', '', '', 3),
('African Development Bank', 'Donor', '', 'https://www.afdb.org', 4),
('UNHCR', 'Donor', '', 'https://www.unhcr.org', 5),
('UNDP', 'Donor', '', 'https://www.undp.org', 6)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED TESTIMONIALS
-- =====================================================
INSERT INTO testimonials (name, position, company, text, photo, rating, published, order_index) VALUES
('James Mwangi', 'Project Director', 'TANROADS', 'KJ & Associates delivered exceptional cost management services for our highway project. Their attention to detail and professional approach exceeded our expectations.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', 5, true, 1),
('Grace Massawe', 'Procurement Manager', 'Bank of Tanzania', 'We have worked with KJ & Associates on multiple projects. Their expertise in quantity surveying and commitment to accuracy is unmatched.', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80', 5, true, 2),
('Michael Ochieng', 'Regional Manager', 'World Bank Tanzania', 'Professional, reliable, and thorough. KJ & Associates has been instrumental in ensuring our funded projects are delivered within budget.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', 5, true, 3)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED SERVICES
-- =====================================================
INSERT INTO services (title, icon, category, summary, features, order_index) VALUES
('Pre-Contract Cost Control', '🧮', 'pre-contract', 'Cost planning, estimates, and budget control during design stages.', ARRAY['Preliminary cost plan', 'Cost advice during design', 'Periodic reports and cash flow forecasts', 'Value engineering recommendations'], 1),
('Tender & Contract Documentation', '📋', 'tendering', 'Comprehensive tender preparation and contract documentation services.', ARRAY['Bills of quantities preparation', 'Contract document compilation', 'Tender evaluation support', 'Contractor prequalification'], 2),
('Post-Contract Cost Control', '📊', 'post-contract', 'Ongoing cost monitoring and control during construction phase.', ARRAY['Interim valuations', 'Variation assessment', 'Cost reporting', 'Final account preparation'], 3),
('Dispute Resolution Support', '⚖️', 'dispute', 'Expert support for construction disputes and claims management.', ARRAY['Claims preparation', 'Expert witness services', 'ADR support', 'Litigation support'], 4)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED CERTIFICATIONS
-- =====================================================
INSERT INTO certifications (title, issuer, description, image, category, order_index) VALUES
('AQRB Practising Certificate', 'Architects and Quantity Surveyors Registration Board (AQRB)', 'Registered Quantity Surveyor practicing certificate', '', 'professional', 1),
('TIN Certificate', 'Tanzania Revenue Authority', 'Tax Identification Number certificate', '', 'tax', 2),
('VAT Registration', 'Tanzania Revenue Authority', 'Value Added Tax registration certificate', '', 'tax', 3),
('Business License', 'BRELA', 'Business Registration and Licensing Agency certificate', '', 'legal', 4),
('Professional Indemnity Insurance', 'Insurance Provider', 'Professional indemnity insurance coverage', '', 'insurance', 5)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED SETTINGS
-- =====================================================
INSERT INTO settings (key, value) VALUES
('branding', '{
    "logoType": "image",
    "logoText": "KJ & Associates",
    "logoSubtitle": "Consultancy Ltd",
    "logoImageUrl": "/uploads/logo_kj&.png",
    "logoImageUrlDark": "/uploads/logo_kj&.png",
    "faviconUrl": ""
}'::jsonb),
('contact', '{
    "phone": "+255 768 757 779",
    "whatsapp": "+255768757779",
    "email": "md@kjconsultancy.co.tz",
    "email2": "info@kjconsultancy.co.tz",
    "address": "KIJITONYAMA, MABATINI ROAD, DAR ES SALAAM, TANZANIA",
    "city": "Dar es Salaam",
    "country": "Tanzania",
    "hours": "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
    "mapUrl": "",
    "social": {
        "linkedin": "",
        "facebook": "",
        "twitter": "",
        "instagram": ""
    }
}'::jsonb),
('seo', '{
    "title": "KJ & Associates Consultancy Ltd",
    "description": "Professional quantity surveying and construction project management services in Tanzania. 17+ years experience serving public, private, and donor-funded projects.",
    "keywords": "quantity surveyor, construction, Tanzania, cost control, project management, Dar es Salaam",
    "ogImage": ""
}'::jsonb),
('theme', '"classic-green"'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- SEED SAMPLE PROJECTS (First 5)
-- =====================================================
INSERT INTO projects (title, client, location, value, currency, funding, sector, status, year, duration, description, services, featured, order_index) VALUES
('Residential Complex Apartments – Oysterbay', 'Private Developer', 'Oysterbay, Dar es Salaam', '24,000,000,000', 'TZS', 'Private', 'Building', 'Ongoing', 2024, 0, 'Quantity Surveying services for pre and post contract phases of residential complex development.', ARRAY['Pre-contract QS', 'Post-contract QS'], true, 1),
('Commercial & Residential Building – Mwai Kibaki Road', 'Private Developer', 'Dar es Salaam', '15,000,000,000', 'TZS', 'Private', 'Building', 'Ongoing', 2024, 0, 'Comprehensive quantity surveying services for mixed-use commercial and residential development.', ARRAY['Quantity Surveying Services'], true, 2),
('Water Institute Vertical Extension Project', 'Ministry of Water', 'Dar es Salaam', '15,000,000,000', 'TZS', 'World Bank', 'Building', 'Ongoing', 2024, 0, 'Comprehensive QS services including estimates, BOQs, interim valuations, and final accounts for institutional building extension.', ARRAY['Estimates', 'BOQs', 'Interim Valuations', 'Final Accounts'], true, 3),
('MSD Headquarters Office Refurbishment', 'Medical Stores Department (MSD)', 'Dar es Salaam', '7,387,766,594', 'TZS', 'Government', 'Building', 'Ongoing', 2024, 0, 'Bills of quantities preparation, interim valuations, and final account services for institutional building refurbishment.', ARRAY['BOQs', 'Valuations', 'Final Accounts'], false, 4),
('Uongozi Institute – Kondo Village Development', 'Uongozi Institute', 'Bagamoyo', '70,500,000,000', 'TZS', 'Private', 'Building', 'Ongoing', 2024, 0, 'Cost estimates, bills of quantities, and cost control services for institutional campus development.', ARRAY['Estimates', 'BOQs', 'Cost Control'], true, 5)
ON CONFLICT DO NOTHING;


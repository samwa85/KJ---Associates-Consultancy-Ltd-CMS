/**
 * Seed Database from CMS Defaults
 * This script imports all the default data from cms-data.js into the database
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// CMS Default Data (copied from admin/cms-data.js)
const defaults = {
  slides: [
    { id: 1, tagline: "BUILD ANYTHING WITH US", title: "Precision Through", title_highlight: "Digital Tools.", button_text: "Contact Us", button_link: "contact.html", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80", active: true, display_order: 1 },
    { id: 2, tagline: "PROFESSIONAL QUANTITY SURVEYING", title: "Expert Cost", title_highlight: "Management.", button_text: "Our Services", button_link: "services.html", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80", active: true, display_order: 2 },
    { id: 3, tagline: "17+ YEARS OF EXCELLENCE", title: "Cost Control", title_highlight: "Expertise.", button_text: "About Us", button_link: "about.html", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80", active: true, display_order: 3 },
    { id: 4, tagline: "TRUSTED BY LEADING ORGANIZATIONS", title: "Government &", title_highlight: "Private Sector.", button_text: "View Projects", button_link: "projects.html", image: "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=1200&q=80", active: true, display_order: 4 },
    { id: 5, tagline: "COMMITTED TO YOUR SUCCESS", title: "Delivering Value", title_highlight: "Every Project.", button_text: "Get Started", button_link: "contact.html", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80", active: true, display_order: 5 }
  ],
  projects: [
    { title: "Residential Complex Apartments – Oysterbay", client: "Private Developer", location: "Oysterbay, Dar es Salaam", value: "24,000,000,000", currency: "TZS", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, description: "Quantity Surveying services for pre and post contract phases of residential complex development.", featured: true },
    { title: "Commercial & Residential Building – Mwai Kibaki Road", client: "Private Developer", location: "Dar es Salaam", value: "15,000,000,000", currency: "TZS", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, description: "Comprehensive quantity surveying services for mixed-use commercial and residential development.", featured: true },
    { title: "Water Institute Vertical Extension Project", client: "Ministry of Water", location: "Dar es Salaam", value: "15,000,000,000", currency: "TZS", funding: "World Bank", sector: "Building", status: "Ongoing", year: 2024, description: "Comprehensive QS services including estimates, BOQs, interim valuations, and final accounts for institutional building extension.", featured: true },
    { title: "MSD Headquarters Office Refurbishment", client: "Medical Stores Department (MSD)", location: "Dar es Salaam", value: "7,387,766,594", currency: "TZS", funding: "Government", sector: "Building", status: "Ongoing", year: 2024, description: "Bills of quantities preparation, interim valuations, and final account services for institutional building refurbishment.", featured: true },
    { title: "Uongozi Institute – Kondo Village Development", client: "Uongozi Institute", location: "Bagamoyo", value: "70,500,000,000", currency: "TZS", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, description: "Cost estimates, bills of quantities, and cost control services for institutional campus development.", featured: true },
    { title: "Asha Rose Migiro Residential House", client: "Private Client", location: "Bahari Beach, Dar es Salaam", value: "800,000,000", currency: "TZS", funding: "Private", sector: "Building", status: "Completed", year: 2023, description: "Quantity surveying services for luxury residential house construction.", featured: false },
    { title: "Sisters of Mary Girls' Town School – Building No. 2", client: "Registered Trustee of Sisters of Mary", location: "Tanzania", value: "7,000,000,000", currency: "TZS", funding: "Private", sector: "Building", status: "Completed", year: 2023, description: "Design and supervision quantity surveying support for educational facility construction.", featured: false },
    { title: "Renovation & Small Works – 36 Hospitals", client: "Ministry of Health / Philips", location: "Nationwide", value: "", currency: "TZS", funding: "Government", sector: "Building", status: "Completed", year: 2023, description: "Quantity surveying and cost control services for nationwide healthcare infrastructure renovation program.", featured: false },
    { title: "Refurbishment of 20 Health Facilities", client: "Government of Tanzania", location: "Dar es Salaam Corridor", value: "", currency: "TZS", funding: "World Bank", sector: "Building", status: "Completed", year: 2022, description: "Quantity surveying services for HIV & AIDS health facilities refurbishment program.", featured: false },
    { title: "Rehabilitation of Airstrips – Mikumi & Ruaha National Parks", client: "Government of Tanzania", location: "Mikumi & Ruaha", value: "80,000,000,000", currency: "TZS", funding: "World Bank", sector: "Civil", status: "Completed", year: 2023, description: "Feasibility studies, design support, and tender documentation for aviation infrastructure in national parks.", featured: false },
    { title: "Urban Infrastructure Development – Sumbawanga", client: "Sumbawanga Municipal Council", location: "Sumbawanga", value: "", currency: "TZS", funding: "World Bank", sector: "Civil", status: "Completed", year: 2023, description: "Construction supervision consultancy services for TACTIC project urban infrastructure development.", featured: false },
    { title: "Oil Jetty & Tank Farm Development – Port of Dar es Salaam", client: "Port Authority / Private Operator", location: "Dar es Salaam Port", value: "", currency: "TZS", funding: "Private", sector: "Civil", status: "Completed", year: 2022, description: "Feasibility studies, engineering design support, and tender document preparation for marine infrastructure.", featured: false },
    { title: "Natural Gas Distribution Network", client: "Government of Tanzania", location: "Dar es Salaam", value: "", currency: "TZS", funding: "Government", sector: "Civil", status: "Completed", year: 2022, description: "Quantity surveying and cost control services for energy infrastructure development.", featured: false },
    { title: "Cement Factory – Tanga Cement PLC", client: "Tanga Cement PLC", location: "Tanga", value: "25,000,000", currency: "USD", funding: "Private", sector: "Building", status: "Completed", year: 2021, description: "Full pre and post contract quantity surveying services for industrial facility expansion.", featured: false },
    { title: "Mzumbe University Library Rehabilitation & Extension", client: "Mzumbe University", location: "Morogoro", value: "1,250,000", currency: "USD", funding: "Government", sector: "Building", status: "Completed", year: 2023, description: "Pre and post contract quantity surveying services for educational facility rehabilitation and extension.", featured: false },
    { title: "Modern Abattoir Project (Shinyanga Municipal Council)", client: "Shinyanga Municipal Council", location: "Shinyanga", value: "2,500,000,000", currency: "TZS", funding: "Government", sector: "Industrial", status: "Ongoing", year: 2024, description: "Design consultancy services for modern abattoir facility.", featured: false },
    { title: "Iringa Highway Total Services Station", client: "Private Developer", location: "Ipogoro Area (Iringa)", value: "1,209,002,063", currency: "TZS", funding: "Private", sector: "Civil", status: "Ongoing", year: 2024, description: "Quantity surveying / project services for service station development.", featured: false },
    { title: "SOS Children's Village Kindergarten & Associated Works", client: "SOS Children's Village", location: "Bugarika, Mwanza", value: "2,968,737", currency: "USD", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, description: "Quantity surveying / project services for educational facility.", featured: false },
    { title: "Philips & Ministry of Health: Renovations for 36 Hospitals", client: "Philips Netherlands & Ministry of Health Tanzania", location: "All Regions (Tanzania)", value: "30,000,000", currency: "EUR", funding: "Government", sector: "Building", status: "Ongoing", year: 2020, description: "Renovations and small works construction programme covering 36 hospitals in Tanzania.", featured: false },
    { title: "Proposed Design & Supervision of Cement Factory (Kisemvule)", client: "Private Developer", location: "Kisemvule, Mkuranga – Coast Region", value: "38,500,000", currency: "USD", funding: "Private", sector: "Industrial", status: "Completed", year: 2020, description: "Design and supervision for a cement factory project.", featured: false },
    { title: "CEMONC Facilities (Dodoma Region)", client: "Private Developer", location: "Dodoma Region", value: "2,000,000", currency: "USD", funding: "Private", sector: "Building", status: "Completed", year: 2020, description: "Emergency Maternal Obstetric & Newborn Care facilities.", featured: false },
    { title: "Proposed Design & Build: PBZ – Mtwara & TAZARA Branches", client: "Peoples Bank of Zanzibar (PBZ)", location: "Mtwara & TAZARA", value: "1,000,000,000", currency: "TZS", funding: "Private", sector: "Building", status: "Completed", year: 2020, description: "Design and build project for bank branches.", featured: false },
    { title: "Renovation of NMB Branches (SURA MPYA Phase I & II)", client: "National Microfinance Bank (NMB)", location: "Multiple locations", value: "6,705,745,460", currency: "TZS", funding: "Private", sector: "Building", status: "Completed", year: 2020, description: "Renovation programme for 29 bank branches.", featured: false },
    { title: "TRA Ruvuma Regional Office Building – Rehabilitation", client: "Tanzania Revenue Authority (TRA)", location: "Ruvuma", value: "2,050,506,000", currency: "TZS", funding: "Government", sector: "Building", status: "Completed", year: 2020, description: "Design & supervision for regional office rehabilitation.", featured: false },
    { title: "Design & Supervision: Sisters of Mary Girls' Town School", client: "Sisters of Mary", location: "Coast Region – Kisarawe", value: "7,000,000,000", currency: "TZS", funding: "Private", sector: "Building", status: "Completed", year: 2019, description: "Design and supervision for school building construction.", featured: false },
    { title: "Proposed Construction of Mburahati Market", client: "Ubungo Municipal Council & Gatsby", location: "Mburahati, Kinondoni – Dar es Salaam", value: "1,877,538,307", currency: "TZS", funding: "Government", sector: "Building", status: "Completed", year: 2017, description: "Quantity surveying consultancy services for market construction.", featured: false },
    { title: "Natural Gas Network: Design & Supervision (Dar es Salaam)", client: "TPDC", location: "Dar es Salaam", value: "15,550,000", currency: "USD", funding: "Private", sector: "Civil", status: "Completed", year: 2016, description: "Detailed engineering design and supervision for natural gas distribution network.", featured: false },
    { title: "Procure House for the Augustinian Fathers", client: "Augustinian Fathers", location: "Dar es Salaam", value: "2,500,950", currency: "USD", funding: "Private", sector: "Building", status: "Completed", year: 2014, description: "Design and supervision for procure house project.", featured: false },
    { title: "Indent Warehouse + Office Building + Staff Canteen for MSD", client: "Medical Stores Department (MSD)", location: "Mbeya", value: "2,150,000,000", currency: "TZS", funding: "Government", sector: "Building", status: "Completed", year: 2014, description: "Pre-contract QS services for MSD facilities construction.", featured: false },
    { title: "Rehabilitation and Extension to Library Building (Mzumbe)", client: "Mzumbe University", location: "Morogoro", value: "1,250,000", currency: "USD", funding: "Private", sector: "Building", status: "Completed", year: 2013, description: "Rehabilitation and extension works for university library.", featured: false },
    { title: "Proposed Design & Supervision of Cement Factory (Kange, Tanga)", client: "Tanga Cement PLC", location: "Kange, Tanga City", value: "25,000,000", currency: "USD", funding: "Private", sector: "Industrial", status: "Completed", year: 2010, description: "Design and supervision of cement factory project.", featured: false }
  ],
  team: [
    { name: "QS Kashebo Jassony Rwezaula", role: "Managing Director & Lead Quantity Surveyor", experience: 35, qualifications: "Registered Quantity Surveyor", bio: "Registered Quantity Surveyor with over 35 years' experience in pre-contract and post-contract quantity surveying, cost control, contract administration, and supervision of large public, private, and donor-funded construction projects.", photo: "/uploads/QS KASHEBO J RWEZAULA.jpeg", category: "leadership", display_order: 1 },
    { name: "QS Adelhard A. Kweyamba", role: "Director & Senior Quantity Surveyor", experience: 20, qualifications: "Registered Quantity Surveyor", bio: "Senior Quantity Surveyor with over 20 years' experience in cost estimation, bills of quantities, tender documentation, contract administration, and delivery of building and civil engineering projects.", photo: "", category: "leadership", display_order: 2 },
    { name: "Esther Ndosi", role: "Registered Quantity Surveyor", experience: 8, qualifications: "Registered Quantity Surveyor", bio: "Registered Quantity Surveyor experienced in pre- and post-contract services, including cost planning, valuations, and contract administration.", photo: "", category: "technical", display_order: 3 },
    { name: "Temu L. Godlove", role: "Registered Quantity Surveyor", experience: 6, qualifications: "Registered Quantity Surveyor", bio: "Registered Quantity Surveyor with experience in cost control, preparation of bills of quantities, valuations, and project support.", photo: "", category: "technical", display_order: 4 },
    { name: "Phillemon J. Rwezaula", role: "Registered Quantity Surveyor", experience: 5, qualifications: "Registered Quantity Surveyor", bio: "Registered Quantity Surveyor involved in tendering processes, cost management, and contract administration across various construction projects.", photo: "/uploads/QS PHILLEMON JASSONY RWEZAULA.png", category: "technical", display_order: 5 },
    { name: "Tillya Innocent Donald", role: "Registered Quantity Surveyor", experience: 5, qualifications: "Registered Quantity Surveyor", bio: "Registered Quantity Surveyor with experience in pre- and post-contract duties, project management support, and contract administration.", photo: "", category: "technical", display_order: 6 },
    { name: "Mary Gobolo", role: "Assistant Quantity Surveyor", experience: 6, qualifications: "Assistant Quantity Surveyor", bio: "Assistant Quantity Surveyor providing measurement, bills of quantities preparation, and site-based quantity surveying support.", photo: "", category: "technical", display_order: 7 }
  ],
  clients: [
    { name: "World Bank", category: "Donor", logo: "", website: "https://www.worldbank.org" },
    { name: "African Development Bank", category: "Donor", logo: "", website: "https://www.afdb.org" },
    { name: "UNHCR", category: "Donor", logo: "", website: "https://www.unhcr.org" },
    { name: "UNDP", category: "Donor", logo: "", website: "https://www.undp.org" },
    { name: "Bank of Tanzania", category: "Government", logo: "", website: "https://www.bot.go.tz" },
    { name: "TANROADS", category: "Government", logo: "", website: "" },
    { name: "Ministry of Water", category: "Government", logo: "", website: "" },
    { name: "Ministry of Health", category: "Government", logo: "", website: "" },
    { name: "Tanzania Revenue Authority", category: "Government", logo: "", website: "" },
    { name: "Medical Stores Department", category: "Government", logo: "", website: "" },
    { name: "Tanga Cement PLC", category: "Private", logo: "", website: "" },
    { name: "National Microfinance Bank", category: "Private", logo: "", website: "" },
    { name: "Peoples Bank of Zanzibar", category: "Private", logo: "", website: "" }
  ],
  board: [
    { name: "QS Kashebo J. Rwezaula", role: "Board Chairman", qualifications: "Registered Quantity Surveyor", experience: 37, bio: "Experienced in pre and post contract duties, project management and contract administration. Extensive background in both public and private sector projects.", photo: "/uploads/QS KASHEBO J RWEZAULA.jpeg", is_chairman: true, display_order: 1 },
    { name: "QS Phillemon J. Rwezaula", role: "Board Member", qualifications: "Registered Quantity Surveyor", experience: 0, bio: "", photo: "/uploads/QS PHILLEMON JASSONY RWEZAULA.png", is_chairman: false, display_order: 2 },
    { name: "QS Adelhard A. Kweyamba", role: "Board Member", qualifications: "Registered Quantity Surveyor", experience: 0, bio: "", photo: "", is_chairman: false, display_order: 3 }
  ],
  testimonials: [
    { name: "James Mwangi", position: "Project Director", company: "TANROADS", content: "KJ & Associates delivered exceptional cost management services for our highway project. Their attention to detail and professional approach exceeded our expectations.", photo: "", rating: 5, published: true },
    { name: "Grace Massawe", position: "Procurement Manager", company: "Bank of Tanzania", content: "We have worked with KJ & Associates on multiple projects. Their expertise in quantity surveying and commitment to accuracy is unmatched.", photo: "", rating: 5, published: true },
    { name: "Michael Ochieng", position: "Regional Manager", company: "World Bank Tanzania", content: "Professional, reliable, and thorough. KJ & Associates has been instrumental in ensuring our funded projects are delivered within budget.", photo: "", rating: 5, published: true }
  ],
  certifications: [
    { title: "AQRB Practising Certificate", issuer: "Architects and Quantity Surveyors Registration Board (AQRB)", description: "Registered Quantity Surveyor practicing certificate", category: "professional" },
    { title: "TIN Certificate", issuer: "Tanzania Revenue Authority", description: "Tax Identification Number certificate", category: "tax" },
    { title: "VAT Registration", issuer: "Tanzania Revenue Authority", description: "Value Added Tax registration certificate", category: "tax" },
    { title: "Business License", issuer: "BRELA", description: "Business Registration and Licensing Agency certificate", category: "legal" },
    { title: "Professional Indemnity Insurance", issuer: "Insurance Provider", description: "Professional indemnity insurance coverage", category: "insurance" }
  ]
};

async function seedDatabase() {
  console.log('🌱 Starting database seed from CMS defaults...\n');

  try {
    // Clear existing data (optional - comment out if you want to keep existing)
    console.log('🗑️  Clearing existing data...');
    await supabase.from('slides').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('team_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('clients').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('board_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('certifications').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Seed slides (without display_order if column doesn't exist)
    console.log('📊 Seeding slides...');
    const { data: slidesData, error: slidesError } = await supabase
      .from('slides')
      .insert(defaults.slides.map(s => ({
        tagline: s.tagline,
        title: s.title,
        title_highlight: s.title_highlight,
        button_text: s.button_text,
        button_link: s.button_link,
        image: s.image,
        active: s.active
      })));
    if (slidesError) console.error('Slides error:', slidesError.message);
    else console.log(`  ✅ ${defaults.slides.length} slides inserted`);

    // Seed projects
    console.log('🏗️  Seeding projects...');
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .insert(defaults.projects);
    if (projectsError) console.error('Projects error:', projectsError.message);
    else console.log(`  ✅ ${defaults.projects.length} projects inserted`);

    // Seed team members (only columns that exist)
    console.log('👥 Seeding team members...');
    const { data: teamData, error: teamError } = await supabase
      .from('team_members')
      .insert(defaults.team.map(t => ({
        name: t.name,
        role: t.role,
        experience: t.experience,
        bio: t.bio,
        photo: t.photo,
        category: t.category
      })));
    if (teamError) console.error('Team error:', teamError.message);
    else console.log(`  ✅ ${defaults.team.length} team members inserted`);

    // Seed clients
    console.log('🏢 Seeding clients...');
    const { data: clientsData, error: clientsError } = await supabase
      .from('clients')
      .insert(defaults.clients);
    if (clientsError) console.error('Clients error:', clientsError.message);
    else console.log(`  ✅ ${defaults.clients.length} clients inserted`);

    // Seed board members (only columns that exist)
    console.log('📋 Seeding board members...');
    const { data: boardData, error: boardError } = await supabase
      .from('board_members')
      .insert(defaults.board.map(b => ({
        name: b.name,
        role: b.role
      })));
    if (boardError) console.error('Board error:', boardError.message);
    else console.log(`  ✅ ${defaults.board.length} board members inserted`);

    // Seed testimonials (use 'text' instead of 'content')
    console.log('💬 Seeding testimonials...');
    const { data: testimonialsData, error: testimonialsError } = await supabase
      .from('testimonials')
      .insert(defaults.testimonials.map(t => ({
        name: t.name,
        position: t.position,
        company: t.company,
        text: t.content,  // Map content to text column
        photo: t.photo,
        rating: t.rating,
        published: t.published
      })));
    if (testimonialsError) console.error('Testimonials error:', testimonialsError.message);
    else console.log(`  ✅ ${defaults.testimonials.length} testimonials inserted`);

    // Seed certifications
    console.log('📜 Seeding certifications...');
    const { data: certsData, error: certsError } = await supabase
      .from('certifications')
      .insert(defaults.certifications);
    if (certsError) console.error('Certifications error:', certsError.message);
    else console.log(`  ✅ ${defaults.certifications.length} certifications inserted`);

    // Seed settings
    console.log('⚙️  Seeding settings...');
    const settings = [
      { key: 'branding', value: { logoType: 'image', logoText: 'KJ & Associates', logoSubtitle: 'Consultancy Ltd', logoImageUrl: '/uploads/logo_kj&.png' } },
      { key: 'contact', value: { email: 'md@kjconsultancy.co.tz', phone: '+255 768 757 779', address: 'KIJITONYAMA, DAR ES SALAAM' } },
      { key: 'seo', value: { title: 'KJ & Associates Consultancy Ltd', description: 'Professional quantity surveying services in Tanzania.' } },
      { key: 'theme', value: 'classic-green' }
    ];
    
    for (const setting of settings) {
      const { error } = await supabase
        .from('settings')
        .upsert({ key: setting.key, value: setting.value }, { onConflict: 'key' });
      if (error) console.error(`Settings (${setting.key}) error:`, error.message);
    }
    console.log('  ✅ Settings configured');

    console.log('\n✅ Database seeding complete!');
    console.log('\nSummary:');
    console.log(`  - ${defaults.slides.length} slides`);
    console.log(`  - ${defaults.projects.length} projects`);
    console.log(`  - ${defaults.team.length} team members`);
    console.log(`  - ${defaults.clients.length} clients`);
    console.log(`  - ${defaults.board.length} board members`);
    console.log(`  - ${defaults.testimonials.length} testimonials`);
    console.log(`  - ${defaults.certifications.length} certifications`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();


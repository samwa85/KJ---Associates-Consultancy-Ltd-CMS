// CMS Data Management
const CMS = {
    // Default Data
    defaults: {
        slides: [
            { id: 1, tagline: "BUILD ANYTHING WITH US", title: "Precision Through", titleHighlight: "Digital Tools.", buttonText: "Contact Us", buttonLink: "contact.html", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80", active: true },
            { id: 2, tagline: "PROFESSIONAL QUANTITY SURVEYING", title: "Expert Cost", titleHighlight: "Management.", buttonText: "Our Services", buttonLink: "services.html", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80", active: true },
            { id: 3, tagline: "17+ YEARS OF EXCELLENCE", title: "Cost Control", titleHighlight: "Expertise.", buttonText: "About Us", buttonLink: "about.html", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80", active: true },
            { id: 4, tagline: "TRUSTED BY LEADING ORGANIZATIONS", title: "Government &", titleHighlight: "Private Sector.", buttonText: "View Projects", buttonLink: "projects.html", image: "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=1200&q=80", active: true },
            { id: 5, tagline: "COMMITTED TO YOUR SUCCESS", title: "Delivering Value", titleHighlight: "Every Project.", buttonText: "Get Started", buttonLink: "contact.html", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80", active: true }
        ],
        projects: [
            { id: 1, title: "Residential Complex Apartments – Oysterbay", client: "Private Developer", location: "Oysterbay, Dar es Salaam", value: "24,000,000,000", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, duration: 0, description: "Quantity Surveying services for pre and post contract phases of residential complex development.", image: "", services: ["Pre-contract QS", "Post-contract QS"] },
            { id: 2, title: "Commercial & Residential Building – Mwai Kibaki Road", client: "Private Developer", location: "Dar es Salaam", value: "15,000,000,000", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, duration: 0, description: "Comprehensive quantity surveying services for mixed-use commercial and residential development.", image: "", services: ["Quantity Surveying Services"] },
            { id: 4, title: "Water Institute Vertical Extension Project", client: "Ministry of Water", location: "Dar es Salaam", value: "15,000,000,000", funding: "World Bank", sector: "Building", status: "Ongoing", year: 2024, duration: 0, description: "Comprehensive QS services including estimates, BOQs, interim valuations, and final accounts for institutional building extension.", image: "", services: ["Estimates", "BOQs", "Interim Valuations", "Final Accounts"] },
            { id: 13, title: "MSD Headquarters Office Refurbishment", client: "Medical Stores Department (MSD)", location: "Dar es Salaam", value: "7,387,766,594", funding: "Government", sector: "Building", status: "Ongoing", year: 2024, duration: 0, description: "Bills of quantities preparation, interim valuations, and final account services for institutional building refurbishment.", image: "", services: ["BOQs", "Valuations", "Final Accounts"] },
            { id: 14, title: "Uongozi Institute – Kondo Village Development", client: "Uongozi Institute", location: "Bagamoyo", value: "70,500,000,000", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, duration: 0, description: "Cost estimates, bills of quantities, and cost control services for institutional campus development.", image: "", services: ["Estimates", "BOQs", "Cost Control"] },
            { id: 16, title: "Proposed Construction of Residential Complex Apartments (Plot 243, Oysterbay – Dar es Salaam)", client: "Private Developer", location: "Oysterbay, Dar es Salaam", value: "24,000,000,000", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, duration: 0, description: "", image: "", services: ["Quantity surveying services"] },
            { id: 17, title: "Proposed Commercial/Residential Building (Plot No. 10, Mwai Kibaki Road)", client: "Private Developer", location: "Dar es Salaam", value: "15,000,000,000", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, duration: 0, description: "", image: "", services: ["Quantity surveying services"] },
            { id: 18, title: "Asha Rose Migiro Residential House (Bahari Beach)", client: "Private Developer", location: "Bahari Beach, Dar es Salaam", value: "800,000,000", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, duration: 0, description: "", image: "", services: ["Quantity surveying services"] },
            { id: 19, title: "Vertical Extension of Water Institute (WI) Buildings – World Bank Funded", client: "Ministry of Water", location: "Dar es Salaam", value: "15,000,000,000", funding: "World Bank", sector: "Building", status: "Ongoing", year: 2024, duration: 0, description: "", image: "", services: ["Design & supervision", "Quantity surveying services"] },
            { id: 29, title: "Modern Abattoir Project (Shinyanga Municipal Council)", client: "Shinyanga Municipal Council", location: "Shinyanga", value: "2,500,000,000", funding: "Government", sector: "Industrial", status: "Ongoing", year: 2024, duration: 0, description: "", image: "", services: ["Design consultancy services"] },
            { id: 30, title: "Iringa Highway Total Services Station (Plot No.16A, Block \"A\", Ipogoro Area)", client: "Private Developer", location: "Ipogoro Area (Iringa)", value: "1,209,002,063", funding: "Private", sector: "Civil", status: "Ongoing", year: 2024, duration: 0, description: "", image: "", services: ["Quantity surveying / project services"] },
            { id: 31, title: "SOS Children's Village Kindergarten & Associated Works (Bugarika, Mwanza)", client: "SOS Children's Village", location: "Bugarika, Mwanza", value: "2,968,737", currency: "USD", funding: "Private", sector: "Building", status: "Ongoing", year: 2024, duration: 0, description: "", image: "", services: ["Quantity surveying / project services"] },
            { id: 21, title: "Philips & Ministry of Health: Renovations and Small Works Construction for 36 Hospitals", client: "Philips Netherlands & Ministry of Health Tanzania", location: "All Regions (Tanzania)", value: "30,000,000", currency: "EUR", funding: "Government", sector: "Building", status: "Ongoing", year: 2020, duration: 24, description: "Renovations and small works construction programme covering 36 hospitals in Tanzania.", image: "", services: ["Project management", "Pre-contract quantity surveying services", "Post-contract quantity surveying services"] },
            { id: 3, title: "Asha Rose Migiro Residential House", client: "Private Client", location: "Bahari Beach, Dar es Salaam", value: "800,000,000", funding: "Private", sector: "Building", status: "Completed", year: 2023, duration: 0, description: "Quantity surveying services for luxury residential house construction.", image: "", services: ["Quantity Surveying"] },
            { id: 5, title: "Sisters of Mary Girls' Town School – Building No. 2", client: "Registered Trustee of Sisters of Mary", location: "Tanzania", value: "7,000,000,000", funding: "Private", sector: "Building", status: "Completed", year: 2023, duration: 0, description: "Design and supervision quantity surveying support for educational facility construction.", image: "", services: ["Design & Supervision QS Support"] },
            { id: 6, title: "Renovation & Small Works – 36 Hospitals", client: "Ministry of Health / Philips", location: "Nationwide", value: "", funding: "Government", sector: "Building", status: "Completed", year: 2023, duration: 0, description: "Quantity surveying and cost control services for nationwide healthcare infrastructure renovation program.", image: "", services: ["Quantity Surveying", "Cost Control"] },
            { id: 8, title: "Rehabilitation of Airstrips – Mikumi & Ruaha National Parks", client: "Government of Tanzania", location: "Mikumi & Ruaha", value: "80,000,000,000", funding: "World Bank", sector: "Civil", status: "Completed", year: 2023, duration: 0, description: "Feasibility studies, design support, and tender documentation for aviation infrastructure in national parks.", image: "", services: ["Feasibility", "Design & Tender Documentation"] },
            { id: 9, title: "Urban Infrastructure Development – Sumbawanga", client: "Sumbawanga Municipal Council", location: "Sumbawanga", value: "", funding: "World Bank", sector: "Civil", status: "Completed", year: 2023, duration: 0, description: "Construction supervision consultancy services for TACTIC project urban infrastructure development.", image: "", services: ["Construction Supervision Consultancy"] },
            { id: 15, title: "Mzumbe University Library Rehabilitation & Extension", client: "Mzumbe University", location: "Morogoro", value: "1,250,000", currency: "USD", funding: "Government", sector: "Building", status: "Completed", year: 2023, duration: 12, description: "Pre and post contract quantity surveying services for educational facility rehabilitation and extension.", image: "", services: ["Pre-contract QS", "Post-contract QS"] },
            { id: 7, title: "Refurbishment of 20 Health Facilities", client: "Government of Tanzania", location: "Dar es Salaam Corridor", value: "", funding: "World Bank", sector: "Building", status: "Completed", year: 2022, duration: 0, description: "Quantity surveying services for HIV & AIDS health facilities refurbishment program.", image: "", services: ["QS Services"] },
            { id: 10, title: "Oil Jetty & Tank Farm Development – Port of Dar es Salaam", client: "Port Authority / Private Operator", location: "Dar es Salaam Port", value: "", funding: "Private", sector: "Civil", status: "Completed", year: 2022, duration: 0, description: "Feasibility studies, engineering design support, and tender document preparation for marine infrastructure.", image: "", services: ["Feasibility", "Engineering Design", "Tender Documents"] },
            { id: 11, title: "Natural Gas Distribution Network", client: "Government of Tanzania", location: "Dar es Salaam", value: "", funding: "Government", sector: "Civil", status: "Completed", year: 2022, duration: 0, description: "Quantity surveying and cost control services for energy infrastructure development.", image: "", services: ["Quantity Surveying", "Cost Control"] },
            { id: 12, title: "Cement Factory – Tanga Cement PLC", client: "Tanga Cement PLC", location: "Tanga", value: "25,000,000", currency: "USD", funding: "Private", sector: "Building", status: "Completed", year: 2021, duration: 24, description: "Full pre and post contract quantity surveying services for industrial facility expansion.", image: "", services: ["Pre-contract QS", "Post-contract QS"] },
            { id: 24, title: "Proposed Design & Supervision of Cement Factory (Kisemvule, Mkuranga – Coast Region)", client: "Private Developer", location: "Kisemvule, Mkuranga – Coast Region", value: "38,500,000", currency: "USD", funding: "Private", sector: "Industrial", status: "Completed", year: 2020, duration: 0, description: "Design and supervision for a cement factory project in Kisemvule, Mkuranga.", image: "", services: ["Pre-contract quantity surveying services", "Post-contract quantity surveying services"] },
            { id: 32, title: "CEMONC Facilities (DodomA Region) – Emergency Maternal Obstetric & Newborn Care", client: "Private Developer", location: "Dodoma Region", value: "2,000,000", currency: "USD", funding: "Private", sector: "Building", status: "Completed", year: 2020, duration: 0, description: "", image: "", services: ["Project/services as listed in completed projects summary"] },
            { id: 33, title: "Proposed Design & Build: Peoples Bank of Zanzibar (PBZ) – Mtwara & TAZARA Branches", client: "Peoples Bank of Zanzibar (PBZ)", location: "Mtwara & TAZARA", value: "1,000,000,000", funding: "Private", sector: "Building", status: "Completed", year: 2020, duration: 0, description: "", image: "", services: ["Project/services as listed in completed projects summary"] },
            { id: 34, title: "Renovation of NMB Branches (SURA MPYA Phase I & II – 29 Branches)", client: "National Microfinance Bank (NMB)", location: "Multiple locations (as listed in profile)", value: "6,705,745,460", funding: "Private", sector: "Building", status: "Completed", year: 2020, duration: 0, description: "", image: "", services: ["Renovation programme (as listed in completed projects summary)"] },
            { id: 35, title: "TRA Ruvuma Regional Office Building – Rehabilitation (Design & Supervision)", client: "Tanzania Revenue Authority (TRA)", location: "Ruvuma", value: "2,050,506,000", funding: "Government", sector: "Building", status: "Completed", year: 2020, duration: 0, description: "", image: "", services: ["Design & supervision (as listed in completed projects summary)"] },
            { id: 20, title: "Design & Supervision: Sisters of Mary Girls' Town School Building No. 2", client: "Sisters of Mary", location: "Coast Region – Kisarawe", value: "7,000,000,000", funding: "Private", sector: "Building", status: "Completed", year: 2019, duration: 10, description: "Design and supervision for the proposed construction of Sisters of Mary Girls' Town School Building No.2.", image: "", services: ["Pre-contract quantity surveying services", "Post-contract quantity surveying services"] },
            { id: 23, title: "Proposed Construction of Mburahati Market", client: "Ubungo Municipal Council & Gatsby", location: "Mburahati, Kinondoni Municipality – Dar es Salaam", value: "1,877,538,307", funding: "Government", sector: "Building", status: "Completed", year: 2017, duration: 36, description: "Quantity surveying consultancy services for the construction of Mburahati Market.", image: "", services: ["Pre-contract quantity surveying services", "Post-contract quantity surveying services"] },
            { id: 22, title: "Natural Gas Network: Design & Supervision (Dar es Salaam) – Vehicle Refueling + House Connections", client: "TPDC", location: "Dar es Salaam", value: "15,550,000", currency: "USD", funding: "Private", sector: "Civil", status: "Completed", year: 2016, duration: 18, description: "Detailed engineering design and supervision for natural gas distribution network, refueling stations, and house connections.", image: "", services: ["Pre-contract quantity surveying services", "Post-contract quantity surveying services"] },
            { id: 27, title: "Procure House for the Augustinian Fathers (Mavurunza, Kinondoni Municipality)", client: "Augustinian Fathers", location: "Dar es Salaam", value: "2,500,950", currency: "USD", funding: "Private", sector: "Building", status: "Completed", year: 2014, duration: 12, description: "Design and supervision for a procure house project for the Augustinian Fathers.", image: "", services: ["Pre-contract quantity surveying services", "Post-contract quantity surveying services"] },
            { id: 28, title: "Indent Warehouse + Office Building + Staff Canteen for MSD (Mbeya) – Pre-contract Only", client: "Medical Stores Department (MSD)", location: "Mbeya", value: "2,150,000,000", funding: "Government", sector: "Building", status: "Completed", year: 2014, duration: 12, description: "Pre-contract QS services for construction of MSD facilities in Mbeya (warehouse, offices, canteen, external works).", image: "", services: ["Pre-contract quantity surveying services"] },
            { id: 26, title: "Rehabilitation and Extension to Library Building (Mzumbe University)", client: "Mzumbe University", location: "Morogoro", value: "1,250,000", currency: "USD", funding: "Private", sector: "Building", status: "Completed", year: 2013, duration: 12, description: "Rehabilitation and extension works for the university library building.", image: "", services: ["Pre-contract quantity surveying services", "Post-contract quantity surveying services"] },
            { id: 25, title: "Proposed Design & Supervision of Cement Factory (Kange, Tanga City)", client: "Tanga Cement PLC", location: "Kange, Tanga City", value: "25,000,000", currency: "USD", funding: "Private", sector: "Industrial", status: "Completed", year: 2010, duration: 24, description: "Design and supervision of a cement factory project in Tanga.", image: "", services: ["Pre-contract quantity surveying services", "Post-contract quantity surveying services"] }
        ],
        team: [
            { id: 1, name: "QS Kashebo Jassony Rwezaula", role: "Managing Director & Lead Quantity Surveyor", experience: 35, qualifications: "Registered Quantity Surveyor", bio: "Registered Quantity Surveyor with over 35 years' experience in pre-contract and post-contract quantity surveying, cost control, contract administration, and supervision of large public, private, and donor-funded construction projects.", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", email: "kashebo@kjassociates.co.tz", linkedin: "", category: "leadership" },
            { id: 2, name: "QS Adelhard A. Kweyamba", role: "Director & Senior Quantity Surveyor", experience: 20, qualifications: "Registered Quantity Surveyor", bio: "Senior Quantity Surveyor with over 20 years' experience in cost estimation, bills of quantities, tender documentation, contract administration, and delivery of building and civil engineering projects.", photo: "/images/team/adelhard-kweyamba.jpg", email: "", linkedin: "", category: "leadership" },
            { id: 3, name: "Esther Ndosi", role: "Registered Quantity Surveyor", experience: 8, qualifications: "Registered Quantity Surveyor", bio: "Registered Quantity Surveyor experienced in pre- and post-contract services, including cost planning, valuations, and contract administration.", photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80", email: "", linkedin: "", category: "technical" },
            { id: 4, name: "Temu L. Godlove", role: "Registered Quantity Surveyor", experience: 6, qualifications: "Registered Quantity Surveyor", bio: "Registered Quantity Surveyor with experience in cost control, preparation of bills of quantities, valuations, and project support.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", email: "", linkedin: "", category: "technical" },
            { id: 5, name: "Phillemon J. Rwezaula", role: "Registered Quantity Surveyor", experience: 5, qualifications: "Registered Quantity Surveyor", bio: "Registered Quantity Surveyor involved in tendering processes, cost management, and contract administration across various construction projects.", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", email: "", linkedin: "", category: "technical" },
            { id: 6, name: "Tillya Innocent Donald", role: "Registered Quantity Surveyor", experience: 5, qualifications: "Registered Quantity Surveyor", bio: "Registered Quantity Surveyor with experience in pre- and post-contract duties, project management support, and contract administration.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", email: "", linkedin: "", category: "technical" },
            { id: 7, name: "Mary Gobolo", role: "Assistant Quantity Surveyor", experience: 6, qualifications: "Assistant Quantity Surveyor", bio: "Assistant Quantity Surveyor providing measurement, bills of quantities preparation, and site-based quantity surveying support.", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", email: "", linkedin: "", category: "technical" }
        ],
        clients: [
            { id: 1, name: "Bank of Tanzania", category: "Government", logo: "", website: "https://www.bot.go.tz" },
            { id: 2, name: "World Bank", category: "Donor", logo: "", website: "https://www.worldbank.org" },
            { id: 3, name: "TANROADS", category: "Government", logo: "", website: "" },
            { id: 4, name: "African Development Bank", category: "Donor", logo: "", website: "https://www.afdb.org" },
            { id: 5, name: "UNHCR", category: "Donor", logo: "", website: "https://www.unhcr.org" },
            { id: 6, name: "UNDP", category: "Donor", logo: "", website: "https://www.undp.org" }
        ],
        board: [
            { id: 1, name: "QS Kashebo J. Rwezaula", role: "Board Chairman", qualifications: "Registered Quantity Surveyor", experience: 37, bio: "Experienced in pre and post contract duties, project management and contract administration. Extensive background in both public and private sector projects.", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", isChairman: true },
            { id: 2, name: "QS Phillemon J. Rwezaula", role: "Board Member", qualifications: "Registered Quantity Surveyor", experience: 0, bio: "", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", isChairman: false },
            { id: 3, name: "QS Adelhard A. Kweyamba", role: "Board Member", qualifications: "Registered Quantity Surveyor", experience: 0, bio: "", photo: "/images/team/adelhard-kweyamba.jpg", isChairman: false }
        ],
        testimonials: [
            { id: 1, name: "James Mwangi", position: "Project Director", company: "TANROADS", text: "KJ & Associates delivered exceptional cost management services for our highway project. Their attention to detail and professional approach exceeded our expectations.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", rating: 5 },
            { id: 2, name: "Grace Massawe", position: "Procurement Manager", company: "Bank of Tanzania", text: "We have worked with KJ & Associates on multiple projects. Their expertise in quantity surveying and commitment to accuracy is unmatched.", photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80", rating: 5 },
            { id: 3, name: "Michael Ochieng", position: "Regional Manager", company: "World Bank Tanzania", text: "Professional, reliable, and thorough. KJ & Associates has been instrumental in ensuring our funded projects are delivered within budget.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", rating: 5 }
        ],
        services: [
            { id: 1, title: "Pre-Contract Cost Control", icon: "🧮", category: "pre-contract", summary: "Cost planning, estimates, and budget control during design stages.", features: ["Preliminary cost plan", "Cost advice during design", "Periodic reports and cash flow forecasts", "Value engineering recommendations"] },
            { id: 2, title: "Tender & Contract Documentation", icon: "📋", category: "tendering", summary: "Comprehensive tender preparation and contract documentation services.", features: ["Bills of quantities preparation", "Contract document compilation", "Tender evaluation support", "Contractor prequalification"] },
            { id: 3, title: "Post-Contract Cost Control", icon: "📊", category: "post-contract", summary: "Ongoing cost monitoring and control during construction phase.", features: ["Interim valuations", "Variation assessment", "Cost reporting", "Final account preparation"] },
            { id: 4, title: "Dispute Resolution Support", icon: "⚖️", category: "dispute", summary: "Expert support for construction disputes and claims management.", features: ["Claims preparation", "Expert witness services", "ADR support", "Litigation support"] }
        ],
        blog: [
            { id: 1, title: "Understanding Cost Escalation in Tanzanian Construction Projects", slug: "cost-escalation-tanzania", excerpt: "Learn about the key factors driving cost escalation in construction projects and strategies to mitigate financial risks.", content: "<p>Cost escalation is one of the most significant challenges facing construction projects in Tanzania...</p>", category: "cost-management", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", author: "QS Kashebo J. Rwezaula", authorPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80", authorRole: "Managing Director", authorBio: "With over 37 years of experience in quantity surveying.", date: "2024-12-15", tags: ["Cost Management", "Construction", "Tanzania"], featured: true, published: true },
            { id: 2, title: "New AQRB Regulations: What Contractors Need to Know", slug: "aqrb-regulations-2024", excerpt: "A comprehensive guide to the latest regulations from the Architects and Quantity Surveyors Registration Board.", content: "<p>The AQRB has introduced several new regulations...</p>", category: "regulations", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80", author: "QS John Mwakasege", authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", authorRole: "Director", authorBio: "QS John Mwakasege brings 25 years of experience.", date: "2024-12-10", tags: ["Regulations", "AQRB", "Compliance"], featured: false, published: true },
            { id: 3, title: "Project Spotlight: Morogoro Central Market Development", slug: "morogoro-market-spotlight", excerpt: "An in-depth look at our role in the World Bank-funded Morogoro Central Market project.", content: "<p>The Morogoro Central Market Development project stands as one of our most significant achievements...</p>", category: "project-spotlight", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80", author: "QS Sarah Kimaro", authorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80", authorRole: "Director of Operations", authorBio: "Expert in project coordination with 20 years experience.", date: "2024-12-05", tags: ["Project Spotlight", "World Bank", "Morogoro"], featured: false, published: true }
        ],
        certifications: [
            { id: 1, title: "AQRB Practising Certificate", issuer: "Architects and Quantity Surveyors Registration Board (AQRB)", description: "Registered Quantity Surveyor practicing certificate", image: "", validUntil: "", category: "professional" },
            { id: 2, title: "TIN Certificate", issuer: "Tanzania Revenue Authority", description: "Tax Identification Number certificate", image: "", validUntil: "", category: "tax" },
            { id: 3, title: "VAT Registration", issuer: "Tanzania Revenue Authority", description: "Value Added Tax registration certificate", image: "", validUntil: "", category: "tax" },
            { id: 4, title: "Business License", issuer: "BRELA", description: "Business Registration and Licensing Agency certificate", image: "", validUntil: "", category: "legal" },
            { id: 5, title: "Professional Indemnity Insurance", issuer: "Insurance Provider", description: "Professional indemnity insurance coverage", image: "", validUntil: "", category: "insurance" }
        ],
        branding: {
            logoType: "image",
            logoText: "KJ & Associates",
            logoSubtitle: "Consultancy Ltd",
            logoImageUrl: "/uploads/logo_kj&.png",
            logoImageUrlDark: "/uploads/logo_kj&.png",
            faviconUrl: ""
        },
        theme: "classic-green",
        contact: {
            phone: "+255 768 757 779",
            whatsapp: "+255768757779",
            email: "md@kjconsultancy.co.tz",
            email2: "info@kjconsultancy.co.tz",
            address: "KIJITONYAMA, MABATINI ROAD, DAR ES SALAAM, TANZANIA",
            city: "Dar es Salaam",
            country: "Tanzania",
            hours: "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
            mapUrl: "",
            social: {
                linkedin: "",
                facebook: "",
                twitter: "",
                instagram: ""
            }
        },
        seo: {
            title: "KJ & Associates Consultancy Ltd",
            description: "Professional quantity surveying and construction project management services in Tanzania. 17+ years experience serving public, private, and donor-funded projects.",
            keywords: "quantity surveyor, construction, Tanzania, cost control, project management, Dar es Salaam",
            ogImage: ""
        }
    },

    // Data storage
    data: {},

    // Initialize
    async init() {
        try {
            // Initialize API sync layer if available
            if (typeof CMSSync !== 'undefined') {
                await CMSSync.init();
            }

            await this.loadData();
            this.renderAll();
            this.updateStats();
            this.loadBrandingForm();
            this.loadContactForm();
            this.loadSEOForm();
            this.loadThemeForm();
        } catch (error) {
            console.error('CMS initialization error:', error);
            // Try to recover by using defaults
            try {
                this.data = JSON.parse(JSON.stringify(this.defaults));
                this.renderAll();
                this.updateStats();
            } catch (e) {
                console.error('Failed to recover:', e);
            }
        }
    },

    // Clean up localStorage to remove base64 images that cause quota issues
    cleanupLocalStorage() {
        try {
            const stored = localStorage.getItem('kj_cms_data');
            if (!stored) return false;
            
            const data = JSON.parse(stored);
            let needsCleanup = false;
            
            // Check if projects have base64 data embedded
            if (data.projects && Array.isArray(data.projects)) {
                data.projects = data.projects.map(p => {
                    const cleanProject = { ...p };
                    if (cleanProject.image && cleanProject.image.startsWith('data:image')) {
                        cleanProject.image = `/uploads/projects/${p.id || 'temp'}-cover.jpg`;
                        needsCleanup = true;
                    }
                    if (Array.isArray(cleanProject.images)) {
                        cleanProject.images = cleanProject.images.map((img, idx) => {
                            if (typeof img === 'string' && img.startsWith('data:image')) {
                                needsCleanup = true;
                                return `/uploads/projects/${p.id || 'temp'}-${idx + 1}.jpg`;
                            }
                            return img;
                        });
                    }
                    return cleanProject;
                });
            }
            
            // Remove _imageData entirely from localStorage
            if (data._imageData) {
                delete data._imageData;
                needsCleanup = true;
            }
            
            if (needsCleanup) {
                localStorage.setItem('kj_cms_data', JSON.stringify(data));
                console.log('[CMS] Cleaned up localStorage - removed base64 images');
                return true;
            }
            return false;
        } catch (e) {
            console.warn('[CMS] Cleanup failed, clearing localStorage:', e);
            // If cleanup fails, clear localStorage entirely and rely on API
            localStorage.removeItem('kj_cms_data');
            return true;
        }
    },

    // Load data from API or localStorage
    async loadData() {
        // First, clean up any existing bloated localStorage data
        this.cleanupLocalStorage();

        // Try to load from API first if CMSSync is available
        if (typeof CMSSync !== 'undefined' && CMSSync.apiAvailable) {
            try {
                const apiData = await CMSSync.loadAll();
                if (apiData) {
                    this.data = apiData;
                    // Merge with defaults to ensure all keys exist
                    Object.keys(this.defaults).forEach(key => {
                        if (!this.data[key]) {
                            this.data[key] = this.defaults[key];
                        }
                    });
                    // Initialize empty _imageData for current session
                    this.data._imageData = {};
                    console.log('[CMS] Data loaded from API');
                    return;
                }
            } catch (error) {
                console.warn('[CMS] API load failed, falling back to localStorage:', error);
            }
        }

        // Fall back to localStorage
        const stored = localStorage.getItem('kj_cms_data');
        if (stored) {
            try {
                this.data = JSON.parse(stored);
                // Merge with defaults to ensure all keys exist
                Object.keys(this.defaults).forEach(key => {
                    if (!this.data[key]) {
                        this.data[key] = this.defaults[key];
                    }
                });
                // Initialize board data if missing or empty
                if (!this.data.board || !Array.isArray(this.data.board) || this.data.board.length === 0) {
                    this.data.board = JSON.parse(JSON.stringify(this.defaults.board));
                    this.saveData(true);
                }
                // Update branding to use new logo if it's still using text logo
                if (this.data.branding) {
                    if (this.data.branding.logoType === 'text' || !this.data.branding.logoImageUrl || this.data.branding.logoImageUrl === '') {
                        this.data.branding = {
                            logoType: "image",
                            logoText: this.data.branding.logoText || "KJ & Associates",
                            logoSubtitle: this.data.branding.logoSubtitle || "Consultancy Ltd",
                            logoImageUrl: "/uploads/logo_kj&.png",
                            logoImageUrlDark: "/uploads/logo_kj&.png",
                            faviconUrl: this.data.branding.faviconUrl || ""
                        };
                        this.saveData(true);
                    }
                } else {
                    // Initialize branding if missing
                    this.data.branding = JSON.parse(JSON.stringify(this.defaults.branding));
                    this.saveData(true);
                }
                console.log('[CMS] Data loaded from localStorage');
            } catch (e) {
                this.data = JSON.parse(JSON.stringify(this.defaults));
            }
        } else {
            this.data = JSON.parse(JSON.stringify(this.defaults));
        }
    },

    // Save data to localStorage
    saveData(silent = false) {
        // Create a copy without _imageData to avoid localStorage quota issues
        // Base64 images are too large for localStorage (~5MB limit)
        const dataToSave = { ...this.data };
        delete dataToSave._imageData;
        
        // Also strip base64 data from projects to save space
        if (dataToSave.projects) {
            dataToSave.projects = dataToSave.projects.map(p => {
                const cleanProject = { ...p };
                // If image is base64, just store a placeholder path
                if (cleanProject.image && cleanProject.image.startsWith('data:image')) {
                    cleanProject.image = `/uploads/projects/${p.id || 'temp'}-cover.jpg`;
                }
                // Clean images array
                if (Array.isArray(cleanProject.images)) {
                    cleanProject.images = cleanProject.images.map((img, idx) => {
                        if (typeof img === 'string' && img.startsWith('data:image')) {
                            return `/uploads/projects/${p.id || 'temp'}-${idx + 1}.jpg`;
                        }
                        return img;
                    });
                }
                return cleanProject;
            });
        }
        
        try {
            localStorage.setItem('kj_cms_data', JSON.stringify(dataToSave));
            if (!silent) {
                showNotification('Changes saved!', 'success');
            }
        } catch (e) {
            console.error('localStorage save failed:', e);
            if (e.name === 'QuotaExceededError') {
                showNotification('Local storage full. Data will be saved to database only.', 'warning');
            }
        }
    },

    // Update dashboard stats
    updateStats() {
        const slidesStat = document.getElementById('stat-slides');
        const projectsStat = document.getElementById('stat-projects');
        const teamStat = document.getElementById('stat-team');
        const blogStat = document.getElementById('stat-blog');

        if (slidesStat) slidesStat.textContent = (this.data.slides || []).filter(s => s.active).length;
        if (projectsStat) projectsStat.textContent = (this.data.projects || []).length;
        if (teamStat) teamStat.textContent = (this.data.team || []).length;
        if (blogStat) blogStat.textContent = (this.data.blog || []).filter(b => b.published).length;
    },

    // Render all sections
    renderAll() {
        this.renderSlides();
        this.renderProjects();
        this.renderTeam();
        this.renderBoard();
        this.renderClients();
        this.renderTestimonials();
        this.renderServices();
        this.renderBlog();
        this.renderCertifications();
    },

    // Render slides
    renderSlides() {
        const grid = document.getElementById('slidesGrid');
        if (!grid) return;

        if (this.data.slides.length === 0) {
            grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg><h3>No slides yet</h3><p>Add your first slide to get started</p></div>`;
            return;
        }

        grid.innerHTML = this.data.slides.map(slide => {
            const hasImage = slide.image && slide.image.trim() !== '';
            const imageSrc = hasImage ? slide.image : '';
            return `
            <div class="item-card ${!slide.active ? 'inactive' : ''}">
                ${hasImage ? `<img src="${imageSrc}" alt="${slide.title || 'Slide'}" class="item-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" />` : ''}
                <div class="item-image-placeholder" style="display: ${hasImage ? 'none' : 'flex'}; width: 100%; height: 160px; background: var(--gray-200); align-items: center; justify-content: center; color: var(--gray-400); font-size: 2rem;">📺</div>
                <div class="item-content">
                    <span class="item-badge ${slide.active ? 'badge-success' : 'badge-warning'}">${slide.active ? 'Active' : 'Inactive'}</span>
                    <h4 class="item-title">${slide.title || ''} ${slide.titleHighlight || ''}</h4>
                    <p class="item-meta">${slide.tagline || ''}</p>
                    <div class="item-actions">
                        <button class="btn btn-secondary btn-sm" onclick="editSlide(${slide.id})">Edit</button>
                        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('slides', ${slide.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    },

    // Render projects
    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        if (this.data.projects.length === 0) {
            grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg><h3>No projects yet</h3><p>Add your first project to showcase your work</p></div>`;
            return;
        }

        grid.innerHTML = this.data.projects.map(project => {
            let valueDisplay = 'Value Not Disclosed';
            if (project.value) {
                if (project.currency === 'USD') {
                    valueDisplay = `USD ${parseFloat(project.value.replace(/,/g, '')).toLocaleString()}`;
                } else if (project.currency === 'EUR') {
                    valueDisplay = `EUR ${parseFloat(project.value.replace(/,/g, '')).toLocaleString()}`;
                } else {
                    // TZS - format with commas
                    const numValue = parseFloat(project.value.replace(/,/g, ''));
                    valueDisplay = `TZS ${numValue.toLocaleString()}`;
                }
            }
            // Get image source - check multiple places for the actual image data
            let imageSrc = '';
            if (project.image && project.image.trim() !== '') {
                // If image is already base64 or URL, use directly
                if (project.image.startsWith('data:image') || project.image.startsWith('http')) {
                    imageSrc = project.image;
                } else if (this.data._imageData && this.data._imageData[project.image]) {
                    // It's a path - look up base64 in _imageData
                    imageSrc = this.data._imageData[project.image];
                }
            }
            // If no main image, try first image from images array
            if (!imageSrc && project.images && Array.isArray(project.images) && project.images.length > 0) {
                const firstImg = project.images[0];
                if (typeof firstImg === 'string') {
                    if (firstImg.startsWith('data:image') || firstImg.startsWith('http')) {
                        imageSrc = firstImg;
                    } else if (this.data._imageData && this.data._imageData[firstImg]) {
                        imageSrc = this.data._imageData[firstImg];
                    }
                } else if (firstImg.data && (firstImg.data.startsWith('data:image') || firstImg.data.startsWith('http'))) {
                    imageSrc = firstImg.data;
                } else if (firstImg.path && this.data._imageData && this.data._imageData[firstImg.path]) {
                    imageSrc = this.data._imageData[firstImg.path];
                }
            }
            const hasImage = !!imageSrc;
            return `
            <div class="item-card">
                ${hasImage ? `<img src="${imageSrc}" alt="${project.title || 'Project'}" class="item-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" />` : ''}
                <div class="item-image-placeholder" style="display: ${hasImage ? 'none' : 'flex'}; width: 100%; height: 160px; background: var(--gray-200); align-items: center; justify-content: center; color: var(--gray-400); font-size: 2rem;">🏗️</div>
                <div class="item-content">
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
                        <span class="item-badge ${project.status === 'Completed' ? 'badge-success' : project.status === 'Ongoing' ? 'badge-info' : 'badge-warning'}">${project.status || 'N/A'}</span>
                        ${project.featured ? '<span class="item-badge" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white;">⭐ Featured</span>' : ''}
                    </div>
                    <h4 class="item-title">${project.title || 'Untitled Project'}</h4>
                    <p class="item-meta">📍 ${project.location || 'Location TBD'}</p>
                    <p class="item-meta">🏢 ${project.client || 'Client TBD'}</p>
                    <p class="item-meta">💰 ${valueDisplay}</p>
                    <div class="item-actions">
                        <button class="btn btn-secondary btn-sm" onclick="editProject(${project.id})">Edit</button>
                        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('projects', ${project.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    },

    // Render team
    renderTeam() {
        const grid = document.getElementById('teamGrid');
        if (!grid) return;

        if (this.data.team.length === 0) {
            grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><h3>No team members yet</h3><p>Add your team to show your expertise</p></div>`;
            return;
        }

        grid.innerHTML = this.data.team.map(member => {
            // Photo can be URL or base64 data
            let photoPath = member.photo || '';
            if (photoPath && !photoPath.startsWith('data:image') && !photoPath.startsWith('http')) {
                photoPath = this.normalizeImagePath(photoPath);
            }
            const hasPhoto = photoPath && photoPath.trim() !== '' && !photoPath.includes('placeholder.com');
            return `
            <div class="item-card">
                ${hasPhoto
                    ? `<img src="${photoPath}" alt="${member.name}" class="item-image" style="object-fit: contain; object-position: center;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" />`
                    : ''
                }
                <div class="item-image-placeholder" style="display: ${hasPhoto ? 'none' : 'flex'}; width: 100%; height: 160px; background: var(--gray-200); align-items: center; justify-content: center; color: var(--gray-400); font-size: 2rem;">👤</div>
                <div class="item-content">
                    <span class="item-badge badge-info">${member.experience || 0} Years Exp.</span>
                    <h4 class="item-title">${member.name}</h4>
                    <p class="item-meta">${member.role || ''}</p>
                    <p class="item-meta">${member.qualifications || ''}</p>
                    <div class="item-actions">
                        <button class="btn btn-secondary btn-sm" onclick="editTeamMember(${member.id})">Edit</button>
                        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('team', ${member.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    },

    // Render board
    renderBoard() {
        const grid = document.getElementById('boardGrid');
        if (!grid) return;

        if (!this.data.board || !Array.isArray(this.data.board) || this.data.board.length === 0) {
            grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg><h3>No board members yet</h3><p>Add board members to show your governance structure</p></div>`;
            return;
        }

        grid.innerHTML = this.data.board.map(member => {
            // Photo can be URL or base64 data
            let photoPath = member.photo || '';
            if (photoPath && !photoPath.startsWith('data:image') && !photoPath.startsWith('http')) {
                photoPath = this.normalizeImagePath(photoPath);
            }
            const hasPhoto = photoPath && photoPath.trim() !== '' && !photoPath.includes('placeholder.com');
            return `
            <div class="item-card">
                ${hasPhoto
                    ? `<img src="${photoPath}" alt="${member.name}" class="item-image" style="object-fit: contain; object-position: center;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" />`
                    : ''
                }
                <div class="item-image-placeholder" style="display: ${hasPhoto ? 'none' : 'flex'}; width: 100%; height: 160px; background: var(--gray-200); align-items: center; justify-content: center; color: var(--gray-400); font-size: 2rem;">👤</div>
                <div class="item-content">
                    <span class="item-badge ${member.isChairman ? 'badge-success' : 'badge-info'}">${member.isChairman ? 'Chairman' : 'Board Member'}</span>
                    <h4 class="item-title">${member.name || ''}</h4>
                    <p class="item-meta">${member.role || ''}</p>
                    <p class="item-meta">${member.qualifications || ''}</p>
                    ${member.experience ? `<p class="item-meta">${member.experience}+ Years Experience</p>` : ''}
                    <div class="item-actions">
                        <button class="btn btn-secondary btn-sm" onclick="editBoardMember(${member.id})">Edit</button>
                        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('board', ${member.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    },

    // Render clients
    renderClients() {
        const grid = document.getElementById('clientsGrid');
        if (!grid) return;

        if (this.data.clients.length === 0) {
            grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5"/></svg><h3>No clients yet</h3><p>Add your clients to build trust</p></div>`;
            return;
        }

        const categoryColors = { Government: 'badge-info', Donor: 'badge-success', Bank: 'badge-warning', Private: 'badge-danger' };

        grid.innerHTML = this.data.clients.map(client => {
            let logoSrc = client.logo || '';

            // Check if we have base64 data stored for this logo
            if (logoSrc && this.data._imageData && this.data._imageData[logoSrc]) {
                logoSrc = this.data._imageData[logoSrc];
            }

            const hasLogo = logoSrc && logoSrc.trim() !== '' && !logoSrc.includes('placeholder.com');
            return `
            <div class="item-card">
                ${hasLogo
                    ? `<div style="padding: 1rem; background: var(--gray-50); border-bottom: 1px solid var(--gray-200); display: flex; align-items: center; justify-content: center; min-height: 120px;">
                        <img src="${logoSrc}" alt="${client.name}" style="max-width: 150px; max-height: 80px; object-fit: contain;" onerror="this.parentElement.style.display='none';" onload="this.parentElement.style.display='flex';" />
                    </div>`
                    : ''
                }
                <div class="item-content">
                    <span class="item-badge ${categoryColors[client.category] || 'badge-info'}">${client.category}</span>
                    <h4 class="item-title">${client.name}</h4>
                    ${client.website ? `<p class="item-meta">🔗 <a href="${client.website}" target="_blank">${client.website}</a></p>` : ''}
                    <div class="item-actions">
                        <button class="btn btn-secondary btn-sm" onclick="editClient(${client.id})">Edit</button>
                        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('clients', ${client.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    },

    // Render testimonials
    renderTestimonials() {
        const grid = document.getElementById('testimonialsGrid');
        if (!grid) return;

        if (this.data.testimonials.length === 0) {
            grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg><h3>No testimonials yet</h3><p>Add client testimonials to build credibility</p></div>`;
            return;
        }

        grid.innerHTML = this.data.testimonials.map(t => {
            const hasPhoto = t.photo && t.photo.trim() !== '' && !t.photo.includes('placeholder.com');
            const photoSrc = hasPhoto ? t.photo : '';
            return `
            <div class="item-card">
                <div class="item-content">
                    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                        ${hasPhoto
                    ? `<img src="${photoSrc}" alt="${t.name}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: contain; background: var(--gray-200);" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" />`
                    : ''
                }
                        <div style="display: ${hasPhoto ? 'none' : 'flex'}; width: 50px; height: 50px; border-radius: 50%; background: var(--gray-200); align-items: center; justify-content: center; color: var(--gray-400); font-size: 1.5rem;">👤</div>
                        <div>
                            <h4 class="item-title" style="margin-bottom: 0;">${t.name}</h4>
                            <p class="item-meta">${t.position}, ${t.company}</p>
                        </div>
                    </div>
                    <p style="color: var(--gray-600); font-style: italic; margin-bottom: 0.5rem;">"${t.text.substring(0, 100)}..."</p>
                    <p class="item-meta">${'⭐'.repeat(t.rating)}</p>
                    <div class="item-actions">
                        <button class="btn btn-secondary btn-sm" onclick="editTestimonial(${t.id})">Edit</button>
                        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('testimonials', ${t.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    },

    // Render services
    renderServices() {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;

        if (this.data.services.length === 0) {
            grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg><h3>No services yet</h3><p>Add your services to showcase your offerings</p></div>`;
            return;
        }

        grid.innerHTML = this.data.services.map(service => `
            <div class="item-card">
                <div class="item-content">
                    <span style="font-size: 2rem; margin-bottom: 0.75rem; display: block;">${service.icon}</span>
                    <span class="item-badge badge-info">${service.category}</span>
                    <h4 class="item-title">${service.title}</h4>
                    <p class="item-meta">${service.summary.substring(0, 80)}...</p>
                    <div class="item-actions">
                        <button class="btn btn-secondary btn-sm" onclick="editService(${service.id})">Edit</button>
                        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('services', ${service.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Render blog posts
    renderBlog() {
        const grid = document.getElementById('blogGrid');
        if (!grid) return;

        const blogPosts = this.data.blog || [];

        if (blogPosts.length === 0) {
            grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><h3>No blog posts yet</h3><p>Add your first blog post to share insights</p></div>`;
            return;
        }

        const categoryLabels = {
            'industry-insights': 'Industry Insights',
            'project-spotlight': 'Project Spotlight',
            'cost-management': 'Cost Management',
            'regulations': 'Regulations',
            'company-news': 'Company News'
        };

        grid.innerHTML = blogPosts.map(post => {
            const hasImage = post.image && post.image.trim() !== '' && !post.image.includes('placeholder.com');
            const imageSrc = hasImage ? post.image : '';
            return `
            <div class="item-card ${!post.published ? 'inactive' : ''}">
                ${hasImage
                    ? `<img src="${imageSrc}" alt="${post.title}" class="item-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" />`
                    : ''
                }
                <div class="item-image-placeholder" style="display: ${hasImage ? 'none' : 'flex'}; width: 100%; height: 160px; background: var(--gray-200); align-items: center; justify-content: center; color: var(--gray-400); font-size: 2rem;">📝</div>
                <div class="item-content">
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                        <span class="item-badge ${post.published ? 'badge-success' : 'badge-warning'}">${post.published ? 'Published' : 'Draft'}</span>
                        ${post.featured ? '<span class="item-badge badge-info">⭐ Featured</span>' : ''}
                    </div>
                    <h4 class="item-title">${post.title}</h4>
                    <p class="item-meta">📁 ${categoryLabels[post.category] || post.category}</p>
                    <p class="item-meta">✍️ ${post.author}</p>
                    <p class="item-meta">📅 ${post.date}</p>
                    <div class="item-actions">
                        <button class="btn btn-secondary btn-sm" onclick="editBlogPost(${post.id})">Edit</button>
                        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('blog', ${post.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    },

    // Render certifications
    renderCertifications() {
        const grid = document.getElementById('certificationsGrid');
        if (!grid) return;

        const certifications = this.data.certifications || [];

        if (certifications.length === 0) {
            grid.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15l-2 5l9-11h-5l2-5L7 15h5z"/></svg><h3>No certifications yet</h3><p>Add your certifications and legal documents</p></div>`;
            return;
        }

        const categoryLabels = {
            'professional': 'Professional',
            'tax': 'Tax & Revenue',
            'legal': 'Legal',
            'insurance': 'Insurance'
        };

        grid.innerHTML = certifications.map(cert => {
            let imagePath = cert.image || '';
            if (imagePath && !imagePath.startsWith('data:image') && !imagePath.startsWith('http')) {
                imagePath = this.normalizeImagePath(imagePath);
            }
            const hasImage = imagePath && imagePath.trim() !== '';
            return `
            <div class="item-card">
                ${hasImage
                    ? `<img src="${imagePath}" alt="${cert.title}" class="item-image" style="object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" />`
                    : ''
                }
                <div class="item-image-placeholder" style="display: ${hasImage ? 'none' : 'flex'}; width: 100%; height: 160px; background: var(--gray-200); align-items: center; justify-content: center; color: var(--gray-400); font-size: 2rem;">📜</div>
                <div class="item-content">
                    <span class="item-badge badge-info">${categoryLabels[cert.category] || cert.category}</span>
                    <h4 class="item-title">${cert.title}</h4>
                    <p class="item-meta">🏛️ ${cert.issuer || 'N/A'}</p>
                    ${cert.validUntil ? `<p class="item-meta">📅 Valid until: ${cert.validUntil}</p>` : ''}
                    <div class="item-actions">
                        <button class="btn btn-secondary btn-sm" onclick="editCertification(${cert.id})">Edit</button>
                        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteItem('certifications', ${cert.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    },

    // Load branding form
    loadBrandingForm() {
        const b = this.data.branding;
        document.querySelector(`input[name="logoType"][value="${b.logoType}"]`).checked = true;
        document.getElementById('logoText').value = b.logoText || '';
        document.getElementById('logoSubtitle').value = b.logoSubtitle || '';
        document.getElementById('logoImageUrl').value = b.logoImageUrl || '';
        document.getElementById('logoImageUrlDark').value = b.logoImageUrlDark || '';
        document.getElementById('faviconUrl').value = b.faviconUrl || '';
        toggleLogoType();
        updateLogoPreview();
    },

    // Load contact form
    loadContactForm() {
        const c = this.data.contact;
        document.getElementById('contactPhone').value = c.phone || '';
        document.getElementById('contactWhatsapp').value = c.whatsapp || '';
        document.getElementById('contactEmail').value = c.email || '';
        document.getElementById('contactEmail2').value = c.email2 || '';
        document.getElementById('contactAddress').value = c.address || '';
        document.getElementById('contactCity').value = c.city || '';
        document.getElementById('contactCountry').value = c.country || '';
        document.getElementById('contactHours').value = c.hours || '';
        document.getElementById('contactMap').value = c.mapUrl || '';
        document.getElementById('socialLinkedin').value = c.social?.linkedin || '';
        document.getElementById('socialFacebook').value = c.social?.facebook || '';
        document.getElementById('socialTwitter').value = c.social?.twitter || '';
        document.getElementById('socialInstagram').value = c.social?.instagram || '';
    },

    // Load SEO form
    loadSEOForm() {
        const s = this.data.seo;
        document.getElementById('seoTitle').value = s.title || '';
        document.getElementById('seoDescription').value = s.description || '';
        document.getElementById('seoKeywords').value = s.keywords || '';
        document.getElementById('seoOgImage').value = s.ogImage || '';
    },

    // Load theme form
    loadThemeForm() {
        const currentTheme = this.data.theme || 'classic-green';
        // Initialize selectedTheme to match saved theme
        selectedTheme = currentTheme;
        updateThemeSelection(currentTheme);
    },

    // Get next ID for a collection
    getNextId(collection) {
        const items = this.data[collection];
        return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    },

    // Normalize image path for admin panel (handles relative paths from admin folder)
    normalizeImagePath(path) {
        if (!path || path.trim() === '') return '';
        // If it's already a full URL (http/https), return as-is
        if (path.startsWith('http://') || path.startsWith('https://')) return path;

        // Check if we're using file:// protocol (local file system)
        const isFileProtocol = window.location.protocol === 'file:';
        const isAdminPanel = window.location.pathname.includes('/admin/') || window.location.pathname.includes('admin/index.html');

        // If it's root-relative (starts with /)
        if (path.startsWith('/')) {
            // For file:// protocol in admin folder, convert to ../ relative path
            if (isFileProtocol && isAdminPanel) {
                return '..' + path;
            }
            // For web server, keep root-relative
            return path;
        }

        // If it's already a relative path with ../
        if (path.startsWith('../')) return path;

        // If it's a relative path (like images/team/...)
        if (isAdminPanel && !path.startsWith('../')) {
            // In admin folder, use ../ to go up to root
            return '../' + path;
        }

        // Otherwise, make it root-relative (for web server)
        return '/' + path;
    }
};

// Section navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');

    // Show selected section
    const section = document.getElementById(`section-${sectionId}`);
    if (section) {
        section.style.display = 'block';
        section.classList.add('active');
    }

    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    event.target.classList.add('active');

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Notification
function showNotification(text, type = 'success') {
    const notification = document.getElementById('notification');
    document.getElementById('notificationText').textContent = text;
    notification.className = `notification ${type} show`;
    setTimeout(() => notification.classList.remove('show'), 3000);
}

// Logo type toggle
function toggleLogoType() {
    const isText = document.querySelector('input[name="logoType"]:checked').value === 'text';
    document.getElementById('textLogoOptions').style.display = isText ? 'block' : 'none';
    document.getElementById('imageLogoOptions').style.display = isText ? 'none' : 'block';
    updateLogoPreview();
}

function updateLogoPreview() {
    const isText = document.querySelector('input[name="logoType"]:checked').value === 'text';
    const lightPreview = document.querySelector('.logo-preview-light');
    const darkPreview = document.querySelector('.logo-preview-dark');

    if (isText) {
        const text = document.getElementById('logoText').value || 'KJ & Associates';
        const subtitle = document.getElementById('logoSubtitle').value || 'Consultancy Ltd';

        lightPreview.innerHTML = `
            <span class="preview-label">Light Background</span>
            <div class="text-logo">
                <span class="logo-text-preview">${text}</span>
                <span class="logo-subtitle-preview">${subtitle}</span>
            </div>
        `;
        darkPreview.innerHTML = `
            <span class="preview-label">Dark Background</span>
            <div class="text-logo">
                <span class="logo-text-preview light">${text}</span>
                <span class="logo-subtitle-preview light">${subtitle}</span>
            </div>
        `;
    } else {
        const lightUrl = document.getElementById('logoImageUrl').value;
        const darkUrl = document.getElementById('logoImageUrlDark').value || lightUrl;

        lightPreview.innerHTML = `
            <span class="preview-label">Light Background</span>
            ${lightUrl ? `<img src="${lightUrl}" alt="Logo" style="max-height: 60px; max-width: 100%;">` : '<span style="color: var(--gray-400);">No image</span>'}
        `;
        darkPreview.innerHTML = `
            <span class="preview-label">Dark Background</span>
            ${darkUrl ? `<img src="${darkUrl}" alt="Logo" style="max-height: 60px; max-width: 100%;">` : '<span style="color: var(--gray-400);">No image</span>'}
        `;
    }
}

// ==================== FILE UPLOAD HANDLER ====================
// Generate file path based on context and item ID
function generateImagePath(urlInputId, fileExtension) {
    // Determine category and get item ID
    let category = 'uploads';
    let itemId = '';
    let itemName = '';

    // Get category and ID based on the input field
    if (urlInputId.includes('project')) {
        category = 'projects';
        itemId = document.getElementById('projectId')?.value || 'new';
        const title = document.getElementById('projectTitle')?.value || 'project';
        itemName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
    } else if (urlInputId.includes('team')) {
        category = 'team';
        itemId = document.getElementById('teamId')?.value || 'new';
        const name = document.getElementById('teamName')?.value || 'member';
        itemName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
    } else if (urlInputId.includes('board')) {
        category = 'board';
        itemId = document.getElementById('boardId')?.value || 'new';
        const name = document.getElementById('boardName')?.value || 'member';
        itemName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
    } else if (urlInputId.includes('client')) {
        category = 'clients';
        itemId = document.getElementById('clientId')?.value || 'new';
        const name = document.getElementById('clientName')?.value || 'client';
        itemName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
    } else if (urlInputId.includes('slide')) {
        category = 'slides';
        itemId = document.getElementById('slideId')?.value || 'new';
        itemName = `slide-${itemId}`;
    } else if (urlInputId.includes('blog')) {
        category = 'blog';
        itemId = document.getElementById('blogId')?.value || 'new';
        const title = document.getElementById('blogTitle')?.value || 'post';
        itemName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
    } else if (urlInputId.includes('testimonial')) {
        category = 'testimonials';
        itemId = document.getElementById('testimonialId')?.value || 'new';
        const name = document.getElementById('testimonialName')?.value || 'testimonial';
        itemName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
    } else if (urlInputId.includes('certification')) {
        category = 'certifications';
        itemId = document.getElementById('certificationId')?.value || 'new';
        const title = document.getElementById('certificationTitle')?.value || 'certificate';
        itemName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
    }

    // Generate filename: category-itemname-id.extension
    const filename = itemName ? `${itemName}-${itemId}` : `${category}-${itemId}`;
    return `/uploads/${category}/${filename}${fileExtension}`;
}

// Handle image file uploads - generates path and stores base64 for download
function handleImageUpload(fileInput, urlInputId, previewContainerId) {
    try {
        const file = fileInput.files[0];
        if (!file) {
            console.log('No file selected');
            return;
        }

        // Validate file type - check both MIME type and extension
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
        const isValidImage = file.type.startsWith('image/') || validExtensions.includes(fileExtension);

        if (!isValidImage) {
            alert('Please select an image file (JPG, PNG, GIF, etc.)');
            fileInput.value = '';
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image file is too large. Please select an image smaller than 5MB.');
            fileInput.value = '';
            return;
        }

        // Normalize file extension (use .jpg for .jpeg, etc.)
        const normalizedExtension = fileExtension === '.jpeg' ? '.jpg' : fileExtension;

        // Generate proper file path
        const filePath = generateImagePath(urlInputId, normalizedExtension);

        // Show loading state
        const urlInput = document.getElementById(urlInputId);
        if (urlInput) {
            urlInput.value = 'Uploading...';
            urlInput.disabled = true;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const dataUrl = e.target.result;

                // Store the base64 data with the file path in a temporary storage
                if (!window.uploadedImages) {
                    window.uploadedImages = {};
                }
                window.uploadedImages[urlInputId] = {
                    path: filePath,
                    data: dataUrl,
                    filename: filePath.split('/').pop()
                };

                // Set the URL input to the file path (not base64)
                if (urlInput) {
                    urlInput.value = filePath;
                    urlInput.disabled = false;
                }

                // Show preview using base64 data
                try {
                    const previewContainer = document.getElementById(previewContainerId);
                    if (previewContainer) {
                        let previewImg = previewContainer.querySelector('img') || document.getElementById(previewContainerId.replace('Preview', 'PreviewImg'));
                        if (previewImg) {
                            previewImg.src = dataUrl;
                            previewImg.onerror = function () {
                                console.warn('Preview image failed to load');
                            };
                            previewContainer.style.display = 'block';
                        } else {
                            // Create preview image if it doesn't exist
                            const img = document.createElement('img');
                            img.src = dataUrl;
                            img.alt = 'Preview';
                            img.style.cssText = 'width: 150px; height: 150px; object-fit: contain; border-radius: 8px; border: 2px solid var(--gray-200);';
                            img.onerror = function () {
                                console.warn('Preview image failed to load');
                            };
                            previewContainer.innerHTML = '';
                            previewContainer.appendChild(img);
                            previewContainer.style.display = 'block';
                        }
                    }
                } catch (previewError) {
                    console.error('Error showing preview:', previewError);
                }

                // Show brief success notification
                setTimeout(() => {
                    showNotification('Image uploaded successfully!', 'success');
                }, 100);

                // Trigger any existing preview functions
                try {
                    // Force preview update after a short delay to ensure DOM is ready
                    setTimeout(() => {
                        if (urlInputId === 'projectImage' && typeof previewProjectImage === 'function') {
                            previewProjectImage();
                        }
                        if (urlInputId === 'slideImage' && typeof previewSlideImage === 'function') {
                            previewSlideImage();
                        }
                        // Also trigger input event to ensure preview updates
                        if (urlInput) {
                            urlInput.dispatchEvent(new Event('input'));
                        }
                    }, 100);
                } catch (previewFuncError) {
                    console.warn('Preview function error:', previewFuncError);
                }
            } catch (error) {
                console.error('Error processing uploaded file:', error);
                alert('Error processing image. Please try again.');
                if (urlInput) {
                    urlInput.value = '';
                    urlInput.disabled = false;
                }
                fileInput.value = '';
            }
        };

        reader.onerror = function () {
            console.error('FileReader error');
            alert('Error reading file. Please try again.');
            if (urlInput) {
                urlInput.value = '';
                urlInput.disabled = false;
            }
            fileInput.value = '';
        };

        reader.onprogress = function (e) {
            if (e.lengthComputable) {
                const percentLoaded = Math.round((e.loaded / e.total) * 100);
                if (urlInput && percentLoaded < 100) {
                    urlInput.value = `Uploading... ${percentLoaded}%`;
                }
            }
        };

        reader.readAsDataURL(file);
    } catch (error) {
        console.error('Error in handleImageUpload:', error);
        alert('An error occurred while uploading the image. Please try again.');
        fileInput.value = '';
        const urlInput = document.getElementById(urlInputId);
        if (urlInput) {
            urlInput.value = '';
            urlInput.disabled = false;
        }
    }
}

// ==================== MULTIPLE IMAGE UPLOAD FOR PROJECTS ====================
// Store project images temporarily
window.projectImages = window.projectImages || [];

// Handle multiple image uploads for projects
function handleMultipleImageUpload(fileInput, storageKey) {
    const files = fileInput.files;
    if (!files || files.length === 0) return;

    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    Array.from(files).forEach((file, index) => {
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        const isValidImage = file.type.startsWith('image/') || validExtensions.includes(fileExtension);

        if (!isValidImage) {
            showNotification(`${file.name} is not a valid image file`, 'error');
            return;
        }

        if (file.size > maxSize) {
            showNotification(`${file.name} is too large (max 5MB)`, 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const dataUrl = e.target.result;
            const projectId = document.getElementById('projectId')?.value || 'new';
            const title = document.getElementById('projectTitle')?.value || 'project';
            const itemName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
            const imgIndex = window.projectImages.length + 1;
            const normalizedExtension = fileExtension === '.jpeg' ? '.jpg' : fileExtension;
            const filePath = `/uploads/projects/${itemName}-${projectId}-${imgIndex}${normalizedExtension}`;

            window.projectImages.push({
                path: filePath,
                data: dataUrl,
                filename: filePath.split('/').pop()
            });

            renderProjectImagesGallery();
            showNotification(`Image ${file.name} added`, 'success');
        };
        reader.readAsDataURL(file);
    });

    // Clear the file input for next selection
    fileInput.value = '';
}

// Add image URL to project images
function addImageUrl(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();

    const urlInput = document.getElementById('projectImage');
    const url = urlInput.value.trim();

    if (!url) return;

    if (!url.startsWith('http') && !url.startsWith('/')) {
        showNotification('Please enter a valid URL', 'error');
        return;
    }

    window.projectImages.push({
        path: url,
        data: url, // For external URLs, path and data are the same
        filename: url.split('/').pop()
    });

    urlInput.value = '';
    renderProjectImagesGallery();
    showNotification('Image URL added', 'success');
}

// Render the project images gallery in the modal
function renderProjectImagesGallery() {
    const gallery = document.getElementById('projectImagesGallery');
    const grid = document.getElementById('projectImagesGrid');

    if (!gallery || !grid) return;

    if (window.projectImages.length === 0) {
        gallery.style.display = 'none';
        return;
    }

    gallery.style.display = 'block';
    grid.innerHTML = window.projectImages.map((img, index) => `
        <div class="gallery-item ${index === 0 ? 'main' : ''}" data-index="${index}">
            <img src="${img.data}" alt="Project image ${index + 1}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23f3f4f6%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2212%22>Error</text></svg>'">
            <button type="button" class="remove-btn" onclick="removeProjectImage(${index})" title="Remove image">&times;</button>
            ${index === 0 ? '<span class="main-badge">MAIN</span>' : `<button type="button" class="set-main-btn" onclick="setMainProjectImage(${index})">Set as main</button>`}
        </div>
    `).join('');
}

// Remove image from project gallery
function removeProjectImage(index) {
    window.projectImages.splice(index, 1);
    renderProjectImagesGallery();
}

// Set an image as the main/cover image
function setMainProjectImage(index) {
    if (index <= 0 || index >= window.projectImages.length) return;

    const [img] = window.projectImages.splice(index, 1);
    window.projectImages.unshift(img);
    renderProjectImagesGallery();
}

// Clear project images (called when opening modal for new project)
function clearProjectImages() {
    window.projectImages = [];
    renderProjectImagesGallery();
}

// Load existing project images into the gallery
function loadProjectImages(images) {
    window.projectImages = [];

    if (!images) return;

    // Helper to get image data - handles base64, URLs, and path lookups
    const getImageData = (value) => {
        if (!value) return '';
        // If it's already base64 or URL, use directly
        if (value.startsWith('data:image') || value.startsWith('http://') || value.startsWith('https://')) {
            return value;
        }
        // It's a path - check _imageData storage for base64 data
        if (CMS.data._imageData && CMS.data._imageData[value]) {
            return CMS.data._imageData[value];
        }
        // Path without base64 data - return empty (will show placeholder)
        return '';
    };

    // Handle both array and single string
    if (typeof images === 'string' && images.trim()) {
        const data = getImageData(images);
        if (data) {
            window.projectImages.push({
                path: images.startsWith('data:') ? 'uploaded-image' : images,
                data: data,
                filename: images.startsWith('data:') ? 'image.jpg' : images.split('/').pop()
            });
        }
    } else if (Array.isArray(images)) {
        images.forEach(img => {
            if (typeof img === 'string' && img.trim()) {
                const data = getImageData(img);
                if (data) {
                    window.projectImages.push({
                        path: img.startsWith('data:') ? 'uploaded-image' : img,
                        data: data,
                        filename: img.startsWith('data:') ? 'image.jpg' : img.split('/').pop()
                    });
                }
            } else if (img && typeof img === 'object') {
                // Handle object format { path, data }
                const imgData = img.data || '';
                const data = getImageData(imgData) || getImageData(img.path);
                if (data) {
                    window.projectImages.push({
                        path: img.path || 'uploaded-image',
                        data: data,
                        filename: img.path ? img.path.split('/').pop() : 'image.jpg'
                    });
                }
            }
        });
    }

    renderProjectImagesGallery();
}

// Export all uploaded images as downloadable files
function exportUploadedImages() {
    if (!window.uploadedImages || Object.keys(window.uploadedImages).length === 0) {
        alert('No images to export. Upload images first.');
        return;
    }

    // Create a zip-like structure or download individual files
    const images = window.uploadedImages;
    let downloadCount = 0;

    Object.keys(images).forEach(key => {
        const imgData = images[key];
        const dataUrl = imgData.data;

        // Convert base64 to blob
        const byteString = atob(dataUrl.split(',')[1]);
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        // Create download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = imgData.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        downloadCount++;
    });

    // Clear uploaded images after export
    window.uploadedImages = {};

    showNotification(`Exported ${downloadCount} image(s). Please save them to the /uploads folder with the correct subfolder structure.`, 'success');
}

// Save functions
function saveBranding() {
    CMS.data.branding = {
        logoType: document.querySelector('input[name="logoType"]:checked').value,
        logoText: document.getElementById('logoText').value,
        logoSubtitle: document.getElementById('logoSubtitle').value,
        logoImageUrl: document.getElementById('logoImageUrl').value,
        logoImageUrlDark: document.getElementById('logoImageUrlDark').value,
        faviconUrl: document.getElementById('faviconUrl').value
    };
    CMS.saveData();
}

function saveContact() {
    CMS.data.contact = {
        phone: document.getElementById('contactPhone').value,
        whatsapp: document.getElementById('contactWhatsapp').value,
        email: document.getElementById('contactEmail').value,
        email2: document.getElementById('contactEmail2').value,
        address: document.getElementById('contactAddress').value,
        city: document.getElementById('contactCity').value,
        country: document.getElementById('contactCountry').value,
        hours: document.getElementById('contactHours').value,
        mapUrl: document.getElementById('contactMap').value,
        social: {
            linkedin: document.getElementById('socialLinkedin').value,
            facebook: document.getElementById('socialFacebook').value,
            twitter: document.getElementById('socialTwitter').value,
            instagram: document.getElementById('socialInstagram').value
        }
    };
    CMS.saveData();
}

function saveSEO() {
    CMS.data.seo = {
        title: document.getElementById('seoTitle').value,
        description: document.getElementById('seoDescription').value,
        keywords: document.getElementById('seoKeywords').value,
        ogImage: document.getElementById('seoOgImage').value
    };
    CMS.saveData();
}

// Slide functions
function openSlideModal(id = null) {
    const modal = document.getElementById('slideModal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.getElementById('slideModalTitle').textContent = id ? 'Edit Slide' : 'Add Slide';

    // Scroll modal to top
    const modalBody = modal.querySelector('.modal-body') || modal.querySelector('.space-y-4');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }

    if (id) {
        const slide = CMS.data.slides.find(s => s.id === id);
        if (slide) {
            document.getElementById('slideId').value = slide.id;
            document.getElementById('slideTagline').value = slide.tagline;
            document.getElementById('slideTitle').value = slide.title;
            document.getElementById('slideTitleHighlight').value = slide.titleHighlight;
            document.getElementById('slideButtonText').value = slide.buttonText;
            document.getElementById('slideButtonLink').value = slide.buttonLink;
            document.getElementById('slideImage').value = slide.image;
            document.getElementById('slideActive').checked = slide.active;
            previewSlideImage();
        }
    } else {
        document.getElementById('slideId').value = '';
        document.getElementById('slideTagline').value = '';
        document.getElementById('slideTitle').value = '';
        document.getElementById('slideTitleHighlight').value = '';
        document.getElementById('slideButtonText').value = 'Learn More';
        document.getElementById('slideButtonLink').value = '';
        document.getElementById('slideImage').value = '';
        document.getElementById('slideActive').checked = true;
        const preview = document.getElementById('slideImagePreview');
        if (preview) {
            preview.classList.add('hidden');
            preview.classList.remove('block');
        }
    }
}

function closeSlideModal() {
    const modal = document.getElementById('slideModal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function previewSlideImage() {
    const url = document.getElementById('slideImage').value;
    const preview = document.getElementById('slideImagePreview');
    const img = document.getElementById('slidePreviewImg');
    if (url && (url.startsWith('http') || url.startsWith('data:image'))) {
        img.src = url;
        preview.style.display = 'block';
        img.onerror = function () {
            preview.style.display = 'none';
        };
    } else {
        preview.style.display = 'none';
    }
}

function saveSlide() {
    const id = document.getElementById('slideId').value;
    let imageValue = document.getElementById('slideImage').value.trim();

    // If there's uploaded image data, update the path with the actual ID
    if (window.uploadedImages && window.uploadedImages['slideImage']) {
        const uploadedData = window.uploadedImages['slideImage'];
        const actualId = id ? parseInt(id) : CMS.getNextId('slides');
        const fileExtension = uploadedData.path.split('.').pop();
        imageValue = `/uploads/slides/slide-${actualId}.${fileExtension}`;

        // Update the stored path
        uploadedData.path = imageValue;
        uploadedData.filename = imageValue.split('/').pop();
    }

    const slide = {
        id: id ? parseInt(id) : CMS.getNextId('slides'),
        tagline: document.getElementById('slideTagline').value,
        title: document.getElementById('slideTitle').value,
        titleHighlight: document.getElementById('slideTitleHighlight').value,
        buttonText: document.getElementById('slideButtonText').value,
        buttonLink: document.getElementById('slideButtonLink').value,
        image: imageValue,
        active: document.getElementById('slideActive').checked
    };

    const isNew = !id;

    if (id) {
        const index = CMS.data.slides.findIndex(s => s.id === parseInt(id));
        CMS.data.slides[index] = slide;
    } else {
        CMS.data.slides.push(slide);
    }

    // Save to localStorage
    CMS.saveData();

    // Sync to API/database
    if (typeof CMSSync !== 'undefined' && CMSSync.apiAvailable) {
        CMSSync.saveSlide(slide, isNew).then(result => {
            if (result.success) {
                console.log('[CMS] Slide synced to database');
                showNotification('Slide saved successfully', 'success');
            } else {
                console.warn('[CMS] Failed to sync slide to database:', result.error);
                showNotification('Slide saved locally, but failed to sync to database: ' + (result.error || 'Unknown error'), 'warning');
            }
        }).catch(err => {
            console.error('[CMS] Error syncing slide:', err);
            showNotification('Slide saved locally, but failed to sync to database: ' + (err.message || 'Unknown error'), 'warning');
        });
    } else {
        showNotification('Slide saved successfully (local only)', 'success');
    }

    CMS.renderSlides();
    CMS.updateStats();
    closeSlideModal();
}

function editSlide(id) {
    openSlideModal(id);
}

// Project functions
function openProjectModal(id = null) {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.getElementById('projectModalTitle').textContent = id ? 'Edit Project' : 'Add Project';

    // Scroll modal to top
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }

    if (id) {
        const project = CMS.data.projects.find(p => p.id === id);
        if (project) {
            document.getElementById('projectId').value = project.id || '';
            document.getElementById('projectTitle').value = project.title || '';
            document.getElementById('projectClient').value = project.client || '';
            document.getElementById('projectLocation').value = project.location || '';
            document.getElementById('projectValue').value = project.value || '';
            document.getElementById('projectFunding').value = project.funding || '';
            document.getElementById('projectSector').value = project.sector || 'Building';
            document.getElementById('projectStatus').value = project.status || 'Completed';
            document.getElementById('projectYear').value = project.year || new Date().getFullYear();
            document.getElementById('projectDuration').value = project.duration || '';
            document.getElementById('projectDescription').value = project.description || '';
            document.getElementById('projectFeatured').checked = project.featured || false;
            const imageValue = project.image || '';
            document.getElementById('projectImage').value = imageValue;
            document.getElementById('projectCurrency').value = project.currency || '';
            document.getElementById('projectServices').value = project.services?.join(', ') || '';

            // Show image preview if image exists
            const preview = document.getElementById('projectImagePreview');
            const previewImg = document.getElementById('projectPreviewImg');
            if (preview && previewImg) {
                if (imageValue && imageValue.trim() !== '') {
                    // Check if it's base64 or a URL
                    if (imageValue.startsWith('data:image') || imageValue.startsWith('http')) {
                        previewImg.src = imageValue;
                    } else {
                        // It's a path - check _imageData first for base64
                        if (CMS.data._imageData && CMS.data._imageData[imageValue]) {
                            previewImg.src = CMS.data._imageData[imageValue];
                        } else {
                            previewImg.src = imageValue;
                            previewImg.onerror = function () {
                                if (window.uploadedImages && window.uploadedImages['projectImage']) {
                                    this.src = window.uploadedImages['projectImage'].data;
                                } else {
                                    preview.style.display = 'none';
                                }
                            };
                        }
                    }
                    preview.style.display = 'block';
                } else {
                    preview.style.display = 'none';
                }
            }

            // Load project images into gallery (supports both single image and array)
            loadProjectImages(project.images || project.image);
        }
    } else {
        document.getElementById('projectId').value = '';
        document.getElementById('projectTitle').value = '';
        document.getElementById('projectClient').value = '';
        document.getElementById('projectLocation').value = '';
        document.getElementById('projectValue').value = '';
        document.getElementById('projectFunding').value = '';
        document.getElementById('projectSector').value = 'Building';
        document.getElementById('projectStatus').value = 'Completed';
        document.getElementById('projectYear').value = new Date().getFullYear();
        document.getElementById('projectDuration').value = '';
        document.getElementById('projectDescription').value = '';
        document.getElementById('projectImage').value = '';
        document.getElementById('projectCurrency').value = '';
        document.getElementById('projectServices').value = '';
        document.getElementById('projectFeatured').checked = false;

        // Clear project images gallery
        clearProjectImages();
    }

    // Clear file input
    const fileInput = document.getElementById('projectImageUpload');
    if (fileInput) fileInput.value = '';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function saveProject() {
    const id = document.getElementById('projectId').value;
    const actualId = id ? parseInt(id) : CMS.getNextId('projects');
    const title = document.getElementById('projectTitle').value || 'project';
    const itemName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);

    // Process multiple images
    let images = [];
    let imagesForAPI = []; // Full base64 data for API
    let mainImage = '';
    let mainImageForAPI = '';

    if (window.projectImages && window.projectImages.length > 0) {
        // Store base64 data mapping for frontend use (memory only, not localStorage)
        if (!CMS.data._imageData) {
            CMS.data._imageData = {};
        }

        window.projectImages.forEach((img, index) => {
            let imageData = img.data || '';
            let finalPath = img.path || '';

            // If it's a base64 image, generate a proper path for reference
            if (imageData && imageData.startsWith('data:image')) {
                const extension = imageData.split(';')[0].split('/')[1] || 'jpg';
                finalPath = `/uploads/projects/${itemName}-${actualId}-${index + 1}.${extension}`;
                // Store in memory for current session display
                CMS.data._imageData[finalPath] = imageData;
            }

            // For localStorage: store paths only (to avoid quota issues)
            images.push(finalPath || imageData);
            // For API: store actual base64 data (database has no size limit like localStorage)
            imagesForAPI.push(imageData || finalPath);
        });

        // First image is the main/cover image
        mainImage = images[0] || '';
        mainImageForAPI = imagesForAPI[0] || '';
    }

    const project = {
        id: actualId,
        title: document.getElementById('projectTitle').value,
        client: document.getElementById('projectClient').value,
        location: document.getElementById('projectLocation').value,
        value: document.getElementById('projectValue').value,
        funding: document.getElementById('projectFunding').value,
        sector: document.getElementById('projectSector').value,
        status: document.getElementById('projectStatus').value,
        year: parseInt(document.getElementById('projectYear').value),
        duration: parseInt(document.getElementById('projectDuration').value),
        description: document.getElementById('projectDescription').value,
        image: mainImage, // Path for localStorage
        images: images, // Paths for localStorage
        currency: document.getElementById('projectCurrency').value || undefined,
        services: document.getElementById('projectServices').value.split(',').map(s => s.trim()).filter(s => s),
        featured: document.getElementById('projectFeatured')?.checked === true
    };

    // Create a version with full image data for API sync
    const projectForAPI = {
        ...project,
        image: mainImageForAPI,
        images: imagesForAPI
    };

    console.log('Saving project with featured:', project.featured, '- Title:', project.title);

    const isNew = !id;

    if (id) {
        const index = CMS.data.projects.findIndex(p => p.id === parseInt(id));
        CMS.data.projects[index] = project;
    } else {
        CMS.data.projects.push(project);
    }

    // Save to localStorage
    CMS.saveData();

    // Sync to API/database (use projectForAPI which has full base64 image data)
    if (typeof CMSSync !== 'undefined' && CMSSync.apiAvailable) {
        CMSSync.saveProject(projectForAPI, isNew).then(result => {
            if (result.success) {
                console.log('[CMS] Project synced to database');
                showNotification('Project saved successfully', 'success');
            } else {
                console.warn('[CMS] Failed to sync project to database:', result.error);
                showNotification('Project saved locally, but failed to sync to database: ' + (result.error || 'Unknown error'), 'warning');
            }
        }).catch(err => {
            console.error('[CMS] Error syncing project:', err);
            showNotification('Project saved locally, but failed to sync to database: ' + (err.message || 'Unknown error'), 'warning');
        });
    } else {
        showNotification('Project saved successfully (local only)', 'success');
    }

    CMS.renderProjects();
    CMS.updateStats();
    closeProjectModal();

    // Clear project images for next use
    window.projectImages = [];
}

function editProject(id) {
    openProjectModal(id);
}

// Team functions
function openTeamModal(id = null) {
    const modal = document.getElementById('teamModal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.getElementById('teamModalTitle').textContent = id ? 'Edit Team Member' : 'Add Team Member';

    // Scroll modal to top
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }

    // Clear any previous upload data
    if (window.uploadedImages) {
        delete window.uploadedImages['teamPhoto'];
    }

    if (id) {
        const member = CMS.data.team.find(m => m.id === parseInt(id));
        if (member) {
            document.getElementById('teamId').value = member.id || '';
            document.getElementById('teamName').value = member.name || '';
            document.getElementById('teamRole').value = member.role || '';
            document.getElementById('teamExperience').value = member.experience || '';
            document.getElementById('teamQualifications').value = member.qualifications || '';
            document.getElementById('teamBio').value = member.bio || '';
            document.getElementById('teamPhoto').value = member.photo || '';
            document.getElementById('teamCategory').value = member.category || 'technical';
            document.getElementById('teamEmail').value = member.email || '';
            document.getElementById('teamLinkedin').value = member.linkedin || '';

            // Show preview if photo exists
            if (member.photo) {
                const preview = document.getElementById('teamPhotoPreview');
                const previewImg = document.getElementById('teamPhotoPreviewImg');
                if (preview && previewImg) {
                    previewImg.src = member.photo; // Can be URL or base64
                    preview.style.display = 'block';
                }
            }
        }
    } else {
        document.getElementById('teamId').value = '';
        document.getElementById('teamName').value = '';
        document.getElementById('teamRole').value = '';
        document.getElementById('teamExperience').value = '';
        document.getElementById('teamQualifications').value = '';
        document.getElementById('teamBio').value = '';
        document.getElementById('teamPhoto').value = '';
        document.getElementById('teamCategory').value = 'technical';
        document.getElementById('teamEmail').value = '';
        document.getElementById('teamLinkedin').value = '';
    }

    // Clear file input
    const fileInput = document.getElementById('teamPhotoUpload');
    if (fileInput) fileInput.value = '';

    // Hide preview if no photo
    if (!document.getElementById('teamPhoto').value) {
        const preview = document.getElementById('teamPhotoPreview');
        if (preview) preview.style.display = 'none';
    }
}

function closeTeamModal() {
    const modal = document.getElementById('teamModal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function saveTeamMember() {
    const id = document.getElementById('teamId').value;
    const name = document.getElementById('teamName').value.trim();

    // Validation
    if (!name) {
        showNotification('Please enter a name', 'error');
        return;
    }

    let photoValue = document.getElementById('teamPhoto').value.trim() || '';

    // If there's uploaded image data, use the base64 data directly
    if (window.uploadedImages && window.uploadedImages['teamPhoto'] && window.uploadedImages['teamPhoto'].data) {
        // Store base64 directly in photo field for immediate display
        photoValue = window.uploadedImages['teamPhoto'].data;
        console.log('Using uploaded image data for team member:', name);

        // Clear the upload data after saving
        delete window.uploadedImages['teamPhoto'];
    }

    const member = {
        id: id ? parseInt(id) : CMS.getNextId('team'),
        name: name,
        role: document.getElementById('teamRole').value.trim(),
        experience: parseInt(document.getElementById('teamExperience').value) || 0,
        qualifications: document.getElementById('teamQualifications').value.trim(),
        bio: document.getElementById('teamBio').value.trim(),
        photo: photoValue, // This will be either URL or base64 data
        category: document.getElementById('teamCategory').value || 'technical',
        email: document.getElementById('teamEmail').value.trim(),
        linkedin: document.getElementById('teamLinkedin').value.trim()
    };

    const isNew = !id;

    if (id) {
        const index = CMS.data.team.findIndex(m => m.id === parseInt(id));
        if (index >= 0) {
            CMS.data.team[index] = member;
        }
    } else {
        CMS.data.team.push(member);
    }

    // Save to localStorage
    CMS.saveData();

    // Sync to API/database
    if (typeof CMSSync !== 'undefined' && CMSSync.apiAvailable) {
        CMSSync.saveTeamMember(member, isNew).then(result => {
            if (result.success) {
                console.log('[CMS] Team member synced to database');
                showNotification('Team member saved successfully', 'success');
            } else {
                console.warn('[CMS] Failed to sync team member to database:', result.error);
                showNotification('Team member saved locally, but failed to sync to database: ' + (result.error || 'Unknown error'), 'warning');
            }
        }).catch(err => {
            console.error('[CMS] Error syncing team member:', err);
            showNotification('Team member saved locally, but failed to sync to database: ' + (err.message || 'Unknown error'), 'warning');
        });
    } else {
        showNotification('Team member saved successfully (local only)', 'success');
    }

    CMS.renderTeam();
    CMS.updateStats();
    closeTeamModal();
}

function editTeamMember(id) {
    openTeamModal(id);
}

// Board functions
function openBoardModal(id = null) {
    const modal = document.getElementById('boardModal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.getElementById('boardModalTitle').textContent = id ? 'Edit Board Member' : 'Add Board Member';

    // Scroll modal to top
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }

    // Clear any previous upload data
    if (window.uploadedImages) {
        delete window.uploadedImages['boardPhoto'];
    }

    if (id) {
        const member = CMS.data.board.find(m => m.id === parseInt(id));
        if (member) {
            document.getElementById('boardId').value = member.id;
            document.getElementById('boardName').value = member.name || '';
            document.getElementById('boardRole').value = member.role || '';
            document.getElementById('boardExperience').value = member.experience || '';
            document.getElementById('boardQualifications').value = member.qualifications || '';
            document.getElementById('boardBio').value = member.bio || '';
            document.getElementById('boardPhoto').value = member.photo || '';
            document.getElementById('boardIsChairman').checked = member.isChairman || false;

            // Show preview if photo exists
            if (member.photo) {
                const preview = document.getElementById('boardPhotoPreview');
                const previewImg = document.getElementById('boardPhotoPreviewImg');
                if (preview && previewImg) {
                    previewImg.src = member.photo; // Can be URL or base64
                    preview.style.display = 'block';
                }
            }
        }
    } else {
        document.getElementById('boardId').value = '';
        document.getElementById('boardName').value = '';
        document.getElementById('boardRole').value = '';
        document.getElementById('boardExperience').value = '';
        document.getElementById('boardQualifications').value = '';
        document.getElementById('boardBio').value = '';
        document.getElementById('boardPhoto').value = '';
        document.getElementById('boardIsChairman').checked = false;
    }

    // Clear file input
    const fileInput = document.getElementById('boardPhotoUpload');
    if (fileInput) fileInput.value = '';

    // Hide preview if no photo
    if (!document.getElementById('boardPhoto').value) {
        const preview = document.getElementById('boardPhotoPreview');
        if (preview) preview.style.display = 'none';
    }
}

function closeBoardModal() {
    const modal = document.getElementById('boardModal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function saveBoardMember() {
    const id = document.getElementById('boardId').value;
    const name = document.getElementById('boardName').value.trim();

    // Validation
    if (!name) {
        showNotification('Please enter a name', 'error');
        return;
    }

    let photoValue = document.getElementById('boardPhoto').value.trim() || '';

    // If there's uploaded image data, use the base64 data directly
    if (window.uploadedImages && window.uploadedImages['boardPhoto'] && window.uploadedImages['boardPhoto'].data) {
        // Store base64 directly in photo field for immediate display
        photoValue = window.uploadedImages['boardPhoto'].data;
        console.log('Using uploaded image data for board member:', name);

        // Clear the upload data after saving
        delete window.uploadedImages['boardPhoto'];
    }

    const member = {
        id: id ? parseInt(id) : CMS.getNextId('board'),
        name: name,
        role: document.getElementById('boardRole').value.trim(),
        experience: parseInt(document.getElementById('boardExperience').value) || 0,
        qualifications: document.getElementById('boardQualifications').value.trim(),
        bio: document.getElementById('boardBio').value.trim(),
        photo: photoValue, // This will be either URL or base64 data
        isChairman: document.getElementById('boardIsChairman').checked || false
    };

    if (!CMS.data.board) {
        CMS.data.board = [];
    }

    const isNew = !id;
    const index = CMS.data.board.findIndex(m => m.id === member.id);
    if (index >= 0) {
        CMS.data.board[index] = member;
    } else {
        CMS.data.board.push(member);
    }

    // Save to localStorage
    CMS.saveData();

    // Sync to API/database
    if (typeof CMSSync !== 'undefined' && CMSSync.apiAvailable) {
        CMSSync.saveBoardMember(member, isNew).then(result => {
            if (result.success) {
                console.log('[CMS] Board member synced to database');
                showNotification('Board member saved successfully', 'success');
            } else {
                console.warn('[CMS] Failed to sync board member to database:', result.error);
                showNotification('Board member saved locally, but failed to sync to database: ' + (result.error || 'Unknown error'), 'warning');
            }
        }).catch(err => {
            console.error('[CMS] Error syncing board member:', err);
            showNotification('Board member saved locally, but failed to sync to database: ' + (err.message || 'Unknown error'), 'warning');
        });
    } else {
        showNotification('Board member saved successfully (local only)', 'success');
    }

    CMS.renderBoard();
    closeBoardModal();
}

function editBoardMember(id) {
    openBoardModal(id);
}

// Client functions
function openClientModal(id = null) {
    const modal = document.getElementById('clientModal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.getElementById('clientModalTitle').textContent = id ? 'Edit Client' : 'Add Client';

    // Scroll modal to top
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }

    // Clear any previous upload data
    if (window.uploadedImages) {
        delete window.uploadedImages['clientLogo'];
    }

    if (id) {
        const client = CMS.data.clients.find(c => c.id === id);
        if (client) {
            document.getElementById('clientId').value = client.id;
            document.getElementById('clientName').value = client.name;
            document.getElementById('clientCategory').value = client.category;
            document.getElementById('clientLogo').value = client.logo || '';
            document.getElementById('clientWebsite').value = client.website || '';

            // Show preview if logo exists
            const previewContainer = document.getElementById('clientLogoPreview');
            const previewImg = document.getElementById('clientLogoPreviewImg');
            if (previewContainer && previewImg && client.logo) {
                let logoSrc = client.logo;
                // Check if we have base64 data stored
                if (CMS.data._imageData && CMS.data._imageData[client.logo]) {
                    logoSrc = CMS.data._imageData[client.logo];
                }
                previewImg.src = logoSrc;
                previewContainer.style.display = 'block';
            }
        }
    } else {
        document.getElementById('clientId').value = '';
        document.getElementById('clientName').value = '';
        document.getElementById('clientCategory').value = 'Government';
        document.getElementById('clientLogo').value = '';
        document.getElementById('clientWebsite').value = '';

        // Hide preview
        const previewContainer = document.getElementById('clientLogoPreview');
        if (previewContainer) {
            previewContainer.style.display = 'none';
        }
    }
}

function closeClientModal() {
    const modal = document.getElementById('clientModal');
    modal.classList.remove('active');
    modal.classList.add('hidden');

    // Clear preview
    const previewContainer = document.getElementById('clientLogoPreview');
    if (previewContainer) {
        previewContainer.style.display = 'none';
    }

    // Clear uploaded images
    if (window.uploadedImages) {
        delete window.uploadedImages['clientLogo'];
    }
}

function saveClient() {
    const id = document.getElementById('clientId').value;
    let logoValue = document.getElementById('clientLogo').value.trim();

    // If there's uploaded image data, update the path with the actual ID and store base64
    if (window.uploadedImages && window.uploadedImages['clientLogo']) {
        const uploadedData = window.uploadedImages['clientLogo'];
        const actualId = id ? parseInt(id) : CMS.getNextId('clients');
        const name = document.getElementById('clientName').value || 'client';
        const itemName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
        const fileExtension = uploadedData.path.split('.').pop();
        logoValue = `/uploads/clients/${itemName}-${actualId}.${fileExtension}`;

        // Update the stored path
        uploadedData.path = logoValue;
        uploadedData.filename = logoValue.split('/').pop();

        // Store base64 data in CMS data for frontend use
        if (!CMS.data._imageData) {
            CMS.data._imageData = {};
        }
        CMS.data._imageData[logoValue] = uploadedData.data;
    }

    const client = {
        id: id ? parseInt(id) : CMS.getNextId('clients'),
        name: document.getElementById('clientName').value,
        category: document.getElementById('clientCategory').value,
        logo: logoValue,
        website: document.getElementById('clientWebsite').value
    };

    const isNew = !id;

    if (id) {
        const index = CMS.data.clients.findIndex(c => c.id === parseInt(id));
        CMS.data.clients[index] = client;
    } else {
        CMS.data.clients.push(client);
    }

    // Save to localStorage
    CMS.saveData();

    // Sync to API/database
    if (typeof CMSSync !== 'undefined' && CMSSync.apiAvailable) {
        CMSSync.saveClient(client, isNew).then(result => {
            if (result.success) {
                console.log('[CMS] Client synced to database');
                showNotification('Client saved successfully', 'success');
            } else {
                console.warn('[CMS] Failed to sync client to database:', result.error);
                showNotification('Client saved locally, but failed to sync to database: ' + (result.error || 'Unknown error'), 'warning');
            }
        }).catch(err => {
            console.error('[CMS] Error syncing client:', err);
            showNotification('Client saved locally, but failed to sync to database: ' + (err.message || 'Unknown error'), 'warning');
        });
    } else {
        showNotification('Client saved successfully (local only)', 'success');
    }

    CMS.renderClients();
    closeClientModal();
}

function editClient(id) {
    openClientModal(id);
}

// Testimonial functions
function openTestimonialModal(id = null) {
    const modal = document.getElementById('testimonialModal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.getElementById('testimonialModalTitle').textContent = id ? 'Edit Testimonial' : 'Add Testimonial';

    // Scroll modal to top
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }

    if (id) {
        const t = CMS.data.testimonials.find(t => t.id === id);
        if (t) {
            document.getElementById('testimonialId').value = t.id || '';
            document.getElementById('testimonialName').value = t.name || '';
            document.getElementById('testimonialPosition').value = t.position || '';
            document.getElementById('testimonialCompany').value = t.company || '';
            document.getElementById('testimonialText').value = t.text || '';
            document.getElementById('testimonialPhoto').value = t.photo || '';
            document.getElementById('testimonialRating').value = t.rating || '5';
        }
    } else {
        document.getElementById('testimonialId').value = '';
        document.getElementById('testimonialName').value = '';
        document.getElementById('testimonialPosition').value = '';
        document.getElementById('testimonialCompany').value = '';
        document.getElementById('testimonialText').value = '';
        document.getElementById('testimonialPhoto').value = '';
        document.getElementById('testimonialRating').value = '5';
    }
}

function closeTestimonialModal() {
    const modal = document.getElementById('testimonialModal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function saveTestimonial() {
    const id = document.getElementById('testimonialId').value;
    let photoValue = document.getElementById('testimonialPhoto').value.trim();

    // If there's uploaded image data, update the path with the actual ID and store base64
    if (window.uploadedImages && window.uploadedImages['testimonialPhoto']) {
        const uploadedData = window.uploadedImages['testimonialPhoto'];
        const actualId = id ? parseInt(id) : CMS.getNextId('testimonials');
        const name = document.getElementById('testimonialName').value || 'testimonial';
        const itemName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
        const fileExtension = uploadedData.path.split('.').pop();
        photoValue = `/uploads/testimonials/${itemName}-${actualId}.${fileExtension}`;

        // Update the stored path
        uploadedData.path = photoValue;
        uploadedData.filename = photoValue.split('/').pop();

        // Store base64 data in CMS data for frontend use
        if (!CMS.data._imageData) {
            CMS.data._imageData = {};
        }
        CMS.data._imageData[photoValue] = uploadedData.data;
    }

    const testimonial = {
        id: id ? parseInt(id) : CMS.getNextId('testimonials'),
        name: document.getElementById('testimonialName').value,
        position: document.getElementById('testimonialPosition').value,
        company: document.getElementById('testimonialCompany').value,
        text: document.getElementById('testimonialText').value,
        photo: photoValue,
        rating: parseInt(document.getElementById('testimonialRating').value)
    };

    const isNew = !id;

    if (id) {
        const index = CMS.data.testimonials.findIndex(t => t.id === parseInt(id));
        CMS.data.testimonials[index] = testimonial;
    } else {
        CMS.data.testimonials.push(testimonial);
    }

    // Save to localStorage
    CMS.saveData();

    // Sync to API/database
    if (typeof CMSSync !== 'undefined' && CMSSync.apiAvailable) {
        CMSSync.saveTestimonial(testimonial, isNew).then(result => {
            if (result.success) {
                console.log('[CMS] Testimonial synced to database');
                showNotification('Testimonial saved successfully', 'success');
            } else {
                console.warn('[CMS] Failed to sync testimonial to database:', result.error);
                showNotification('Testimonial saved locally, but failed to sync to database: ' + (result.error || 'Unknown error'), 'warning');
            }
        }).catch(err => {
            console.error('[CMS] Error syncing testimonial:', err);
            showNotification('Testimonial saved locally, but failed to sync to database: ' + (err.message || 'Unknown error'), 'warning');
        });
    } else {
        showNotification('Testimonial saved successfully (local only)', 'success');
    }

    CMS.renderTestimonials();
    CMS.updateStats();
    closeTestimonialModal();
}

function editTestimonial(id) {
    openTestimonialModal(id);
}

// Service functions
function openServiceModal(id = null) {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.getElementById('serviceModalTitle').textContent = id ? 'Edit Service' : 'Add Service';

    // Scroll modal to top
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }

    if (id) {
        const service = CMS.data.services.find(s => s.id === id);
        if (service) {
            document.getElementById('serviceId').value = service.id;
            document.getElementById('serviceTitle').value = service.title;
            document.getElementById('serviceIcon').value = service.icon;
            document.getElementById('serviceCategory').value = service.category;
            document.getElementById('serviceSummary').value = service.summary;
            document.getElementById('serviceFeatures').value = service.features?.join('\n') || '';
        }
    } else {
        document.getElementById('serviceId').value = '';
        document.getElementById('serviceTitle').value = '';
        document.getElementById('serviceIcon').value = '';
        document.getElementById('serviceCategory').value = 'pre-contract';
        document.getElementById('serviceSummary').value = '';
        document.getElementById('serviceFeatures').value = '';
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function saveService() {
    const id = document.getElementById('serviceId').value;
    const service = {
        id: id ? parseInt(id) : CMS.getNextId('services'),
        title: document.getElementById('serviceTitle').value,
        icon: document.getElementById('serviceIcon').value,
        category: document.getElementById('serviceCategory').value,
        summary: document.getElementById('serviceSummary').value,
        features: document.getElementById('serviceFeatures').value.split('\n').map(f => f.trim()).filter(f => f)
    };

    if (id) {
        const index = CMS.data.services.findIndex(s => s.id === parseInt(id));
        CMS.data.services[index] = service;
    } else {
        CMS.data.services.push(service);
    }

    CMS.saveData();
    CMS.renderServices();
    closeServiceModal();
}

function editService(id) {
    openServiceModal(id);
}

// Blog functions
function openBlogModal(id = null) {
    const modal = document.getElementById('blogModal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.getElementById('blogModalTitle').textContent = id ? 'Edit Blog Post' : 'Add Blog Post';

    // Scroll modal to top
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }

    if (id) {
        const post = CMS.data.blog.find(p => p.id === id);
        if (post) {
            document.getElementById('blogId').value = post.id;
            document.getElementById('blogTitle').value = post.title;
            document.getElementById('blogSlug').value = post.slug;
            document.getElementById('blogCategory').value = post.category;
            document.getElementById('blogExcerpt').value = post.excerpt;
            document.getElementById('blogContent').value = post.content;
            document.getElementById('blogImage').value = post.image;
            document.getElementById('blogAuthor').value = post.author;
            document.getElementById('blogAuthorRole').value = post.authorRole || '';
            document.getElementById('blogAuthorPhoto').value = post.authorPhoto || '';
            document.getElementById('blogAuthorBio').value = post.authorBio || '';
            document.getElementById('blogDate').value = post.date;
            document.getElementById('blogTags').value = post.tags?.join(', ') || '';
            document.getElementById('blogFeatured').checked = post.featured;
            document.getElementById('blogPublished').checked = post.published;
        }
    } else {
        document.getElementById('blogId').value = '';
        document.getElementById('blogTitle').value = '';
        document.getElementById('blogSlug').value = '';
        document.getElementById('blogCategory').value = 'industry-insights';
        document.getElementById('blogExcerpt').value = '';
        document.getElementById('blogContent').value = '';
        document.getElementById('blogImage').value = '';
        document.getElementById('blogAuthor').value = '';
        document.getElementById('blogAuthorRole').value = '';
        document.getElementById('blogAuthorPhoto').value = '';
        document.getElementById('blogAuthorBio').value = '';
        document.getElementById('blogDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('blogTags').value = '';
        document.getElementById('blogFeatured').checked = false;
        document.getElementById('blogPublished').checked = true;
    }
}

function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

function saveBlogPost() {
    const id = document.getElementById('blogId').value;
    const title = document.getElementById('blogTitle').value;
    let slug = document.getElementById('blogSlug').value;

    // Auto-generate slug if empty
    if (!slug) {
        slug = generateSlug(title);
    }

    let imageValue = document.getElementById('blogImage').value.trim();
    let authorPhotoValue = document.getElementById('blogAuthorPhoto').value.trim();

    // If there's uploaded image data, update the paths with the actual ID and store base64
    if (window.uploadedImages && window.uploadedImages['blogImage']) {
        const uploadedData = window.uploadedImages['blogImage'];
        const actualId = id ? parseInt(id) : CMS.getNextId('blog');
        const itemName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
        const fileExtension = uploadedData.path.split('.').pop();
        imageValue = `/uploads/blog/${itemName}-${actualId}.${fileExtension}`;

        // Update the stored path
        uploadedData.path = imageValue;
        uploadedData.filename = imageValue.split('/').pop();

        // Store base64 data in CMS data for frontend use
        if (!CMS.data._imageData) {
            CMS.data._imageData = {};
        }
        CMS.data._imageData[imageValue] = uploadedData.data;
    }

    if (window.uploadedImages && window.uploadedImages['blogAuthorPhoto']) {
        const uploadedData = window.uploadedImages['blogAuthorPhoto'];
        const actualId = id ? parseInt(id) : CMS.getNextId('blog');
        const author = document.getElementById('blogAuthor').value || 'author';
        const itemName = author.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
        const fileExtension = uploadedData.path.split('.').pop();
        authorPhotoValue = `/uploads/blog/${itemName}-${actualId}-author.${fileExtension}`;

        // Update the stored path
        uploadedData.path = authorPhotoValue;
        uploadedData.filename = authorPhotoValue.split('/').pop();

        // Store base64 data in CMS data for frontend use
        if (!CMS.data._imageData) {
            CMS.data._imageData = {};
        }
        CMS.data._imageData[authorPhotoValue] = uploadedData.data;
    }

    const post = {
        id: id ? parseInt(id) : CMS.getNextId('blog'),
        title: title,
        slug: slug,
        category: document.getElementById('blogCategory').value,
        excerpt: document.getElementById('blogExcerpt').value,
        content: document.getElementById('blogContent').value,
        image: imageValue,
        author: document.getElementById('blogAuthor').value,
        authorRole: document.getElementById('blogAuthorRole').value,
        authorPhoto: authorPhotoValue,
        authorBio: document.getElementById('blogAuthorBio').value,
        date: document.getElementById('blogDate').value,
        tags: document.getElementById('blogTags').value.split(',').map(t => t.trim()).filter(t => t),
        featured: document.getElementById('blogFeatured').checked,
        published: document.getElementById('blogPublished').checked
    };

    // Initialize blog array if it doesn't exist
    if (!CMS.data.blog) {
        CMS.data.blog = [];
    }

    const isNew = !id;

    if (id) {
        const index = CMS.data.blog.findIndex(p => p.id === parseInt(id));
        CMS.data.blog[index] = post;
    } else {
        CMS.data.blog.push(post);
    }

    // Save to localStorage
    CMS.saveData();

    // Sync to API/database
    if (typeof CMSSync !== 'undefined' && CMSSync.apiAvailable) {
        CMSSync.saveBlogPost(post, isNew).then(result => {
            if (result.success) {
                console.log('[CMS] Blog post synced to database');
                showNotification('Blog post saved successfully', 'success');
            } else {
                console.warn('[CMS] Failed to sync blog post to database:', result.error);
                showNotification('Blog post saved locally, but failed to sync to database: ' + (result.error || 'Unknown error'), 'warning');
            }
        }).catch(err => {
            console.error('[CMS] Error syncing blog post:', err);
            showNotification('Blog post saved locally, but failed to sync to database: ' + (err.message || 'Unknown error'), 'warning');
        });
    } else {
        showNotification('Blog post saved successfully (local only)', 'success');
    }

    CMS.renderBlog();
    CMS.updateStats();
    closeBlogModal();
}

function editBlogPost(id) {
    openBlogModal(id);
}

// Certification functions
function openCertificationModal(id = null) {
    const modal = document.getElementById('certificationModal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.getElementById('certificationModalTitle').textContent = id ? 'Edit Certification' : 'Add Certification';

    // Scroll modal to top
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        modalBody.scrollTop = 0;
    }

    // Clear any previous upload data
    if (window.uploadedImages) {
        delete window.uploadedImages['certificationImage'];
    }

    if (id) {
        const cert = CMS.data.certifications.find(c => c.id === parseInt(id));
        if (cert) {
            document.getElementById('certificationId').value = cert.id;
            document.getElementById('certificationTitle').value = cert.title || '';
            document.getElementById('certificationIssuer').value = cert.issuer || '';
            document.getElementById('certificationDescription').value = cert.description || '';
            document.getElementById('certificationCategory').value = cert.category || 'professional';
            document.getElementById('certificationValidUntil').value = cert.validUntil || '';
            document.getElementById('certificationImage').value = cert.image || '';

            // Show preview if image exists
            if (cert.image) {
                const preview = document.getElementById('certificationImagePreview');
                const previewImg = document.getElementById('certificationImagePreviewImg');
                if (preview && previewImg) {
                    previewImg.src = cert.image;
                    preview.style.display = 'block';
                }
            }
        }
    } else {
        document.getElementById('certificationId').value = '';
        document.getElementById('certificationTitle').value = '';
        document.getElementById('certificationIssuer').value = '';
        document.getElementById('certificationDescription').value = '';
        document.getElementById('certificationCategory').value = 'professional';
        document.getElementById('certificationValidUntil').value = '';
        document.getElementById('certificationImage').value = '';
    }

    // Clear file input
    const fileInput = document.getElementById('certificationImageUpload');
    if (fileInput) fileInput.value = '';

    // Hide preview if no image
    if (!document.getElementById('certificationImage').value) {
        const preview = document.getElementById('certificationImagePreview');
        if (preview) preview.style.display = 'none';
    }
}

function closeCertificationModal() {
    const modal = document.getElementById('certificationModal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
}

function saveCertification() {
    const id = document.getElementById('certificationId').value;
    const title = document.getElementById('certificationTitle').value.trim();

    // Validation
    if (!title) {
        showNotification('Please enter a title', 'error');
        return;
    }

    let imageValue = document.getElementById('certificationImage').value.trim() || '';

    // If there's uploaded image data, use the base64 data directly
    if (window.uploadedImages && window.uploadedImages['certificationImage'] && window.uploadedImages['certificationImage'].data) {
        imageValue = window.uploadedImages['certificationImage'].data;
        console.log('Using uploaded image data for certification:', title);
        delete window.uploadedImages['certificationImage'];
    }

    const certification = {
        id: id ? parseInt(id) : CMS.getNextId('certifications'),
        title: title,
        issuer: document.getElementById('certificationIssuer').value.trim(),
        description: document.getElementById('certificationDescription').value.trim(),
        category: document.getElementById('certificationCategory').value || 'professional',
        validUntil: document.getElementById('certificationValidUntil').value || '',
        image: imageValue
    };

    if (!CMS.data.certifications) {
        CMS.data.certifications = [];
    }

    const isNew = !id;

    if (id) {
        const index = CMS.data.certifications.findIndex(c => c.id === parseInt(id));
        if (index >= 0) {
            CMS.data.certifications[index] = certification;
        }
    } else {
        CMS.data.certifications.push(certification);
    }

    // Save to localStorage
    CMS.saveData();

    // Sync to API/database
    if (typeof CMSSync !== 'undefined' && CMSSync.apiAvailable) {
        CMSSync.saveCertification(certification, isNew).then(result => {
            if (result.success) {
                console.log('[CMS] Certification synced to database');
                showNotification('Certification saved successfully', 'success');
            } else {
                console.warn('[CMS] Failed to sync certification to database:', result.error);
                showNotification('Certification saved locally, but failed to sync to database: ' + (result.error || 'Unknown error'), 'warning');
            }
        }).catch(err => {
            console.error('[CMS] Error syncing certification:', err);
            showNotification('Certification saved locally, but failed to sync to database: ' + (err.message || 'Unknown error'), 'warning');
        });
    } else {
        showNotification('Certification saved successfully (local only)', 'success');
    }

    CMS.renderCertifications();
    CMS.updateStats();
    closeCertificationModal();
}

function editCertification(id) {
    openCertificationModal(id);
}

// Delete functions
let deleteTarget = { collection: null, id: null };

function deleteItem(collection, id) {
    deleteTarget = { collection, id };
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('active');
    modal.classList.add('hidden');
    deleteTarget = { collection: null, id: null };
}

function confirmDelete() {
    if (deleteTarget.collection && deleteTarget.id) {
        // Remove from local data
        CMS.data[deleteTarget.collection] = CMS.data[deleteTarget.collection].filter(item => item.id !== deleteTarget.id);
        CMS.saveData();
        CMS.renderAll();
        CMS.updateStats();

        // Sync deletion to database
        if (typeof CMSSync !== 'undefined' && CMSSync.apiAvailable) {
            CMSSync.deleteItem(deleteTarget.collection, deleteTarget.id).then(result => {
                if (result.success) {
                    console.log(`[CMS] ${deleteTarget.collection} item ${deleteTarget.id} deleted from database`);
                    showNotification('Item deleted from database', 'success');
                } else {
                    console.warn(`[CMS] Failed to delete from database:`, result.error);
                    showNotification('Item deleted locally, but failed to sync to database: ' + result.error, 'warning');
                }
            }).catch(err => {
                console.error(`[CMS] Error deleting from database:`, err);
                showNotification('Item deleted locally, but failed to sync to database', 'warning');
            });
        } else {
            showNotification('Item deleted (local only - API unavailable)', 'info');
        }
    }
    closeDeleteModal();
}

// Export all data
function exportAllData() {
    const dataStr = JSON.stringify(CMS.data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kj-associates-cms-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Data exported successfully!', 'success');
}

// Theme functions
let selectedTheme = 'classic-green';

function selectTheme(themeName) {
    // Validate theme name before selecting
    const validThemes = ['classic-green', 'professional-dark', 'earth-warm'];
    if (!validThemes.includes(themeName)) {
        console.warn('Invalid theme name:', themeName);
        themeName = 'classic-green';
    }
    selectedTheme = themeName;
    updateThemeSelection(themeName);
}

function updateThemeSelection(themeName) {
    selectedTheme = themeName;

    // Update theme cards UI
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.theme === themeName) {
            card.classList.add('selected');
        }
    });

    // Update badge
    const badge = document.getElementById('currentThemeBadge');
    if (badge) {
        const themeNames = {
            'classic-green': 'Classic Green',
            'professional-dark': 'Professional Dark',
            'earth-warm': 'Earth Warm'
        };
        badge.textContent = themeNames[themeName] || 'Classic Green';
    }
}

function saveTheme() {
    // Validate theme name
    const validThemes = ['classic-green', 'professional-dark', 'earth-warm'];
    if (!validThemes.includes(selectedTheme)) {
        showNotification('Invalid theme selected. Using default theme.', 'error');
        selectedTheme = 'classic-green';
    }

    CMS.data.theme = selectedTheme;
    CMS.saveData();
    showNotification(`Theme changed to ${selectedTheme.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}!`, 'success');
}

function previewTheme() {
    // Validate theme name
    const validThemes = ['classic-green', 'professional-dark', 'earth-warm'];
    const themeToPreview = validThemes.includes(selectedTheme) ? selectedTheme : 'classic-green';

    // Store preview theme in sessionStorage for the preview page to use
    sessionStorage.setItem('kj_theme_preview', themeToPreview);

    // Open preview in new tab
    const previewUrl = '../index.html';
    window.open(previewUrl, '_blank');

    showNotification('Preview opened in new tab. Click "Save Theme" to make the change permanent.', 'info');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Wait for CMS to fully initialize (including API sync)
        await CMS.init();

        // Show dashboard by default (after data is loaded)
        document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
        const dashboard = document.getElementById('section-dashboard');
        if (dashboard) {
            dashboard.style.display = 'block';
        }
    } catch (error) {
        console.error('Failed to initialize CMS:', error);
        alert('CMS failed to load. Please refresh the page. Error: ' + error.message);
    }
});


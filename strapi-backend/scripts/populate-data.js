#!/usr/bin/env node

/**
 * Script to populate Strapi APIs with sample data
 * Run this after Strapi is started and admin user is created
 */

const axios = require("axios");

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN || "";

// Sample data to populate
const sampleData = {
  services: [
    {
      title: "Corporate Law",
      description:
        "Comprehensive corporate legal services including business formation, mergers, acquisitions, and corporate governance.",
      icon: "building",
      features: [
        "Business Formation",
        "Mergers & Acquisitions",
        "Corporate Governance",
        "Compliance",
      ],
    },
    {
      title: "Intellectual Property",
      description:
        "Protect your innovations with our expert IP services including patents, trademarks, copyrights, and trade secrets.",
      icon: "lightbulb",
      features: [
        "Patent Registration",
        "Trademark Protection",
        "Copyright Services",
        "Trade Secret Management",
      ],
    },
    {
      title: "Employment Law",
      description:
        "Navigate complex employment issues with our comprehensive employment law services.",
      icon: "users",
      features: [
        "Employment Contracts",
        "Workplace Policies",
        "Dispute Resolution",
        "Compliance Training",
      ],
    },
    {
      title: "Real Estate Law",
      description:
        "Complete real estate legal services for commercial and residential transactions.",
      icon: "home",
      features: [
        "Property Transactions",
        "Leasing Agreements",
        "Due Diligence",
        "Title Insurance",
      ],
    },
  ],

  teamMembers: [
    {
      name: "Sarah Johnson",
      position: "Senior Partner",
      bio: "With over 15 years of experience in corporate law, Sarah leads our corporate practice with expertise in mergers, acquisitions, and securities law.",
      email: "sarah.johnson@iotech-legal.com",
      phone: "+1 (555) 123-4567",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      specialties: ["Corporate Law", "M&A", "Securities Law"],
    },
    {
      name: "Michael Chen",
      position: "IP Attorney",
      bio: "Michael specializes in intellectual property law with a focus on technology and software patents. He has helped numerous startups protect their innovations.",
      email: "michael.chen@iotech-legal.com",
      phone: "+1 (555) 123-4568",
      linkedin: "https://linkedin.com/in/michaelchen",
      specialties: ["Intellectual Property", "Technology Law", "Patents"],
    },
    {
      name: "Emily Rodriguez",
      position: "Employment Law Specialist",
      bio: "Emily brings extensive experience in employment law, helping businesses navigate complex workplace regulations and employee relations.",
      email: "emily.rodriguez@iotech-legal.com",
      phone: "+1 (555) 123-4569",
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      specialties: ["Employment Law", "HR Compliance", "Workplace Policies"],
    },
    {
      name: "David Thompson",
      position: "Real Estate Attorney",
      bio: "David handles complex commercial and residential real estate transactions with attention to detail and client-focused service.",
      email: "david.thompson@iotech-legal.com",
      phone: "+1 (555) 123-4570",
      linkedin: "https://linkedin.com/in/davidthompson",
      specialties: [
        "Real Estate Law",
        "Commercial Transactions",
        "Property Development",
      ],
    },
  ],

  testimonials: [
    {
      content:
        "IO Tech Legal provided exceptional service during our company acquisition. Their expertise and attention to detail made the complex process smooth and successful.",
      clientName: "John Smith",
      clientPosition: "CEO",
      company: "TechStart Inc.",
      rating: 5,
      featured: true,
    },
    {
      content:
        "The IP protection services were outstanding. They helped us secure our patents quickly and efficiently, allowing us to focus on growing our business.",
      clientName: "Lisa Wang",
      clientPosition: "Founder",
      company: "Innovation Labs",
      rating: 5,
      featured: true,
    },
    {
      content:
        "Professional, responsive, and knowledgeable. IO Tech Legal has been our trusted legal partner for employment law matters for over three years.",
      clientName: "Robert Davis",
      clientPosition: "HR Director",
      company: "Global Solutions Corp",
      rating: 5,
      featured: false,
    },
  ],

  legalServices: [
    {
      title: "Business Formation & Corporate Structure",
      description:
        "We help entrepreneurs and established businesses choose the right corporate structure and handle all formation requirements.",
      isActive: true,
    },
    {
      title: "Contract Drafting & Review",
      description:
        "Our team provides comprehensive contract services, from drafting to review and negotiation of various business agreements.",
      isActive: true,
    },
    {
      title: "Compliance & Regulatory Affairs",
      description:
        "Stay compliant with evolving regulations through our proactive compliance monitoring and advisory services.",
      isActive: true,
    },
    {
      title: "Dispute Resolution & Litigation",
      description:
        "When disputes arise, our experienced litigation team provides strategic representation to protect your interests.",
      isActive: true,
    },
  ],

  navigationLinks: [
    { label: "Home", href: "/", order: 1, isActive: true },
    { label: "About", href: "/about", order: 2, isActive: true },
    { label: "Services", href: "/services", order: 3, isActive: true },
    { label: "Blog", href: "/blog", order: 4, isActive: true },
    { label: "Contact", href: "/contact", order: 5, isActive: true },
  ],
};

// Function to create content via Strapi API
async function createContent(endpoint, data) {
  try {
    console.log(`Creating ${endpoint}...`);

    const response = await axios.post(
      `${STRAPI_URL}/api/${endpoint}`,
      {
        data: data,
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      `✅ Created ${endpoint}:`,
      response.data.data.attributes.title ||
        response.data.data.attributes.name ||
        response.data.data.attributes.label
    );
    return response.data;
  } catch (error) {
    console.error(
      `❌ Error creating ${endpoint}:`,
      error.response?.data || error.message
    );
    return null;
  }
}

// Function to check if content already exists
async function checkExistingContent(endpoint) {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data.data.length > 0;
  } catch (error) {
    console.error(
      `❌ Error checking ${endpoint}:`,
      error.response?.data || error.message
    );
    return false;
  }
}

// Main function to populate all data
async function populateData() {
  console.log("🚀 Starting data population...");
  console.log(`Strapi URL: ${STRAPI_URL}`);

  if (!API_TOKEN) {
    console.error("❌ STRAPI_API_TOKEN environment variable is required");
    console.log(
      'Please set your API token: export STRAPI_API_TOKEN="your-token-here"'
    );
    process.exit(1);
  }

  try {
    // Check if data already exists
    console.log("\n🔍 Checking existing data...");
    const hasServices = await checkExistingContent("services");
    const hasTeamMembers = await checkExistingContent("team-members");
    const hasTestimonials = await checkExistingContent("testimonials");
    const hasLegalServices = await checkExistingContent("legal-services");
    const hasNavigationLinks = await checkExistingContent("navigation-links");

    if (
      hasServices &&
      hasTeamMembers &&
      hasTestimonials &&
      hasLegalServices &&
      hasNavigationLinks
    ) {
      console.log("✅ All data already exists. Skipping population.");
      return;
    }

    // Populate Services
    if (!hasServices) {
      console.log("\n📋 Populating Services...");
      for (const service of sampleData.services) {
        await createContent("services", service);
      }
    }

    // Populate Team Members
    if (!hasTeamMembers) {
      console.log("\n👥 Populating Team Members...");
      for (const member of sampleData.teamMembers) {
        await createContent("team-members", member);
      }
    }

    // Populate Testimonials
    if (!hasTestimonials) {
      console.log("\n💬 Populating Testimonials...");
      for (const testimonial of sampleData.testimonials) {
        await createContent("testimonials", testimonial);
      }
    }

    // Populate Legal Services
    if (!hasLegalServices) {
      console.log("\n⚖️ Populating Legal Services...");
      for (const legalService of sampleData.legalServices) {
        await createContent("legal-services", legalService);
      }
    }

    // Populate Navigation Links
    if (!hasNavigationLinks) {
      console.log("\n🧭 Populating Navigation Links...");
      for (const navLink of sampleData.navigationLinks) {
        await createContent("navigation-links", navLink);
      }
    }

    console.log("\n🎉 Data population completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`- Services: ${sampleData.services.length} items`);
    console.log(`- Team Members: ${sampleData.teamMembers.length} items`);
    console.log(`- Testimonials: ${sampleData.testimonials.length} items`);
    console.log(`- Legal Services: ${sampleData.legalServices.length} items`);
    console.log(
      `- Navigation Links: ${sampleData.navigationLinks.length} items`
    );
  } catch (error) {
    console.error("❌ Error during data population:", error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  populateData();
}

module.exports = { populateData, sampleData };

"use strict";

/**
 * An asynchronous bootstrap function that runs before your Strapi application starts.
 */

module.exports = async () => {
  console.log("Starting Strapi bootstrap...");

  // Check if we already have data to avoid duplicates
  const services = await strapi.entityService.findMany("api::service.service");
  if (services && services.length > 0) {
    console.log("Sample data already exists, skipping bootstrap");
    return;
  }

  try {
    // Create Services
    const servicesData = [
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
        publishedAt: new Date(),
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
        publishedAt: new Date(),
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
        publishedAt: new Date(),
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
        publishedAt: new Date(),
      },
    ];

    for (const service of servicesData) {
      await strapi.entityService.create("api::service.service", {
        data: service,
      });
    }

    // Create Team Members
    const teamData = [
      {
        name: "Sarah Johnson",
        position: "Senior Partner",
        bio: "With over 15 years of experience in corporate law, Sarah leads our corporate practice with expertise in mergers, acquisitions, and securities law.",
        image: null,
        email: "sarah.johnson@iotech-legal.com",
        phone: "+1 (555) 123-4567",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        specialties: ["Corporate Law", "M&A", "Securities Law"],
        publishedAt: new Date(),
      },
      {
        name: "Michael Chen",
        position: "IP Attorney",
        bio: "Michael specializes in intellectual property law with a focus on technology and software patents. He has helped numerous startups protect their innovations.",
        image: null,
        email: "michael.chen@iotech-legal.com",
        phone: "+1 (555) 123-4568",
        linkedin: "https://linkedin.com/in/michaelchen",
        specialties: ["Intellectual Property", "Technology Law", "Patents"],
        publishedAt: new Date(),
      },
      {
        name: "Emily Rodriguez",
        position: "Employment Law Specialist",
        bio: "Emily brings extensive experience in employment law, helping businesses navigate complex workplace regulations and employee relations.",
        image: null,
        email: "emily.rodriguez@iotech-legal.com",
        phone: "+1 (555) 123-4569",
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        specialties: ["Employment Law", "HR Compliance", "Workplace Policies"],
        publishedAt: new Date(),
      },
      {
        name: "David Thompson",
        position: "Real Estate Attorney",
        bio: "David handles complex commercial and residential real estate transactions with attention to detail and client-focused service.",
        image: null,
        email: "david.thompson@iotech-legal.com",
        phone: "+1 (555) 123-4570",
        linkedin: "https://linkedin.com/in/davidthompson",
        specialties: [
          "Real Estate Law",
          "Commercial Transactions",
          "Property Development",
        ],
        publishedAt: new Date(),
      },
    ];

    for (const member of teamData) {
      await strapi.entityService.create("api::team-member.team-member", {
        data: member,
      });
    }

    // Create Testimonials
    const testimonialsData = [
      {
        content:
          "IO Tech Legal provided exceptional service during our company acquisition. Their expertise and attention to detail made the complex process smooth and successful.",
        clientName: "John Smith",
        clientPosition: "CEO",
        company: "TechStart Inc.",
        rating: 5,
        featured: true,
        publishedAt: new Date(),
      },
      {
        content:
          "The IP protection services were outstanding. They helped us secure our patents quickly and efficiently, allowing us to focus on growing our business.",
        clientName: "Lisa Wang",
        clientPosition: "Founder",
        company: "Innovation Labs",
        rating: 5,
        featured: true,
        publishedAt: new Date(),
      },
      {
        content:
          "Professional, responsive, and knowledgeable. IO Tech Legal has been our trusted legal partner for employment law matters for over three years.",
        clientName: "Robert Davis",
        clientPosition: "HR Director",
        company: "Global Solutions Corp",
        rating: 5,
        featured: false,
        publishedAt: new Date(),
      },
    ];

    for (const testimonial of testimonialsData) {
      await strapi.entityService.create("api::testimonial.testimonial", {
        data: testimonial,
      });
    }

    // Create Legal Services for About Page
    const legalServicesData = [
      {
        title: "Business Formation & Corporate Structure",
        description:
          "We help entrepreneurs and established businesses choose the right corporate structure and handle all formation requirements.",
        isActive: true,
        publishedAt: new Date(),
      },
      {
        title: "Contract Drafting & Review",
        description:
          "Our team provides comprehensive contract services, from drafting to review and negotiation of various business agreements.",
        isActive: true,
        publishedAt: new Date(),
      },
      {
        title: "Compliance & Regulatory Affairs",
        description:
          "Stay compliant with evolving regulations through our proactive compliance monitoring and advisory services.",
        isActive: true,
        publishedAt: new Date(),
      },
      {
        title: "Dispute Resolution & Litigation",
        description:
          "When disputes arise, our experienced litigation team provides strategic representation to protect your interests.",
        isActive: true,
        publishedAt: new Date(),
      },
    ];

    for (const legalService of legalServicesData) {
      await strapi.entityService.create("api::legal-service.legal-service", {
        data: legalService,
      });
    }

    // Create Navigation Links
    const navigationData = [
      {
        label: "Home",
        href: "/",
        order: 1,
        isActive: true,
        publishedAt: new Date(),
      },
      {
        label: "About",
        href: "/about",
        order: 2,
        isActive: true,
        publishedAt: new Date(),
      },
      {
        label: "Services",
        href: "/services",
        order: 3,
        isActive: true,
        publishedAt: new Date(),
      },
      {
        label: "Blog",
        href: "/blog",
        order: 4,
        isActive: true,
        publishedAt: new Date(),
      },
      {
        label: "Contact",
        href: "/contact",
        order: 5,
        isActive: true,
        publishedAt: new Date(),
      },
    ];

    for (const navItem of navigationData) {
      await strapi.entityService.create(
        "api::navigation-link.navigation-link",
        {
          data: navItem,
        }
      );
    }

    console.log("Sample data created successfully!");
  } catch (error) {
    console.error("Error creating sample data:", error);
  }
};

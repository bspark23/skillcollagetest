import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { Content } from '@/models/content';
import { ContentService } from '@/services/content.service';

interface ContentState {
  content: Content;
  isLoading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  content: {
    siteContent: {
      home: {
        section1: {
          title: 'From Learning to Earning',
          body: 'Empowering individuals and communities through world-class skills training, entrepreneurship development, and research services.',
          overline: 'Skill College and Enterprise Ltd',
          image: '/images/hero/skill-college-hero-slider1.png',
          buttons: [
            { title: 'Explore Our Programs', href: '/services' },
            { title: 'Get In Touch', href: '/contact' },
          ],
        },
        section2: {
          title: 'Our Core Services',
          overline: 'What We Offer',
          body: 'Comprehensive programs designed to equip individuals with the skills and knowledge needed to thrive.',
          items: [
            { title: 'Skills Training Programs', body: 'Hands-on vocational and technical training programs designed to equip youth with market-ready skills.' },
            { title: 'Entrepreneurship Development', body: 'Comprehensive business development programs that transform ideas into sustainable enterprises.' },
            { title: 'Research and Innovation', body: 'Cutting-edge research services supporting evidence-based decision making and innovation.' },
            { title: 'Mentorship and Coaching', body: 'One-on-one mentorship connecting learners with experienced industry professionals.' },
            { title: 'Certification Programs', body: 'Internationally recognized certification courses that boost employability and career growth.' },
            { title: 'Community Development', body: 'Grassroots programs empowering communities through education and enterprise development.' },
          ],
        },
        section3: {
          title: 'Why Choose Skill College',
          body: 'We combine academic excellence with practical industry experience to deliver transformative education.',
          items: [
            { title: 'Business-Ready Solutions', body: 'Our programs are designed in partnership with industry leaders to ensure graduates are job and business ready from day one.' },
            { title: 'Experienced Faculty', body: 'Learn from seasoned professionals and academics with decades of real-world experience across multiple sectors.' },
            { title: 'Cutting-Edge Curriculum', body: 'Our curriculum is regularly updated to reflect current market demands, emerging technologies, and global best practices.' },
          ],
        },
        section4: {
          title: 'Our Partners',
          body: 'Working with leading organizations to deliver impactful programs across Nigeria and beyond.',
          items: [
            { title: 'Partner Organization One', body: '' },
            { title: 'Partner Organization Two', body: '' },
            { title: 'Partner Organization Three', body: '' },
          ],
        },
        section5: {
          title: 'Our Research Services',
          body: 'Providing evidence-based research and analytics to support informed decision making across sectors.',
          items: [
            { title: 'Policy and Research', body: 'Evidence-based policy research supporting government and private sector decision making.' },
            { title: 'Data and Analytics', body: 'Comprehensive data collection, analysis and reporting services for organizations.' },
            { title: 'Academic Collaboration', body: 'Partnerships with universities and research institutions for joint research initiatives.' },
            { title: 'Skills Gap Analysis', body: 'In-depth analysis of workforce skills gaps to inform training program development.' },
          ],
        },
        section6: {
          title: 'Blog & Insights',
          body: 'Stay updated with the latest news, stories, and insights from Skill College.',
        },
        section7: {
          title: 'Ready to Transform Your Future?',
          body: 'Join thousands of graduates who have transformed their lives through our programs.',
          button: { title: 'Contact Us Today', href: '/contact' },
        },
      },
      about: {
        section1: {
          title: 'About Skills College',
          overline: 'About Us',
          body: 'Comprehensive research and evaluation services tailored to your needs.',
        },
        section2: {
          title: 'Who We Are',
          body: 'Comprehensive research and evaluation services tailored to your needs.',
          image: '/images/who-we-are/skill-college-who-we-are-img.png',
          items: [
            { title: 'Evidence-Based Solutions', body: 'We design and implement programs grounded in research and data, ensuring our interventions create measurable, lasting impact for individuals and communities.' },
            { title: 'Our Vision', body: 'To be a leading catalyst for skills development and enterprise growth across Africa, empowering individuals to achieve economic independence.' },
            { title: 'Our Mission', body: 'To bridge the gap between education and employment by delivering market-driven training, research, and consulting services that strengthen MSMEs and support sustainable development.' },
          ],
        },
        section3: {
          title: 'Our Value Proposition',
          body: 'We combine local expertise with global best practices to deliver measurable impact. Our programs are designed to be practical, scalable, and context-specific.',
          image: '/images/our-value-proposition/skill-college-our-value-proposition-img.png',
        },
        section5: {
          title: 'Our Core Values',
          body: 'The principles that guide everything we do.',
          items: [
            { title: 'Excellence', body: 'We hold ourselves to the highest standards in everything we deliver.' },
            { title: 'Empowerment', body: 'We equip people with tools and confidence to succeed on their own terms.' },
            { title: 'Impact', body: 'We measure our success by the real change we create in people\'s lives.' },
            { title: 'Innovation', body: 'We embrace creative solutions to address complex development challenges.' },
          ],
        },
        section9: {
          title: 'Ready to Transform Your Future?',
          body: 'Join us and be part of a growing community of skilled professionals changing their lives.',
          button: { title: 'Get In Touch With Us', href: '/contact' },
        },
      },
      services: {
        section1: {
          title: 'Our Services',
          overline: 'What We Do',
          body: 'Comprehensive solutions designed to empower individuals, strengthen organizations, and drive sustainable development.',
        },
        section8: {
          title: 'Ready to Transform Your Future?',
          body: 'Join hundreds of individuals and organizations who have benefited from our programs and services.',
          button: { title: 'Get Started Today', href: '/contact' },
        },
      },
      programs: {
        section1: {
          title: 'Skills & Entrepreneurship Programs',
          body: 'Demand-driven training programs designed to equip you with practical skills for employment and entrepreneurship.',
        },
        section2: {
          title: 'Transform Your Future Through Learning',
          body: 'Our skills and entrepreneurship programs are designed to bridge the gap between education and employment.',
        },
        section8: {
          title: 'Ready to Transform Your Future?',
          body: 'Join hundreds of individuals and organizations who have benefited from our programs and services.',
          button: { title: 'Get Started Today', href: '/contact' },
        },
      },
      contact: {
        section1: {
          title: 'Contact Us',
          overline: 'Contact Us',
          body: 'Get in touch with us to learn more about our programs or discuss partnership opportunities.',
        },
        section2: {
          title: 'Contact Information',
          body: 'We are here to answer your questions and discuss how we can work together to create impact.',
          items: [
            { title: 'Office Address', body: 'No 12 Aisha Plaza, Off Maishindam Cambua Road, Maiduguri, Borno State, Nigeria' },
            { title: 'Phone Numbers', body: '+234 703 074 9599' },
            { title: 'Email Address', body: 'skillcollegealtd@gmail.com' },
            { title: 'Business Hours', body: 'Monday - Friday: 8:00 AM - 5:00 PM' },
          ],
        },
      },
    },
    systemSettings: {
      siteName: 'Skill College and Enterprise Ltd',
      siteLogo: '/images/skill-college-logo/skill-college-logo.png',
      siteIcon: '/images/skill-college-logo/skill-college-logo.png',
      siteUrl: 'https://skillcollegeandenterpriseltd.com',
      siteSlogan: 'From Learning to Earning',
      siteGraphImage: '',
      siteKeywords: ['skills training', 'entrepreneurship', 'research', 'Nigeria', 'education'],
      siteDescription: 'Empowering individuals and communities through world-class skills training, entrepreneurship development, and research services.',
      siteAuthor: 'Skill College and Enterprise Ltd',
      siteLocale: 'en_NG',
      siteType: 'website',
      ogTitle: 'Skill College and Enterprise Ltd',
      ogDescription: 'From Learning to Earning — Empowering individuals through skills development.',
      ogImage: '',
      ogImageAlt: 'Skill College and Enterprise Ltd',
      twitterCard: 'summary_large_image',
      twitterSite: '@skillcollege',
      twitterCreator: '@skillcollege',
      twitterTitle: 'Skill College and Enterprise Ltd',
      twitterDescription: 'From Learning to Earning.',
      twitterImage: '',
      maintenanceMode: false,
      headerLinks: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Programs', href: '/programs' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact Us', href: '/contact', isButton: true },
      ],
      footerLinks: [
        {
          section: 'Quick Links',
          links: [
            { label: 'Home', href: '/' },
            { label: 'About Us', href: '/about' },
            { label: 'Services', href: '/services' },
            { label: 'Programs', href: '/programs' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          section: 'Our Programs',
          links: [
            { label: 'Skills Training', href: '/services' },
            { label: 'Entrepreneurship', href: '/services' },
            { label: 'Research Services', href: '/services' },
            { label: 'Mentorship', href: '/services' },
            { label: 'Certification', href: '/services' },
          ],
        },
        {
          section: 'Contact Us',
          links: [
            { label: 'info@skillcollegeandenterpriseltd.com', href: 'mailto:info@skillcollegeandenterpriseltd.com' },
            { label: '+234 000 000 0000', href: 'tel:+2340000000000' },
          ],
        },
      ],
      socialLinks: [
        { label: 'WhatsApp', href: '#', icon: 'whatsapp' },
        { label: 'LinkedIn', href: '#', icon: 'linkedin' },
        { label: 'Instagram', href: '#', icon: 'instagram' },
        { label: 'Facebook', href: '#', icon: 'facebook' },
        { label: 'X', href: '#', icon: 'x' },
      ],
      contact: {
        email: 'skillcollegealtd@gmail.com',
        phones: ['+234 703 074 9599'],
        whatsappPhone: '+234 703 074 9599',
        addresses: [{ country: 'Nigeria', phone: '+234 703 074 9599', address: 'No 12 Aisha Plaza, Off Maishindam Cambua Road, Maiduguri, Borno State, Nigeria' }],
        map: '',
      },
    },
  },
  isLoading: true,
  error: null,
};

// Async thunks
export const fetchSiteContent = createAsyncThunk(
  'content/fetchSiteContent',
  async (_, { rejectWithValue }) => {
    try {
      return await ContentService.getContent();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch site content';
      return rejectWithValue(message);
    }
  }
);

export const updateSiteContent = createAsyncThunk(
  'content/updateSiteContent',
  async ({ content }: { content: Partial<Content> }, { rejectWithValue }) => {
    try {
      return await ContentService.updateContent(content);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update site content';
      return rejectWithValue(message);
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSiteContent: (state, action: PayloadAction<Content>) => {
      state.content = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSiteContent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSiteContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.content = action.payload;
    });
    builder.addCase(fetchSiteContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateSiteContent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateSiteContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.content = action.payload;
    });
    builder.addCase(updateSiteContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setSiteContent } = contentSlice.actions;
export default contentSlice.reducer;

# Skill College Ltd — API Posting Guide

## Base URL
```
https://webonthego-cms--ayha-the-market.europe-west4.hosted.app/api/v1/websites/skillcollegeltd.com
```

---

## 1. ADMIN SIGNUP (First Time Only)

**POST** `/auth/signup`

```json
{
  "firstName": "Skill",
  "lastName": "College",
  "email": "admin@skillcollegeltd.com",
  "phone": "+234 703 074 9599",
  "role": "admin",
  "password": "YourSecurePassword123!",
  "privileges": ["manage_users"]
}
```

**Response:** Copy the `accessToken` — use it as `Bearer <token>` in all admin requests.

---

## 2. ADMIN LOGIN (Subsequent Logins)

**POST** `/auth/signin`

```json
{
  "email": "admin@skillcollegeltd.com",
  "password": "YourSecurePassword123!"
}
```

**Response:** Copy the `accessToken` — use it as `Bearer <token>` in all admin requests.

---

## 3. UPDATE SITE CONTENT (All Pages)

**POST** `/content` (First time creating content)  
**PUT** `/content` (Updating existing content)  
**Header:** `Authorization: Bearer <accessToken>`

This endpoint updates all page content (sections, text, images, buttons).

### COMPLETE SITE CONTENT STRUCTURE

```json
{
  "siteContent": {
    "home": {
      "section1": {
        "title": "From Learning to Earning",
        "body": "Bridging the gap between education, business, and development. We provide market-driven training, research, and consulting services that empower individuals, strengthen MSMEs, and support sustainable development goals.",
        "buttons": [
          {
            "title": "Explore Our Services",
            "href": "/services"
          },
          {
            "title": "Contact Us",
            "href": "/contact"
          }
        ]
      },
      "section2": {
        "overline": "What We Offer",
        "title": "Our Core Services",
        "body": "Comprehensive programs designed to equip individuals with the skills and knowledge needed to thrive.",
        "items": [
          {
            "title": "Skills Training Programs",
            "body": "Hands-on vocational and technical training programs designed to equip youth with market-ready skills."
          },
          {
            "title": "Entrepreneurship Development",
            "body": "Comprehensive business development programs that transform ideas into sustainable enterprises."
          },
          {
            "title": "Research and Innovation",
            "body": "Cutting-edge research services supporting evidence-based decision making and innovation."
          },
          {
            "title": "Mentorship and Coaching",
            "body": "One-on-one mentorship connecting learners with experienced industry professionals."
          },
          {
            "title": "Certification Programs",
            "body": "Internationally recognized certification courses that boost employability and career growth."
          },
          {
            "title": "Community Development",
            "body": "Grassroots programs empowering communities through education and enterprise development."
          }
        ]
      },
      "section3": {
        "title": "Why Choose Skill College",
        "body": "We combine academic excellence with practical industry experience to deliver transformative education.",
        "items": [
          {
            "title": "Business-Ready Solutions",
            "body": "Our programs are designed in partnership with industry leaders to ensure graduates are job and business ready from day one."
          },
          {
            "title": "Experienced Faculty",
            "body": "Learn from seasoned professionals and academics with decades of real-world experience across multiple sectors."
          },
          {
            "title": "Cutting-Edge Curriculum",
            "body": "Our curriculum is regularly updated to reflect current market demands, emerging technologies, and global best practices."
          }
        ]
      },
      "section4": {
        "title": "Our Partners",
        "body": "We collaborate with diverse organizations to amplify our impact.",
        "items": [
          {
            "title": "UN Agencies & International Organizations",
            "body": "Collaboration with IOM, UNDP, UNHCR, and other UN agencies on development programs."
          },
          {
            "title": "NGOs & Government Agencies",
            "body": "Strategic partnerships with local and international NGOs for project implementation and government bodies on capacity building and development initiatives."
          },
          {
            "title": "Private Sector & Corporates",
            "body": "Partnership with businesses for skills development and economic empowerment programs."
          }
        ]
      },
      "section5": {
        "title": "Our Research Services",
        "body": "Data-driven insights and rigorous evaluations to measure impact and inform strategic decisions.",
        "items": [
          {
            "title": "Rigorous & Reliable",
            "body": "International standards and proven methodologies."
          },
          {
            "title": "Context-s from Skill College."
      },
      "section7": {
        "title": "Ready to Transform Your Future?",
        "body": "Join thousands of graduates who have transformed their lives through our programs.",
        "button": {
          "title": "Contact Us Today",
          "href": "/contact"
        }
      }
    },
    "about": {
      "section1": {
        "title": "About Skills College",
        "body": "Comprehensive research and evaluation services tailored to your needs."
      },
      "section2": {
        "title": "Who We Are",
        "body": "Comprehensive research and evaluation services tailored to your needs.",
        "items": [
          {
            "title": "Evidence-Based Solutions",
            "body": "We design and implement programs grounded in research and data, ensuring our interventions create measurable, lasting impact."
          },
          {
            "title": "Our Vision",
            "body": "To be a leading catalyst for skills development and enterprise growth across Africa, empowering individuals to achieve economic independence."
          },
          {
            "title": "Our Mission",
            "body": "To bridge the gap between education and employment by delivering market-driven training, research, and consulting services that strengthen MSMEs."
          }
        ]
      },
      "section3": {
        "title": "Our Value Proposition",
        "body": "We combine local expertise with global best practices to deliver measurable impact."
      },
      "section5": {
        "title": "Our Core Values",
        "body": "The principles that guide everything we do.",
        "items": [
          {
            "title": "Excellence",
            "body": "We hold ourselves to the highest standards in everything we deliver."
          },
          {
            "title": "Empowerment",
            "body": "We equip people with tools and confidence to succeed on their own terms."
          },
          {
            "title": "Impact",
            "body": "We measure our success by the real change we create in people's lives."
          },
          {
            "title": "Innovation",
            "body": "We embrace creative solutions to address complex development challenges."
          }
        ]
      },
      "section9": {
        "title": "Ready to Transform Your Future?",
        "body": "Join us and be part of a growing community of skilled professionals.",
        "button": {
          "title": "Get In Touch With Us",
          "href": "/contact"
        }
      }
    },
    "s
    "programs": {
      "section1": {
        "title": "Skills & Entrepreneurship Programs",
        "body": "Demand-driven training programs designed to equip you with practical skills for employment and entrepreneurship."
      },
      "section2": {
        "title": "Transform Your Future Through Learning",
        "body": "Our skills and entrepreneurship programs are designed to bridge the gap between education and employment. We provide market-driven training that empowers individuals to start businesses, secure jobs, and drive economic growth in their communities."
      },
      "section8": {
        "title": "Ready to Transform Your Future?",
        "body": "Join hundreds of individuals and organizations who have benefited from our programs and services.",
        "button": {
          "title": "Get Started Today",
          "href": "/contact"
        }
      }
    }
  }
}
```

---

## 4. POST BLOG ARTICLES

**POST** `/post`  
**Header:** `Authorization: Bearer <accessToken>`

### Example Blog Post 1: Empowering Youth

```json
{
  "title": "Empowering Youth Through Skills Development in Northeast Nigeria",
  "slug": "empowering-youth-skills-development",
  "excerpt": "How targeted skills training is transforming livelihoods and creating economic opportunities.",
  "content": "<h2>Introduction</h2><p>In Northeast Nigeria, youth unemployment remains a critical challenge. Through our targeted skills development programs, we're creating pathways to economic independence and sustainable livelihoods.</p><h2>Our Approach</h2><p>We combine practical vocational training with entrepreneurship education, ensuring graduates have both technical skills and business acumen to succeed in today's competitive market.</p><h2>Impact Stories</h2><p>Over 500 young people have completed our programs, with 70% securing employment or starting their own businesses within six months of graduation.</p>",
  "status": "published",
  "visibility": "public",
  "isFeatured": true,
  "category": {
    "id": "skills-development",
    "name": "Skills Development",
    "slug": "skills-development"
  },
  "tags": [
    {
      "id": "1",
      "name": "Youth Empowerment"
    },
    {
      "id": "2",
      "name": "Skills Training"
    },
    {
      "id": "3",
      "name": "Northeast Nigeria"
    }
  ],
  "featuredMedia": {
    "url": "/images/blog-&-insight/skill-college-blog-&-insight-img1.png",
    "alt": "Empowering Youth Through Skills Development",
    "type": "image",
    "width": 1200,
    "height": 800
  },
  "meta": {
    "title": "Empowering Youth Through Skills Development | Skill College",
    "description": "How targeted skills training is transforming livelihoods in Northeast Nigeria",
    "keywords": ["youth empowerment", "skills development", "northeast nigeria"]
  },
  "isPromoted": false,
  "isPremium": false,
  "allowComments": true,
  "version": 1
}
```

### Example Blog Post 2: Entrepreneurship Programs

```json
{
  "title": "The Impact of Our Entrepreneurship Programs at Skill College",
  "slug": "entrepreneurship-programs-impact",
  "excerpt": "Stories of transformation from graduates who turned skills into thriving businesses.",
  "content": "<h2>Building Business Leaders</h2><p>Our entrepreneurship programs go beyond basic business training. We provide comprehensive support including mentorship, access to finance, and ongoing coaching to ensure long-term success.</p><h2>Success Stories</h2><p>Meet Fatima, who transformed her tailoring skills into a thriving fashion business employing 5 people. Or Ibrahim, whose catering enterprise now serves major events across Maiduguri.</p><h2>The Skill College Difference</h2><p>We don't just teach business theory—we provide practical tools, real-world experience, and a supportive community that continues long after graduation.</p>",
  "status": "published",
  "visibility": "public",
  "isFeatured": true,
  "category": {
    "id": "entrepreneurship",
    "name": "Entrepreneurship",
    "slug": "entrepreneurship"
  },
  "tags": [
    {
      "id": "1",
      "name": "Entrepreneurship"
    },
    {
      "id": "2",
      "name": "Business Development"
    },
    {
      "id": "3",
      "name": "Success Stories"
    }
  ],
  "featuredMedia": {
    "url": "/images/blog-&-insight/skill-college-blog-&-insight-img2.png",
    "alt": "Entrepreneurship Programs Impact",
    "type": "image",
    "width": 1200,
    "height": 800
  },
  "meta": {
    "title": "The Impact of Our Entrepreneurship Programs | Skill College",
    "description": "Stories of transformation from graduates who turned skills into thriving businesses",
    "keywords": ["entrepreneurship", "business development", "success stories"]
  },
  "isPromoted": false,
  "isPremium": false,
  "allowComments": true,
  "version": 1
}
```

### Example Blog Post 3: Skills Assessment

```json
{
  "title": "Transition in the Skills Assessment Landscape Across Africa",
  "slug": "transition-skills-assessment-africa",
  "excerpt": "An overview of how skills assessment frameworks are evolving across the continent.",
  "content": "<h2>The Changing Landscape</h2><p>Skills assessment in Africa is undergoing a significant transformation. Traditional certification models are giving way to competency-based frameworks that better reflect real-world capabilities.</p><h2>Regional Trends</h2><p>From Nigeria to Kenya, countries are adopting new standards that align with international best practices while respecting local contexts and needs.</p><h2>Implications for Training Providers</h2><p>Training institutions must adapt their curricula and assessment methods to meet these evolving standards, ensuring graduates are recognized across borders.</p>",
  "status": "published",
  "visibility": "public",
  "isFeatured": false,
  "category": {
    "id": "research",
    "name": "Research & Insights",
    "slug": "research"
  },
  "tags": [
    {
      "id": "1",
      "name": "Skills Assessment"
    },
    {
      "id": "2",
      "name": "Africa"
    },
    {
      "id": "3",
      "name": "Education Policy"
    }
  ],
  "featuredMedia": {
    "url": "/images/blog-&-insight/skill-college-blog-&-insight-img3.png",
    "alt": "Skills Assessment Landscape in Africa",
    "type": "image",
    "width": 1200,
    "height": 800
  },
  "meta": {
    "title": "Transition in Skills Assessment Landscape Across Africa | Skill College",
    "description": "How skills assessment frameworks are evolving across the continent",
    "keywords": ["skills assessment", "africa", "education policy"]
  },
  "isPromoted": false,
  "isPremium": false,
  "allowComments": true,
  "version": 1
}
```

---

## 5. CONTACT FORM (Subscriber/Enquiry)

**POST** `/subscriber`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+234 800 000 0000",
  "type": "enquiry",
  "metadata": {
    "message": "I'm interested in your skills training programs"
  }
}
```

---

## 6. NEWSLETTER SUBSCRIPTION

**POST** `/subscriber`

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "type": "newsletter"
}
```

---

## 7. POSTMAN TESTING STEPS

### Step 1: Setup Collection
1. Create a new collection: **"Skill College API"**
2. Set collection variable: `baseUrl` = `https://webonthego-cms--ayha-the-market.europe-west4.hosted.app/api/v1/websites/skillcollegeltd.com`

### Step 2: Admin Login
1. **POST** `{{baseUrl}}/auth/signin`
2. Body (JSON):
```json
{
  "email": "admin@skillcollegeltd.com",
  "password": "YourSecurePassword123!"
}
```
3. Copy `accessToken` from response
4. Set collection variable: `token` = the access token

### Step 3: Add Authorization Header
Add to all protected requests:
- **Header:** `Authorization: Bearer {{token}}`

### Step 4: Post Site Content
1. **PUT** `{{baseUrl}}/content`
2. **Header:** `Authorization: Bearer {{token}}`
3. **Body:** Use the complete site content JSON from Section 3

### Step 5: Post Blog Articles
1. **POST** `{{baseUrl}}/post`
2. **Header:** `Authorization: Bearer {{token}}`
3. **Body:** Use blog post JSON from Section 4 (repeat for each article)

### Step 6: Verify Content
1. **GET** `{{baseUrl}}/content` - View all site content
2. **GET** `{{baseUrl}}/post` - View all blog posts
3. Open website to see live content

---

## 8. HOW THE SITE FETCHES DATA

- **Page Content:** Fetched via Redux `fetchSiteContent()` → calls `GET /content`
- **Blog Articles:** Fetched via Redux `fetchPosts()` → calls `GET /post`
- **Contact Form:** Posts to `POST /subscriber` with `type: "enquiry"`
- **Newsletter:** Posts to `POST /subscriber` with `type: "newsletter"`

When you post content to the API, it will automatically appear on the website:
- Blog articles appear on the Blog page and homepage
- Page content updates all sections on respective pages
- All content is fetched on page load via Redux store

---

## 9. BLOG CATEGORIES

Filter blog articles by category:
- `skills-development` - Skills Development articles
- `entrepreneurship` - Entrepreneurship articles
- `research` - Research & Insights articles
- `training` - Training Programs articles

---

## 10. TROUBLESHOOTING

**Issue:** Content not appearing on website
- **Solution:** Verify the API response with `GET /content` or `GET /post`
- Check that `status: "published"` and `visibility: "public"`

**Issue:** Images not loading
- **Solution:** Ensure image URLs are valid and accessible
- Use relative paths like `/images/...` or full HTTPS URLs

**Issue:** 401 Unauthorized error
- **Solution:** Verify your access token is correct
- Tokens may expire; get a new one with `/auth/signin`

**Issue:** Blog posts not showing
- **Solution:** Ensure `status: "published"` and `visibility: "public"`
- Check that the slug is unique

---

## 11. QUICK REFERENCE - ENDPOINTS

| Method | Endpoint | Purpoer` | Create subscriber/enquiry |

---

## 12. EXAMPLE WORKFLOW

1. **Login:** POST `/auth/signin` → get token
2. **Update Homepage:** PUT `/content` with home section data
3. **Add Blog Post 1:** POST `/post` with first blog article
4. **Add Blog Post 2:** POST `/post` with second blog article
5. **Add Blog Post 3:** POST `/post` with third blog article
6. **Verify:** GET `/post` to see all posts
7. **Test Website:** Open skillcollegeltd.com → see all content live

---

**API Documentation Complete!**  
All endpoints are ready for integration. The website will automatically fetch and display all content posted to these endpoints.

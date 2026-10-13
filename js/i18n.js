/**
 * Bihar Cancer Care Organisation (BCCO)
 * Centralized Internationalization System — Indian Languages Only
 * Strict 23 Indian Languages (22 Scheduled Languages of India + English (India))
 */

(function () {
  "use strict";

  // ==========================================================================
  // 1. STRICT CONFIGURATION & APPROVED LANGUAGES
  // ==========================================================================
  const I18N_CONFIG = {
    // Only Indian languages (22 Eighth Schedule languages + Indian English)
    approvedLanguages: [
      { code: 'en-IN', name: 'English (India)', nativeName: 'English (India)', script: 'Latin', dir: 'ltr', matchTags: ['en-in'] },
      { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', dir: 'ltr', matchTags: ['hi', 'hi-in'] },
      { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', dir: 'ltr', matchTags: ['bn', 'bn-in', 'bn-bd'] },
      { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', script: 'Devanagari', dir: 'ltr', matchTags: ['mai', 'mai-in'] },
      { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali', dir: 'ltr', matchTags: ['as', 'as-in'] },
      { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', script: 'Devanagari', dir: 'ltr', matchTags: ['brx', 'brx-in'] },
      { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', script: 'Devanagari', dir: 'ltr', matchTags: ['doi', 'doi-in'] },
      { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', dir: 'ltr', matchTags: ['gu', 'gu-in'] },
      { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', dir: 'ltr', matchTags: ['kn', 'kn-in'] },
      { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर / کٲشُر', script: 'Perso-Arabic', dir: 'ltr', matchTags: ['ks', 'ks-in'] },
      { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', script: 'Devanagari', dir: 'ltr', matchTags: ['kok', 'kok-in'] },
      { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', dir: 'ltr', matchTags: ['ml', 'ml-in'] },
      { code: 'mni', name: 'Manipuri / Meitei', nativeName: 'মৈতৈলোন্', script: 'Bengali', dir: 'ltr', matchTags: ['mni', 'mni-in'] },
      { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', dir: 'ltr', matchTags: ['mr', 'mr-in'] },
      { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', script: 'Devanagari', dir: 'ltr', matchTags: ['ne', 'ne-in', 'ne-np'] },
      { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', dir: 'ltr', matchTags: ['or', 'or-in', 'ory', 'od'] },
      { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', dir: 'ltr', matchTags: ['pa', 'pa-in'] },
      { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari', dir: 'ltr', matchTags: ['sa', 'sa-in', 'san'] },
      { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', dir: 'ltr', matchTags: ['sat', 'sat-in'] },
      { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي / सिंधी', script: 'Arabic', dir: 'ltr', matchTags: ['sd', 'sd-in'] },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', dir: 'ltr', matchTags: ['ta', 'ta-in', 'ta-lk'] },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', dir: 'ltr', matchTags: ['te', 'te-in'] },
      { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Perso-Arabic', dir: 'rtl', matchTags: ['ur', 'ur-in', 'ur-pk'] }
    ],

    // Strictly Indian languages allowed for auto-detection
    autoDetectLanguages: [
      'en-in', 'hi', 'bn', 'mai', 'as', 'brx', 'doi', 'gu', 'kn', 'ks', 'kok',
      'ml', 'mni', 'mr', 'ne', 'or', 'pa', 'sa', 'sat', 'sd', 'ta', 'te', 'ur'
    ],

    defaultLanguage: 'en-IN',
    detectionMode: 'auto-indian', // 'auto-indian' | 'manual'
    userLanguagePreference: null
  };

  // Quick lookup map by code
  const LANG_MAP = {};
  I18N_CONFIG.approvedLanguages.forEach(l => {
    LANG_MAP[l.code] = l;
  });

  // ==========================================================================
  // 2. CENTRALIZED TRANSLATION DICTIONARY
  // ==========================================================================
  const TRANSLATIONS = {
    // ------------------------------------------------------------------------
    // ENGLISH (INDIA) - Base Master Reference
    // ------------------------------------------------------------------------
    'en-IN': {
      // Nav & Header
      nav_home: 'Home',
      nav_cancer: 'Know Your Cancer',
      nav_news: 'Media & News',
      nav_advisory: 'Board of Advisors',
      nav_certificates: 'Registration Certificates',
      nav_careers: 'Careers',
      nav_contact: 'Contact Us',
      nav_donate: 'Donate',
      nav_donate_support: 'Donate · Support Our Mission',
      skip_link: 'Skip to main content',
      brand_name: 'Bihar Cancer Care Organisation',
      brand_slogan: 'Care • Hope • Life',

      // Hero
      hero_eyebrow: 'Bihar Cancer Care Organisation',
      hero_title_1: 'Awareness first.',
      hero_title_2: 'Support always.',
      hero_sub: 'Early detection begins with awareness, and awareness begins with conversation. BCCO helps the people of Bihar understand cancer, notice the signs early, and find steady, compassionate support — for patients and the families beside them.',
      hero_cta_learn: 'Learn About Cancer',
      hero_cta_initiatives: 'Our Initiatives',
      hero_cta_contact: 'Contact Us',
      hero_trust_guidance: 'Free, confidential guidance',
      hero_trust_local: 'Awareness in local language',
      hero_trust_families: 'Families supported, always',

      // Stats
      stat_camps_num: '120+',
      stat_camps_label: 'Free Awareness Camps',
      stat_camps_sub: 'Organised across Bihar districts',
      stat_families_num: '4,500+',
      stat_families_label: 'Families Guided',
      stat_families_sub: 'Free confidential counseling',
      stat_districts_num: '38',
      stat_districts_label: 'Districts of Bihar',
      stat_districts_sub: 'Active grassroots outreach',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'Support Helplines',
      stat_helpline_sub: 'Compassionate assistance',

      // About & Initiatives
      about_eyebrow: 'Why We Exist',
      about_title: 'Turning Fear Into Knowledge, And Isolation Into Community',
      about_lead: 'A cancer diagnosis brings fear, anxiety, and confusion. In Bihar, early detection is often missed simply because warning signs are not recognized in time. BCCO bridges this gap through ground-level education, patient navigation, and compassionate family care.',
      init_1_title: 'Early Detection Camps',
      init_1_desc: 'Reaching villages, towns, and schools across Bihar with clear, stigma-free guidance on symptoms and self-examination.',
      init_2_title: 'Patient Navigation',
      init_2_desc: 'Guiding newly diagnosed patients and families to the right hospitals, tests, and medical oncologists without delay.',
      init_3_title: 'Financial Scheme Guidance',
      init_3_desc: 'Helping families access Ayushman Bharat (PM-JAY), CM Relief Fund, and hospital charitable concessions.',
      init_4_title: 'Caregiver Support',
      init_4_desc: 'Supporting the families and caregivers who stand beside the patient through treatment, fatigue, and recovery.',

      // Know Your Cancer
      cancer_eyebrow: 'Cancer Guidance',
      cancer_title: 'Understanding Cancer: Signs, Screening & Action',
      cancer_lead: 'Cancer is not a single disease, and hearing the word does not mean hope is lost. Many cancers are highly treatable when caught early. Learn the key warning signs below.',
      caution_heading: 'The 7 Universal Warning Signs (C.A.U.T.I.O.N.)',
      caution_c_title: 'Change in bowel or bladder habits',
      caution_c_desc: 'Persistent diarrhea, constipation, or changes in stool or urine color lasting more than two weeks.',
      caution_a_title: 'A sore or ulcer that does not heal',
      caution_a_desc: 'Non-healing mouth sores, skin patches, or lip lesions, especially in tobacco or betel nut users.',
      caution_u_title: 'Unusual bleeding or discharge',
      caution_u_desc: 'Unexpected bleeding between periods, after menopause, blood in urine or stools, or coughing blood.',
      caution_t_title: 'Thickening or lump in breast or body',
      caution_t_desc: 'A painless or firm lump in the breast, neck, underarm, or groin that does not go away.',
      caution_i_title: 'Indigestion or difficulty swallowing',
      caution_i_desc: 'Food getting stuck, painful swallowing, or chronic acid reflux that does not respond to ordinary medicine.',
      caution_o_title: 'Obvious change in a wart or mole',
      caution_o_desc: 'Rapid change in size, irregular edges, darkening color, bleeding, or persistent itching.',
      caution_n_title: 'Nagging cough or hoarseness',
      caution_n_desc: 'A persistent cough lasting more than 3-4 weeks, voice hoarseness, or coughing up blood.',

      // Media & News
      news_eyebrow: 'Stay Informed',
      news_title: 'Media, News & Educational Guides',
      news_lead: 'Read practical educational articles, announcements about upcoming awareness drives, and stories of courage and recovery.',
      filter_all: 'All Updates',
      filter_edu: 'Educational',
      filter_news: 'News & Drives',
      filter_stories: 'Stories of Hope',
      btn_read_more: 'Read Full Guide',
      btn_watch_video: 'Watch Video',

      // Advisory & Leadership
      advisory_eyebrow: 'Our Governance',
      advisory_title: 'Board of Advisors & Mentors',
      advisory_sub: 'Guided by senior oncologists, healthcare leaders, public health professionals, and dedicated social workers.',

      // Certificates
      cert_eyebrow: 'Transparency & Trust',
      cert_title: 'Official Registrations & Compliance',
      cert_sub: 'BCCO operates with highest standards of transparency, governed by registered trust deeds, 12A, 80G, and CSR certifications.',
      cert_download: 'Download Certificate',
      cert_view: 'View Document',

      // Careers
      career_eyebrow: 'Join Our Mission',
      career_title: 'Careers & Volunteer Opportunities',
      career_sub: 'Help us bring cancer awareness and compassionate support to every district of Bihar. We welcome medical volunteers, community mobilizers, and counselors.',
      form_name: 'Full Name',
      form_email: 'Email Address',
      form_phone: 'Phone / WhatsApp Number',
      form_role: 'Role / Area of Interest',
      form_message: 'Message / Why you want to join',
      form_submit: 'Submit Application',

      // Contact
      contact_eyebrow: 'We Are Here For You',
      contact_title: 'Contact Our Support Team',
      contact_sub: 'Have questions about symptoms, hospital guidance, or how to volunteer? Reach out to our team in Patna. We are here to help.',
      contact_office_title: 'Patna Registered Office',
      contact_office_addr: 'Ward No. 8, Satyabha Niwas, IAS Nagar, Beside Patel Bhawan, Police Headquarters, Patna, Bihar - 800023, India',
      contact_helpline_title: 'Helpline & WhatsApp',
      contact_landline_title: 'Office Landline',
      contact_email_title: 'Official Email',
      contact_btn_send: 'Send Message',

      // Donate Modal
      donate_title: 'Support Cancer Patients in Bihar',
      donate_sub: 'Your contribution directly funds free screening camps, essential medicines, and patient navigation for underprivileged families.',
      donate_bank_name: 'Bank Name: State Bank of India (SBI)',
      donate_acc_name: 'Account Name: Bihar Cancer Care Organization',
      donate_acc_no: 'Account Number: 44908340531',
      donate_ifsc: 'IFSC Code: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: 'Donations are eligible for tax exemption under Section 80G of the Income Tax Act.',
      donate_btn_copy: 'Copy Account Details',
      donate_copied: 'Copied to Clipboard!',

      // Language Selector
      lang_selector_title: 'Select Language / भाषा चुनें',
      lang_selector_sub: 'Indian Languages Only • 22 Official Scheduled Languages + English (India)',
      lang_search_placeholder: 'Search Indian language / भाषा खोजें (e.g. Hindi, বাংলা, தமிழ், मैथिली)...',
      lang_auto_btn: 'Automatic Detection (Browser Default)',
      lang_auto_detected: 'Detected from browser: ',
      lang_enable: 'Enable',
      lang_active: 'Active',
      lang_empty: 'No Indian language found matching your search.',
      lang_footer_note: 'Selection is securely saved and preserved across all pages. International languages are excluded.',

      // Footer
      footer_desc: 'Bihar Cancer Care Organisation is dedicated to cancer prevention, early awareness, patient support, and family counseling across Bihar.',
      footer_links: 'Quick Navigation',
      footer_helplines: 'Support Helplines',
      footer_disclaimer: 'Medical Disclaimer: The information on this website is for educational and awareness purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified doctor regarding medical symptoms.',
      footer_rights: 'All rights reserved. Bihar Cancer Care Organisation (BCCO).'
    },

    // ------------------------------------------------------------------------
    // HINDI (हिन्दी)
    // ------------------------------------------------------------------------
    'hi': {
      nav_home: 'मुख्य पृष्ठ',
      nav_cancer: 'कैंसर को जानें',
      nav_news: 'मीडिया और समाचार',
      nav_advisory: 'सलाहकार परिषद',
      nav_certificates: 'पंजीकरण प्रमाण पत्र',
      nav_careers: 'करियर और स्वयंसेवा',
      nav_contact: 'संपर्क करें',
      nav_donate: 'दान करें',
      nav_donate_support: 'दान करें · हमारे मिशन का समर्थन करें',
      skip_link: 'मुख्य सामग्री पर जाएं',
      brand_name: 'बिहार कैंसर केयर ऑर्गनाइजेशन',
      brand_slogan: 'सेवा • आशा • जीवन',

      hero_eyebrow: 'बिहार कैंसर केयर ऑर्गनाइजेशन',
      hero_title_1: 'जागरूकता पहले।',
      hero_title_2: 'सहयोग सदैव।',
      hero_sub: 'समय पर पहचान की शुरुआत जागरूकता से होती है, और जागरूकता की शुरुआत बातचीत से। बीसीसीओ बिहार के लोगों को कैंसर समझने, शुरुआती लक्षणों को पहचानने और मरीजों व परिवारों के लिए अटूट मार्गदर्शन प्रदान करने में मदद करता है।',
      hero_cta_learn: 'कैंसर के बारे में जानें',
      hero_cta_initiatives: 'हमारी पहल',
      hero_cta_contact: 'संपर्क करें',
      hero_trust_guidance: 'निःशुल्क एवं गोपनीय मार्गदर्शन',
      hero_trust_local: 'स्थानीय भाषा में जागरूकता',
      hero_trust_families: 'परिवारों का अटूट साथ',

      stat_camps_num: '120+',
      stat_camps_label: 'निःशुल्क जागरूकता शिविर',
      stat_camps_sub: 'बिहार के विभिन्न जिलों में आयोजित',
      stat_families_num: '4,500+',
      stat_families_label: 'मार्गदर्शन प्राप्त परिवार',
      stat_families_sub: 'मुफ्त गोपनीय परामर्श',
      stat_districts_num: '38',
      stat_districts_label: 'बिहार के सभी 38 जिले',
      stat_districts_sub: 'सक्रिय जमीनी संपर्क अभियान',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'सहायता हेल्पलाइन',
      stat_helpline_sub: 'सहानुभूतिपूर्ण सहायता',

      about_eyebrow: 'हमारा उद्देश्य',
      about_title: 'डर को समझ में और अकेलेपन को अपनेपन में बदलना',
      about_lead: 'कैंसर की पहचान परिवार में घबराहट और उलझन लाती है। बिहार में अक्सर लोग समय पर लक्षणों को समझ नहीं पाते। बीसीसीओ जमीनी जागरूकता, अस्पताल मार्गदर्शन और संवेदनापूर्ण सहयोग के जरिए इस अंतर को पाटता है।',
      init_1_title: 'प्रारंभिक जागरूकता शिविर',
      init_1_desc: 'बिहार के गांवों, कस्बों और स्कूलों में बिना किसी झिझक के लक्षणों और रोकथाम की स्पष्ट जानकारी पहुंचाना।',
      init_2_title: 'मरीज मार्गदर्शन सेवा',
      init_2_desc: 'नए मरीजों और परिवारों को बिना देरी सही अस्पताल, सही जांच और योग्य कैंसर विशेषज्ञों तक पहुंचाना।',
      init_3_title: 'सरकारी योजनाओं में सहायता',
      init_3_desc: 'आयुष्मान भारत (PM-JAY), मुख्यमंत्री चिकित्सा राहत कोष और धर्मार्थ रियायतों को प्राप्त करने में मदद।',
      init_4_title: 'देखभालकर्ता (केयरगिवर) परामर्श',
      init_4_desc: 'इलाज के कठिन समय में मरीज के साथ खड़े परिजनों को भावनात्मक संबल और मानसिक मजबूती देना।',

      cancer_eyebrow: 'कैंसर मार्गदर्शिका',
      cancer_title: 'कैंसर को समझें: लक्षण, जांच और सही कदम',
      cancer_lead: 'कैंसर सिर्फ एक बीमारी नहीं है, और इसका नाम सुनकर हिम्मत हारने की जरूरत नहीं है। समय पर पहचान होने पर अधिकांश कैंसर पूरी तरह ठीक हो सकते हैं। नीचे दिए गए 7 प्रमुख लक्षणों को ध्यान से समझें।',
      caution_heading: 'कैंसर के 7 सार्वभौमिक चेतावनी संकेत (C.A.U.T.I.O.N.)',
      caution_c_title: 'शौच या पेशाब की आदतों में लगातार बदलाव',
      caution_c_desc: 'दो सप्ताह से अधिक समय तक दस्त, कब्ज या पेशाब/मल के रंग व स्वभाव में असामान्य बदलाव।',
      caution_a_title: 'मुंह या त्वचा का घाव जो जल्दी न भरे',
      caution_a_desc: 'मुंह में सफेद या लाल छाले, त्वचा या होंठ का घाव जो ठीक न हो रहा हो, विशेषकर गुटखा/तंबाकू उपयोगकर्ताओं में।',
      caution_u_title: 'असामान्य रक्तस्राव या रिसाव',
      caution_u_desc: 'मासिक धर्म के अलावा या रजोनिवृत्ति (मेनोपॉज) के बाद रक्तस्राव, पेशाब/मल में खून, या खांसी में खून आना।',
      caution_t_title: 'स्तन, गर्दन या शरीर के किसी हिस्से में गांठ',
      caution_t_desc: 'स्तन, कांख, गले या कमर में कोई भी दर्द रहित या सख्त गांठ जो खुद से गायब न हो रही हो।',
      caution_i_title: 'अपच या भोजन निगलने में कठिनाई',
      caution_i_desc: 'खाना अटकना, गले में दर्द, या लंबे समय से बनी रहने वाली एसिडिटी जो साधारण दवा से ठीक न हो।',
      caution_o_title: 'मस्से या तिल के आकार-रंग में स्पष्ट बदलाव',
      caution_o_desc: 'तिल का तेजी से बढ़ना, किनारों का टेढ़ा-मेढ़ा होना, गहरा काला पड़ना, खून निकलना या खुजली होना।',
      caution_n_title: 'लगातार खांसी या आवाज में भारीपन/घरघराहट',
      caution_n_desc: 'तीन-चार सप्ताह से अधिक पुरानी खांसी, आवाज का बैठना, या सांस लेने में लगातार तकलीफ।',

      news_eyebrow: 'अपडेट रहें',
      news_title: 'मीडिया, समाचार और प्रेरक कहानियां',
      news_lead: 'स्वास्थ्य मार्गदर्शिकाएं, आगामी शिविरों की घोषणाएं और कैंसर को मात देने वाले साहसी योद्धाओं की कहानियां पढ़ें।',
      filter_all: 'सभी अपडेट',
      filter_edu: 'शैक्षणिक लेख',
      filter_news: 'समाचार व शिविर',
      filter_stories: 'उम्मीद की कहानियां',
      btn_read_more: 'पूरा लेख पढ़ें',
      btn_watch_video: 'वीडियो देखें',

      advisory_eyebrow: 'हमारा नेतृत्व',
      advisory_title: 'सलाहकार परिषद एवं मार्गदर्शक',
      advisory_sub: 'वरिष्ठ कैंसर रोग विशेषज्ञों, स्वास्थ्य नीति निर्माताओं और समर्पित समाजसेवियों के मार्गदर्शन में संचालित।',

      cert_eyebrow: 'पारदर्शिता और विश्वास',
      cert_title: 'आधिकारिक पंजीकरण एवं अनुपालन',
      cert_sub: 'बीसीसीओ पूर्ण पारदर्शिता के साथ संचालित है, जो पंजीकृत ट्रस्ट डीड, 12A, 80G और CSR प्रमाण पत्रों द्वारा सत्यापित है।',
      cert_download: 'प्रमाण पत्र डाउनलोड करें',
      cert_view: 'दस्तावेज देखें',

      career_eyebrow: 'हमारे मिशन से जुड़ें',
      career_title: 'करियर और स्वयंसेवा के अवसर',
      career_sub: 'बिहार के हर जिले तक कैंसर जागरूकता और सहयोग पहुंचाने में हमारा साथ दें। डॉक्टरों, स्वयंसेवकों और सलाहकारों का स्वागत है।',
      form_name: 'पूरा नाम',
      form_email: 'ईमेल पता',
      form_phone: 'फोन / व्हाट्सएप नंबर',
      form_role: 'रुचि का क्षेत्र / पद',
      form_message: 'संदेश / जुड़ने का कारण',
      form_submit: 'आवेदन जमा करें',

      contact_eyebrow: 'हम आपके साथ हैं',
      contact_title: 'हमारी सहायता टीम से संपर्क करें',
      contact_sub: 'लक्षणों, अस्पताल सहायता या स्वयंसेवा से जुड़ा कोई भी सवाल हो, पटना में हमारी टीम से संपर्क करें। हम सदैव आपके साथ हैं।',
      contact_office_title: 'पटना पंजीकृत कार्यालय',
      contact_office_addr: 'वार्ड नं. 8, सत्यभा निवास, आईएएस नगर, पटेल भवन (पुलिस मुख्यालय) के बगल में, पटना, बिहार - 800023',
      contact_helpline_title: 'हेल्पलाइन और व्हाट्सएप',
      contact_landline_title: 'कार्यालय लैंडलाइन',
      contact_email_title: 'आधिकारिक ईमेल',
      contact_btn_send: 'संदेश भेजें',

      donate_title: 'बिहार में कैंसर मरीजों की सहायता करें',
      donate_sub: 'आपका अंशदान सीधे तौर पर जरूरतमंद परिवारों के लिए मुफ्त जांच शिविर, दवाइयों और अस्पताल सहायता में उपयोग होता है।',
      donate_bank_name: 'बैंक का नाम: भारतीय स्टेट बैंक (SBI)',
      donate_acc_name: 'खाता नाम: बिहार कैंसर केयर ऑर्गनाइजेशन',
      donate_acc_no: 'खाता संख्या: 44908340531',
      donate_ifsc: 'आईएफएससी कोड: SBIN0009004',
      donate_upi: 'यूपीआई आईडी: biharcancercareorganisation@sbi',
      donate_tax_info: 'आयकर अधिनियम की धारा 80G के तहत सभी दान कर-मुक्त हैं।',
      donate_btn_copy: 'खाता विवरण कॉपी करें',
      donate_copied: 'कॉपी हो गया!',

      lang_selector_title: 'भाषा चुनें / Select Language',
      lang_selector_sub: 'केवल भारतीय भाषाएं • 22 आधिकारिक अनुसूची भाषाएं + भारतीय अंग्रेजी',
      lang_search_placeholder: 'भारतीय भाषा खोजें (उदा. हिन्दी, বাংলা, தமிழ், मैथिली)...',
      lang_auto_btn: 'स्वचालित पहचान (ब्राउज़र डिफ़ॉल्ट)',
      lang_auto_detected: 'ब्राउज़र से पहचानी गई: ',
      lang_enable: 'सक्रिय करें',
      lang_active: 'सक्रिय',
      lang_empty: 'आपकी खोज के अनुसार कोई भारतीय भाषा नहीं मिली।',
      lang_footer_note: 'आपकी भाषा प्राथमिकता सुरक्षित रूप से सहेजी जाती है। अंतरराष्ट्रीय भाषाएं शामिल नहीं हैं।',

      footer_desc: 'बिहार कैंसर केयर ऑर्गनाइजेशन बिहार भर में कैंसर की रोकथाम, शुरुआती जागरूकता, मरीज सहायता और पारिवारिक परामर्श के लिए समर्पित है।',
      footer_links: 'त्वरित लिंक',
      footer_helplines: 'सहयोग हेल्पलाइन',
      footer_disclaimer: 'चिकित्सीय अस्वीकरण: इस वेबसाइट की जानकारी केवल जागरूकता के उद्देश्य से है। यह किसी डॉक्टर की चिकित्सीय सलाह या इलाज का विकल्प नहीं है। किसी भी लक्षण पर तुरंत योग्य चिकित्सक से परामर्श लें।',
      footer_rights: 'सर्वाधिकार सुरक्षित। बिहार कैंसर केयर ऑर्गनाइजेशन (BCCO).'
    },

    // ------------------------------------------------------------------------
    // MAITHILI (मैथिली) - Vital for Bihar
    // ------------------------------------------------------------------------
    'mai': {
      nav_home: 'मुख्य पृष्ठ',
      nav_cancer: 'कैंसरक जानकारी',
      nav_news: 'मीडिया आ समाचार',
      nav_advisory: 'सलाहकार मंडल',
      nav_certificates: 'पंजीकरण प्रमाण पत्र',
      nav_careers: 'करियर आ स्वयंसेवा',
      nav_contact: 'संपर्क करू',
      nav_donate: 'दान करू',
      nav_donate_support: 'दान करू · हमर अभियानक सहयोग करू',
      skip_link: 'मुख्य सामग्री पर जाऊ',
      brand_name: 'बिहार कैंसर केयर ऑर्गनाइजेशन',
      brand_slogan: 'सेवा • आशा • जीवन',

      hero_eyebrow: 'बिहार कैंसर केयर ऑर्गनाइजेशन',
      hero_title_1: 'जागरूकता पहिने।',
      hero_title_2: 'सहयोग सदैव।',
      hero_sub: 'शुरुआती समय में कैंसरक पहचान जागरूकता सं संभव अछि। बीसीसीओ बिहारक जन-जन धरि कैंसरक सही जानकारी, लक्षणक पहचान आ मरीजक परिवारक लेल निरंतर संबल प्रदान करैत अछि।',
      hero_cta_learn: 'कैंसरक विषय में जानू',
      hero_cta_initiatives: 'हमर पहल',
      hero_cta_contact: 'संपर्क करू',
      hero_trust_guidance: 'निःशुल्क आ गोपनीय परामर्श',
      hero_trust_local: 'अपन भाषा में जागरूकता',
      hero_trust_families: 'परिवारक अटूट साथ',

      stat_camps_num: '120+',
      stat_camps_label: 'मुफ्त जागरूकता शिविर',
      stat_camps_sub: 'बिहारक जिला-जिला में आयोजित',
      stat_families_num: '4,500+',
      stat_families_label: 'लाभान्वित परिवार',
      stat_families_sub: 'मुफ्त गोपनीय परामर्श',
      stat_districts_num: '38',
      stat_districts_label: 'बिहारक सभ 38 जिला',
      stat_districts_sub: 'जमीनी स्तर पर अभियान',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'सहायता हेल्पलाइन',
      stat_helpline_sub: 'सदा तत्पर सहयोग',

      about_eyebrow: 'हमर उद्देश्य',
      about_title: 'भय के ज्ञान में आ उदासी के अपनप में बदलब',
      about_lead: 'कैंसरक नाम सुनितहि परिवार में घबराहट भए जाएत अछि। बिहार में बहुते बेर लक्षणक सही समय पर जानकारी नहि भेलाक कारण देरी भए जाएत अछि। बीसीसीओ गाम-गाम जागरूकता आ अस्पताल मार्गदर्शन सं ई दूरी मिटबैत अछि।',
      init_1_title: 'गाम-गाम स्वास्थ्य शिविर',
      init_1_desc: 'मिथिला आ बिहारक गाम-गाम धरि कैंसरक लक्षण आ बचाव के सोझ आ सरल भाषा में पहुंचाएब।',
      init_2_title: 'मरीज मार्गदर्शन',
      init_2_desc: 'मरीज आ हुनक परिवार के सही समय पर उपयुक्त अस्पताल आ कैंसर विशेषज्ञ धरि पहुंचाएब।',
      init_3_title: 'सरकारी योजना सहायता',
      init_3_desc: 'आयुष्मान भारत आ मुख्यमंत्री चिकित्सा राहत कोष सं आर्थिक सहयोग प्राप्त करबामे सहायता।',
      init_4_title: 'केयरगिवर सहयोग',
      init_4_desc: 'मरीजक संग सेवा में लागल परिवारक लोक के मानसिक आ भावनात्मक संबल प्रदान करब।',

      cancer_eyebrow: 'कैंसरक जानकारी',
      cancer_title: 'कैंसर के बूझू: लक्षण, जांच आ उपचार',
      cancer_lead: 'कैंसर सं डेराबाक आवश्यकता नहि अछि। समय पर जांच भेला पर एकर पूरा इलाज संभव अछि। नीचा देल लक्षण पर विशेष ध्यान दियौक।',
      caution_heading: 'कैंसरक 7 मुख्य चेतावनी लक्षण (C.A.U.T.I.O.N.)',
      caution_c_title: 'शौच वा पेशाबक आदत में लगातार बदलाव',
      caution_c_desc: 'दू सप्ताह सं बेसी दस्त, कब्ज वा पेशाबक रंग में असामान्य बदलाव।',
      caution_a_title: 'मुह वा देहक घाव जे जल्दी नहि भरैत होय',
      caution_a_desc: 'मुह में उज्जर वा लाल छाला, विशेष कए गुटखा-खैनी खनिहार लोक में।',
      caution_u_title: 'अस्वाभाविक रक्तस्राव वा स्राव',
      caution_u_desc: 'माहवारीक अतिरिक्त रक्तस्राव, पेशाब में खून वा खंखार में खून आबब।',
      caution_t_title: 'स्तन वा देहक कोनो अंग में गिल्टी (गांठ)',
      caution_t_desc: 'स्तन, गर्दन वा कांख में बिना दर्दक गांठ जे अपने-आप समाप्त नहि होइत होय।',
      caution_i_title: 'भोजन घोंटबामे कठिनाई वा बदहजमी',
      caution_i_desc: 'खाना अटकब वा लगातार रहैबला एसिडिटी जे साधारण दवाई सं ठीक नहि होय।',
      caution_o_title: 'तिल वा मस्साक रंग-आकार में बदलाव',
      caution_o_desc: 'तिलक तेजी सं बढ़ब वा ओहिमे सं खून आबब।',
      caution_n_title: 'लगातार खांसी वा आवाजक बैठब',
      caution_n_desc: 'तीन सप्ताह सं बेसी खांसी वा आवाज में भारीपन रहब।',

      news_eyebrow: 'समाचार',
      news_title: 'मीडिया, समाचार आ प्रेरणादायक संस्मरण',
      news_lead: 'स्वास्थ्य मार्गदर्शिका, आगामी शिविरक सूचना आ कैंसर के हराबय बला वीरक कथा पढ़ू।',
      filter_all: 'सभ अपडेट',
      filter_edu: 'शैक्षणिक',
      filter_news: 'समाचार',
      filter_stories: 'उम्मीदक कथा',
      btn_read_more: 'पूरा पढ़ू',
      btn_watch_video: 'वीडियो देखू',

      advisory_eyebrow: 'हमर नेतृत्व',
      advisory_title: 'सलाहकार परिषद',
      advisory_sub: 'वरिष्ठ कैंसर विशेषज्ञ, स्वास्थ्य प्रशासक आ समाजसेवी लोकनिक मार्गदर्शन।',

      cert_eyebrow: 'पारदर्शिता',
      cert_title: 'पंजीकरण प्रमाण पत्र',
      cert_sub: 'बीसीसीओ पूर्ण निष्ठा आ 12A, 80G एवं CSR प्रमाणन संग संचालित अछि।',
      cert_download: 'डाउनलोड करू',
      cert_view: 'दस्तावेज देखू',

      career_eyebrow: 'हमरा सं जुड़ू',
      career_title: 'करियर आ स्वयंसेवा',
      career_sub: 'बिहारक समाजक सेवा लेल हमर टीम सं जुड़ू। डॉक्टर, स्वयंसेवक आ परामर्शदाताक स्वागत अछि।',
      form_name: 'पूरा नाम',
      form_email: 'ईमेल',
      form_phone: 'फोन / व्हाट्सएप',
      form_role: 'रुचिक क्षेत्र',
      form_message: 'संदेश',
      form_submit: 'आवेदन पठाउ',

      contact_eyebrow: 'हम अहांक संग छी',
      contact_title: 'हमरा सं संपर्क करू',
      contact_sub: 'कोनो सेहो जानकारी लेल पटना स्थित हमर कार्यालय सं निसंकोच संपर्क करू।',
      contact_office_title: 'पटना पंजीकृत कार्यालय',
      contact_office_addr: 'वार्ड नं. 8, सत्यभा निवास, आईएएस नगर, पटेल भवनक बगल में, पटना, बिहार - 800023',
      contact_helpline_title: 'हेल्पलाइन आ व्हाट्सएप',
      contact_landline_title: 'कार्यालय लैंडलाइन',
      contact_email_title: 'आधिकारिक ईमेल',
      contact_btn_send: 'संदेश पठाउ',

      donate_title: 'कैंसर मरीजक लेल सहयोग करू',
      donate_sub: 'अहांक छोट सहयोग सं गरीब मरीजक निःशुल्क जांच आ दवाईक व्यवस्था होइत अछि।',
      donate_bank_name: 'बैंक: भारतीय स्टेट बैंक (SBI)',
      donate_acc_name: 'खाता नाम: बिहार कैंसर केयर ऑर्गनाइजेशन',
      donate_acc_no: 'खाता संख्या: 44908340531',
      donate_ifsc: 'IFSC कोड: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: '80G के अंतर्गत सभ दान आयकर सं मुक्त अछि।',
      donate_btn_copy: 'खाता विवरण कॉपी करू',
      donate_copied: 'कॉपी भ गेल!',

      lang_selector_title: 'भाषा चुनू / Select Language',
      lang_selector_sub: 'केवल भारतीय भाषा • 22 अनुसूचित भाषा + भारतीय अंग्रेजी',
      lang_search_placeholder: 'भारतीय भाषा खोजू (उदा. मैथिली, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'स्वचालित पहचान (ब्राउज़र डिफ़ॉल्ट)',
      lang_auto_detected: 'ब्राउज़र सं पहिचानल: ',
      lang_enable: 'सक्रिय करू',
      lang_active: 'सक्रिय',
      lang_empty: 'अहांक खोजक अनुसार कोनो भारतीय भाषा नहि भेटल।',
      lang_footer_note: 'अहांक भाषा प्राथमिकता सुरक्षित राखल जाएत अछि।',

      footer_desc: 'बिहार कैंसर केयर ऑर्गनाइजेशन बिहार भर में कैंसरक रोकथाम, प्रारंभिक पहचान आ मरीजक सहयोग लेल समर्पित अछि।',
      footer_links: 'शीघ्र लिंक',
      footer_helplines: 'हेल्पलाइन',
      footer_disclaimer: 'चिकित्सीय सूचना: ई जानकारी मात्र जागरूकता लेल अछि, चिकित्सीय परामर्शक विकल्प नहि अछि।',
      footer_rights: 'सर्वाधिकार सुरक्षित। बिहार कैंसर केयर ऑर्गनाइजेशन (BCCO).'
    },

    // ------------------------------------------------------------------------
    // BENGALI (বাংলা)
    // ------------------------------------------------------------------------
    'bn': {
      nav_home: 'মূল পাতা',
      nav_cancer: 'ক্যান্সার জানুন',
      nav_news: 'মিডিয়া ও সংবাদ',
      nav_advisory: 'উপদেষ্টা পরিষদ',
      nav_certificates: 'নিবন্ধন শংসাপত্র',
      nav_careers: 'ক্যারিয়ার ও স্বেচ্ছাসেবক',
      nav_contact: 'যোগাযোগ',
      nav_donate: 'দান করুন',
      nav_donate_support: 'দান করুন · আমাদের মিশনে পাশে থাকুন',
      skip_link: 'মূল বিষয়বস্তুতে যান',
      brand_name: 'বিহার ক্যান্সার কেয়ার অর্গানাইজেশন',
      brand_slogan: 'সেবা • আশা • জীবন',

      hero_eyebrow: 'বিহার ক্যান্সার কেয়ার অর্গানাইজেশন',
      hero_title_1: 'সচেতনতা প্রথমে।',
      hero_title_2: 'সমর্থন সর্বদা।',
      hero_sub: 'প্রাথমিক পর্যায়ে রোগ নির্ণয় শুরু হয় সচেতনতা দিয়ে। বিসিসিও বিহারের মানুষের কাছে ক্যান্সারের সঠিক তথ্য পৌঁছে দিতে, প্রাথমিক লক্ষণ চিহ্নিত করতে এবং রোগী ও পরিবারের পাশে দাঁড়াতে কাজ করছে।',
      hero_cta_learn: 'ক্যান্সার সম্পর্কে জানুন',
      hero_cta_initiatives: 'আমাদের উদ্যোগ',
      hero_cta_contact: 'যোগাযোগ করুন',
      hero_trust_guidance: 'বিনামূল্যে ও গোপনীয় পরামর্শ',
      hero_trust_local: 'স্থানীয় ভাষায় সচেতনতা',
      hero_trust_families: 'পরিবারের সার্বক্ষণিক পাশে',

      stat_camps_num: '১২০+',
      stat_camps_label: 'বিনামূল্যে সচেতনতা শিবির',
      stat_camps_sub: 'বিহারের বিভিন্ন জেলায় অনুষ্ঠিত',
      stat_families_num: '৪,৫০০+',
      stat_families_label: 'সহায়তাপ্রাপ্ত পরিবার',
      stat_families_sub: 'বিনামূল্যে গোপনীয় পরামর্শ',
      stat_districts_num: '৩৮',
      stat_districts_label: 'বিহারের জেলাসমূহ',
      stat_districts_sub: 'সক্রিয় তৃণমূল কর্মসূচি',
      stat_helpline_num: '২৪/৭',
      stat_helpline_label: 'সহায়তা হেল্পলাইন',
      stat_helpline_sub: 'সহমর্মিতাপূর্ণ সহায়তা',

      about_eyebrow: 'আমাদের উদ্দেশ্য',
      about_title: 'ভয়কে জ্ঞানে এবং একাকীত্বকে আপনজনে রূপান্তর',
      about_lead: 'ক্যান্সার ধরা পড়লে পরিবারে নেমে আসে ভয় ও অনিশ্চয়তা। প্রাথমিক লক্ষণ জানা থাকলে অধিকাংশ ক্যান্সার নিরাময় সম্ভব। বিসিসিও সচেতনতা ও সঠিক চিকিৎসার পথ দেখায়।',
      init_1_title: 'প্রাথমিক সচেতনতা শিবির',
      init_1_desc: 'বিহারের প্রত্যন্ত গ্রাম ও শহরে কুসংস্কারমুক্ত সঠিক স্বাস্থ্যবার্তা পৌঁছে দেওয়া।',
      init_2_title: 'রোগী সহায়িকা সেবা',
      init_2_desc: 'নতুন রোগীদের সঠিক হাসপাতাল ও যোগ্য ক্যান্সার চিকিৎসকের কাছে দ্রুত পৌঁছাতে সাহায্য করা।',
      init_3_title: 'সরকারি প্রকল্প সহায়তা',
      init_3_desc: 'আয়ুষ্মান ভারত ও মুখ্যমন্ত্রী চিকিৎসা তহবিলের সুবিধা পেতে দরিদ্র পরিবারকে সহায়তা।',
      init_4_title: 'পরিচর্যাকারীর সহায়তা',
      init_4_desc: 'রোগীর পাশে থাকা পরিবারের সদস্যদের মানসিক ও নৈতিক সমর্থন প্রদান।',

      cancer_eyebrow: 'ক্যান্সার নির্দেশিকা',
      cancer_title: 'ক্যান্সারকে জানুন: লক্ষণ, স্ক্রিনিং ও পদক্ষেপ',
      cancer_lead: 'ক্যান্সার মানেই জীবনের শেষ নয়। প্রাথমিক অবস্থায় ধরা পড়লে অনেক ক্যান্সার সম্পূর্ণ নিরাময়যোগ্য। নিচে প্রধান সতর্ক সংকেতগুলো জানুন।',
      caution_heading: 'ক্যান্সারের ৭টি প্রধান সতর্কতা লক্ষণ (C.A.U.T.I.O.N.)',
      caution_c_title: 'মল বা মূত্রত্যাগের অভ্যাসে দীর্ঘস্থায়ী পরিবর্তন',
      caution_c_desc: 'দুই সপ্তাহের বেশি সময় ধরে ডায়রিয়া, কোষ্ঠকাঠিন্য বা মলমূত্রের অস্বাভাবিক পরিবর্তন।',
      caution_a_title: 'মুখ বা ত্বকের ঘা যা সহজে শুকায় না',
      caution_a_desc: 'মুখে সাদা বা লাল দাগ, দীর্ঘস্থায়ী ঘা, বিশেষ করে তামাক বা গুটখা ব্যবহারকারীদের ক্ষেত্রে।',
      caution_u_title: 'অস্বাভাবিক রক্তপাত বা স্রাব',
      caution_u_desc: 'মাসিক ছাড়া রক্তপাত, মেনোপজের পর রক্তপাত, কাশিতে বা প্রস্রাবে রক্ত দেখা দেওয়া।',
      caution_t_title: 'স্তনে বা শরীরের কোথাও চাকা বা পিণ্ড',
      caution_t_desc: 'স্তন, গলা বা বগলে কোনো ব্যথাহীন বা শক্ত চাকা যা মিলিয়ে যাচ্ছে না।',
      caution_i_title: 'খাবার গিলতে কষ্ট বা অজীর্ণতা',
      caution_i_desc: 'খাবার আটকে যাওয়া, ক্রমাগত বুকজ্বালা বা হজমের সমস্যা।',
      caution_o_title: 'তিল বা আঁচিলের আকার-রঙে স্পষ্ট পরিবর্তন',
      caution_o_desc: 'আঁচিল দ্রুত বড় হওয়া, রঙ গাঢ় হওয়া বা চুলকানি ও রক্তপাত হওয়া।',
      caution_n_title: 'ক্রমাগত কাশি বা কণ্ঠস্বরের পরিবর্তন',
      caution_n_desc: 'তিন সপ্তাহের বেশি স্থায়ী কাশি বা ভাঙা কণ্ঠস্বর।',

      news_eyebrow: 'খবরাখবর',
      news_title: 'মিডিয়া, সংবাদ ও আশার গল্প',
      news_lead: 'স্বাস্থ্য নির্দেশিকা, সচেতনতামূলক কর্মসূচির খবর এবং ক্যান্সারজয়ের বাস্তব গল্প পড়ুন।',
      filter_all: 'সকল আপডেট',
      filter_edu: 'শিক্ষামূলক',
      filter_news: 'সংবাদ',
      filter_stories: 'আশার গল্প',
      btn_read_more: 'সম্পূর্ণ পড়ুন',
      btn_watch_video: 'ভিডিও দেখুন',

      advisory_eyebrow: 'আমাদের পরিচালনা',
      advisory_title: 'উপদেষ্টা পরিষদ ও পরামর্শদাতা',
      advisory_sub: 'বরিষ্ঠ ক্যান্সার বিশেষজ্ঞ ও জনস্বাস্থ্যবিদদের দিকনির্দেশনায় পরিচালিত।',

      cert_eyebrow: 'স্বচ্ছতা ও বিশ্বাস',
      cert_title: 'সরকারি নিবন্ধন ও অনুমোদন',
      cert_sub: 'বিসিসিও সম্পূর্ণ স্বচ্ছতার সাথে নিবন্ধিত ট্রাস্ট, 12A, 80G এবং CSR সনদপ্রাপ্ত।',
      cert_download: 'সনদ ডাউনলোড করুন',
      cert_view: 'নথি দেখুন',

      career_eyebrow: 'আমাদের সাথে যোগ দিন',
      career_title: 'ক্যারিয়ার ও স্বেচ্ছাসেবক সুযোগ',
      career_sub: 'ক্যান্সারমুক্ত সমাজ গঠনে আমাদের সাথে কাজ করুন। চিকিৎসক, পরামর্শদাতা ও তরুণ স্বেচ্ছাসেবক আমন্ত্রিত।',
      form_name: 'সম্পূর্ণ নাম',
      form_email: 'ইমেল',
      form_phone: 'ফোন / হোয়াটসঅ্যাপ',
      form_role: 'আগ্রহের ক্ষেত্র',
      form_message: 'বার্তা',
      form_submit: 'আবেদন পাঠান',

      contact_eyebrow: 'আমরা আপনার পাশে',
      contact_title: 'আমাদের সাথে যোগাযোগ করুন',
      contact_sub: 'রোগের লক্ষণ বা হাসপাতাল সংক্রান্ত যেকোনো তথ্যের জন্য পাটনা অফিসে যোগাযোগ করুন।',
      contact_office_title: 'পাটনা নিবন্ধিত কার্যালয়',
      contact_office_addr: 'ওয়ার্ড নং ৮, সত্যভা নিবাস, আইএএস নগর, প্যাটেল ভবনের পাশে, পাটনা, বিহার - ৮০০০২৩',
      contact_helpline_title: 'হেল্পলাইন ও হোয়াটসঅ্যাপ',
      contact_landline_title: 'অফিস ল্যান্ডলাইন',
      contact_email_title: 'অফিসিয়াল ইমেল',
      contact_btn_send: 'বার্তা পাঠান',

      donate_title: 'বিহারের ক্যান্সার রোগীদের সাহায্য করুন',
      donate_sub: 'আপনার অনুদান অসহায় পরিবারের বিনামূল্যে চিকিৎসা ও ওষুধে ব্যয় হয়।',
      donate_bank_name: 'ব্যাংক: স্টেট ব্যাংক অফ ইন্ডিয়া (SBI)',
      donate_acc_name: 'হিসাবের নাম: বিহার ক্যান্সার কেয়ার অর্গানাইজেশন',
      donate_acc_no: 'হিসাব নম্বর: 44908340531',
      donate_ifsc: 'IFSC কোড: SBIN0009004',
      donate_upi: 'UPI আইডি: biharcancercareorganisation@sbi',
      donate_tax_info: 'আয়কর আইনের 80G ধারায় সকল দান করমুক্ত।',
      donate_btn_copy: 'হিসাব বিবরণ কপি করুন',
      donate_copied: 'কপি করা হয়েছে!',

      lang_selector_title: 'ভাষা নির্বাচন / Select Language',
      lang_selector_sub: 'শুধুমাত্র ভারতীয় ভাষা • ২২টি তফসিলি ভাষা + ভারতীয় ইংরেজি',
      lang_search_placeholder: 'ভারতীয় ভাষা খুঁজুন (যেমন বাংলা, हिन्दी, தமிழ், मैथिली)...',
      lang_auto_btn: 'স্বয়ংক্রিয় সনাক্তকরণ (ব্রাউজার ডিফল্ট)',
      lang_auto_detected: 'ব্রাউজার থেকে সনাক্ত: ',
      lang_enable: 'সক্রিয় করুন',
      lang_active: 'সক্রিয়',
      lang_empty: 'আপনার সন্ধানের সাথে কোনো ভারতীয় ভাষা মিলছে না।',
      lang_footer_note: 'ভাষা পছন্দটি নিরাপদে সংরক্ষিত থাকে। আন্তর্জাতিক ভাষা অন্তর্ভুক্ত নয়।',

      footer_desc: 'বিহার ক্যান্সার কেয়ার অর্গানাইজেশন ক্যান্সার প্রতিরোধ ও রোগীর মানবিক সহযোগিতায় নিয়োজিত।',
      footer_links: 'গুরুত্বপূর্ণ লিঙ্ক',
      footer_helplines: 'সহায়তা হেল্পলাইন',
      footer_disclaimer: 'চিকিৎসা তথ্য: এই সাইটের সকল তথ্য শুধুমাত্র জনসচেতনতার উদ্দেশ্যে। এটি চিকিৎসকের পরামর্শের বিকল্প নয়।',
      footer_rights: 'সর্বস্বত্ব সংরক্ষিত। বিহার ক্যান্সার কেয়ার অর্গানাইজেশন (BCCO).'
    },

    // ------------------------------------------------------------------------
    // URDU (اردو) - RTL Support
    // ------------------------------------------------------------------------
    'ur': {
      nav_home: 'مرکزی صفحہ',
      nav_cancer: 'کینسر کو جانیں',
      nav_news: 'میڈیا اور خبریں',
      nav_advisory: 'مشاورتی بورڈ',
      nav_certificates: 'رجسٹریشن سرٹیفکیٹس',
      nav_careers: 'کیریئر اور رضاکارانہ خدمات',
      nav_contact: 'ہم سے رابطہ کریں',
      nav_donate: 'عطیہ دیں',
      nav_donate_support: 'عطیہ دیں · ہمارے مشن کا ساتھ دیں',
      skip_link: 'براہ راست مواد پر جائیں',
      brand_name: 'بہار کینسر کیئر آرگنائزیشن',
      brand_slogan: 'دیکھ بھال • امید • زندگی',

      hero_eyebrow: 'بہار کینسر کیئر آرگنائزیشن',
      hero_title_1: 'بیداری پہلے۔',
      hero_title_2: 'مدد ہمیشہ۔',
      hero_sub: 'ابتدائی تشخیص کا آغاز آگاہی سے ہوتا ہے۔ بی سی سی او بہار کے عوام کو کینسر کی علامات کو وقت پر پہچاننے اور مریضوں اور ان کے اہل خانہ کو ہر قدم پر رہنمائی فراہم کرنے میں مدد کرتا ہے۔',
      hero_cta_learn: 'کینسر کے بارے میں جانیں',
      hero_cta_initiatives: 'ہمارے اقدامات',
      hero_cta_contact: 'رابطہ کریں',
      hero_trust_guidance: 'مفت اور خفیہ رہنمائی',
      hero_trust_local: 'مقامی زبان میں آگاہی',
      hero_trust_families: 'خاندانوں کا مستقل ساتھ',

      stat_camps_num: '120+',
      stat_camps_label: 'مفت آگاہی کیمپس',
      stat_camps_sub: 'بہار کے مختلف اضلاع میں منعقد',
      stat_families_num: '4,500+',
      stat_families_label: 'رہنمائی پانے والے خاندان',
      stat_families_sub: 'مفت خفیہ کونسلنگ',
      stat_districts_num: '38',
      stat_districts_label: 'بہار کے تمام 38 اضلاع',
      stat_districts_sub: 'بنیادی سطح پر آگاہی مہم',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'ہیلپ لائن سپورٹ',
      stat_helpline_sub: 'ہمدردانہ مدد',

      about_eyebrow: 'ہمارا مقصد',
      about_title: 'خوف کو علم میں اور تنہائی کو سہارے میں بدلنا',
      about_lead: 'کینسر کی تشخیص خاندان میں پریشانی کا باعث بنتی ہے۔ وقت پر علامات کی پہچان زندگی بچا سکتی ہے۔ بی سی سی او زمینی آگاہی اور ہسپتال رہنمائی فراہم کرتا ہے۔',
      init_1_title: 'ابتدائی آگاہی کیمپس',
      init_1_desc: 'دیہاتوں اور بستیوں تک کینسر کے اسباب اور علامات کی آسان زبان میں معلومات پہنچانا۔',
      init_2_title: 'مریض رہنمائی سروس',
      init_2_desc: 'نئے مریضوں کو بغیر کسی تاخیر کے صحیح ہسپتال اور ڈاکٹر تک پہنچانے میں رہنمائی۔',
      init_3_title: 'سرکاری اسکیموں میں مدد',
      init_3_desc: 'آیوشمان بھارت اور وزیراعلیٰ ریلیف فنڈ سے علاج کے اخراجات حاصل کرنے میں مدد۔',
      init_4_title: 'دیکھ بھال کرنے والوں کی مدد',
      init_4_desc: 'مریض کی تیمارداری کرنے والے اہل خانہ کو ذہنی اور جذباتی سہارا دینا۔',

      cancer_eyebrow: 'کینسر گائیڈ',
      cancer_title: 'کینسر کو سمجھیں: علامات، اسکریننگ اور اقدامات',
      cancer_lead: 'کینسر ناممکن علاج نہیں ہے۔ ابتدائی مرحلے میں پہچان ہونے پر مکمل شفا ممکن ہے۔ مندرجہ ذیل 7 اہم علامات پر توجہ دیں۔',
      caution_heading: 'کینسر کی 7 بنیادی علامات (C.A.U.T.I.O.N.)',
      caution_c_title: 'رفع حاجت یا پیشاب کی عادات میں مستقل تبدیلی',
      caution_c_desc: 'دو ہفتے سے زیادہ اسہال، قبض یا رنگت میں تبدیلی۔',
      caution_a_title: 'منہ یا جلد کا زخم جو جلدی نہ بھرے',
      caution_a_desc: 'منہ میں چھالے، سفید یا سرخ داغ، خاص طور پر گٹکھا یا تمباکو کھانے والوں میں۔',
      caution_u_title: 'غیر معمولی خون کا اخراج',
      caution_u_desc: 'کھانسی، پیشاب، یا پاخانے میں خون آنا، یا خواتین میں غیر معمولی خون کا اخراج۔',
      caution_t_title: 'چھاتی، گردن یا جسم میں کوئی گانٹھ',
      caution_t_desc: 'چھاتی یا بغل میں ایسی بے درد یا سخت گلٹی جو غائب نہ ہو۔',
      caution_i_title: 'کھانا نگلنے میں دشواری یا بدہضمی',
      caution_i_desc: 'خوراک کا حلق میں اٹکنا یا مسلسل تیزابیت۔',
      caution_o_title: 'تل یا مسے کے سائز اور رنگ میں تبدیلی',
      caution_o_desc: 'تل کا تیزی سے بڑا ہونا یا اس سے خون آنا۔',
      caution_n_title: 'مسلسل کھانسی یا آواز کا بیٹھنا',
      caution_n_desc: 'تین سے چار ہفتے سے زیادہ پرانی کھانسی یا گلے کی خرابی۔',

      news_eyebrow: 'تازہ ترین خبریں',
      news_title: 'میڈیا، خبریں اور حوصلہ افزا کہانیاں',
      news_lead: 'صحت کے متعلق مضامین اور کینسر کو شکست دینے والوں کے واقعات پڑھیں۔',
      filter_all: 'تمام اپڈیٹس',
      filter_edu: 'تعلیمی مضامین',
      filter_news: 'خبریں و کیمپس',
      filter_stories: 'امید کی کہانیاں',
      btn_read_more: 'پورا مضمون پڑھیں',
      btn_watch_video: 'ویڈیو دیکھیں',

      advisory_eyebrow: 'ہماری قیادت',
      advisory_title: 'مشاورتی بورڈ اور سرپرست',
      advisory_sub: 'سینئر کینسر ماہرین اور صحت کے رہنماؤں کی زیر نگرانی۔',

      cert_eyebrow: 'شفافیت',
      cert_title: 'سرکاری رجسٹریشن اور اسناد',
      cert_sub: 'بی سی سی او 12A، 80G اور CSR سرٹیفیکیشن کے ساتھ مکمل شفافیت کے ساتھ کام کرتا ہے۔',
      cert_download: 'سرٹیفکیٹ ڈاؤن لوڈ کریں',
      cert_view: 'دستاویز دیکھیں',

      career_eyebrow: 'ہمارے ساتھ شامل ہوں',
      career_title: 'کیریئر اور رضاکارانہ مواقع',
      career_sub: 'بہار میں کینسر سے آگاہی پھیلانے میں ہمارا حصہ بنیں۔ ڈاکٹروں اور نوجوانوں کا خیر مقدم ہے۔',
      form_name: 'پورا نام',
      form_email: 'ای میل پتہ',
      form_phone: 'فون / واٹس ایپ نمبر',
      form_role: 'دلچسپی کا شعبہ',
      form_message: 'پیغام',
      form_submit: 'درخواست جمع کروائیں',

      contact_eyebrow: 'ہم آپ کے ساتھ ہیں',
      contact_title: 'ہماری ہیلپ ٹیم سے رابطہ کریں',
      contact_sub: 'کسی بھی سوال یا رہنمائی کے لیے پٹنہ میں ہمارے دفتر سے رابطہ کریں۔',
      contact_office_title: 'پٹنہ رجسٹرڈ دفتر',
      contact_office_addr: 'وارڈ نمبر 8، ستیابھا نواس، آئی اے ایس نگر، پٹیل بھون کے پاس، پٹنہ، بہار - 800023',
      contact_helpline_title: 'ہیلپ لائن اور واٹس ایپ',
      contact_landline_title: 'دفتر لینڈ لائن',
      contact_email_title: 'سرکاری ای میل',
      contact_btn_send: 'پیغام بھیجیں',

      donate_title: 'کینسر کے مریضوں کی مدد کریں',
      donate_sub: 'آپ کا عطیہ غریب مریضوں کے لیے مفت علاج، ادویات اور کیمپس کے انتظام میں استعمال ہوتا ہے۔',
      donate_bank_name: 'بینک: اسٹیٹ بینک آف انڈیا (SBI)',
      donate_acc_name: 'کھاتہ نام: بہار کینسر کیئر آرگنائزیشن',
      donate_acc_no: 'کھاتہ نمبر: 44908340531',
      donate_ifsc: 'IFSC کوڈ: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: 'انکم ٹیکس ایکٹ کی دفعہ 80G کے تحت تمام عطیات ٹیکس فری ہیں۔',
      donate_btn_copy: 'بینک تفصیلات کاپی کریں',
      donate_copied: 'کاپی ہو گیا!',

      lang_selector_title: 'زبان منتخب کریں / Select Language',
      lang_selector_sub: 'صرف ہندوستانی زبانیں • 22 قومی زبانیں + ہندوستانی انگریزی',
      lang_search_placeholder: 'ہندوستانی زبان تلاش کریں (مثلاً اردو, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'خودکار شناخت (براؤزر ڈیفالٹ)',
      lang_auto_detected: 'براؤزر سے شناخت شدہ: ',
      lang_enable: 'فعال کریں',
      lang_active: 'فعال',
      lang_empty: 'آپ کی تلاش کے مطابق کوئی ہندوستانی زبان نہیں ملی۔',
      lang_footer_note: 'آپ کا انتخاب محفوظ رہتا ہے۔ بین الاقوامی زبانیں شامل نہیں ہیں۔',

      footer_desc: 'بہار کینسر کیئر آرگنائزیشن بہار میں کینسر سے بچاؤ اور مریضوں کی خدمت کے لیے وقف ہے۔',
      footer_links: 'اہم روابط',
      footer_helplines: 'ہیلپ لائنز',
      footer_disclaimer: 'طبی انتباہ: اس ویب سائٹ کی معلومات صرف آگاہی کے لیے ہیں اور ڈاکٹر کے مشورے کا متبادل نہیں ہیں۔',
      footer_rights: 'جملہ حقوق محفوظ ہیں۔ بہار کینسر کیئر آرگنائزیشن (BCCO).'
    },

    // ------------------------------------------------------------------------
    // TAMIL (தமிழ்)
    // ------------------------------------------------------------------------
    'ta': {
      nav_home: 'முகப்பு',
      nav_cancer: 'புற்றுநோய் பற்றி அறிக',
      nav_news: 'ஊடகம் & செய்திகள்',
      nav_advisory: 'ஆலோசனை குழு',
      nav_certificates: 'பதிவு சான்றிதழ்கள்',
      nav_careers: 'வேலைவாய்ப்பு & தன்னார்வம்',
      nav_contact: 'தொடர்பு கொள்ள',
      nav_donate: 'நன்கொடை',
      nav_donate_support: 'நன்கொடை · எங்கள் பணிகளுக்கு ஆதரவளியுங்கள்',
      skip_link: 'முக்கிய பகுதிக்கு செல்லவும்',
      brand_name: 'பீகார் கேன்சர் கேர் அமைப்பு',
      brand_slogan: 'பரிவு • நம்பிக்கை • வாழ்வு',

      hero_eyebrow: 'பீகார் கேன்சர் கேர் அமைப்பு',
      hero_title_1: 'விழிப்புணர்வு முதலில்.',
      hero_title_2: 'ஆதரவு எப்போதும்.',
      hero_sub: 'முன்கூட்டியே கண்டறிதல் விழிப்புணர்வில் தொடங்குகிறது. புற்றுநோயைப் புரிந்துகொள்ளவும், ஆரம்ப அறிகுறிகளைக் கண்டறியவும், நோயாளிகள் மற்றும் குடும்பங்களுக்கு ஆதரவளிக்கவும் பிசிசிஓ செயல்படுகிறது.',
      hero_cta_learn: 'புற்றுநோய் பற்றி அறிய',
      hero_cta_initiatives: 'எங்கள் திட்டங்கள்',
      hero_cta_contact: 'தொடர்பு கொள்ள',
      hero_trust_guidance: 'இலவச இரகசிய ஆலோசனை',
      hero_trust_local: 'சொந்த மொழியில் விழிப்புணர்வு',
      hero_trust_families: 'குடும்பங்களுக்கு நிரந்தர ஆதரவு',

      stat_camps_num: '120+',
      stat_camps_label: 'இலவச விழிப்புணர்வு முகாம்கள்',
      stat_camps_sub: 'பீகாரின் பல்வேறு மாவட்டங்களில்',
      stat_families_num: '4,500+',
      stat_families_label: 'வழிகாட்டப்பட்ட குடும்பங்கள்',
      stat_families_sub: 'இலவச உளவியல் ஆலோசனை',
      stat_districts_num: '38',
      stat_districts_label: 'பீகாரின் 38 மாவட்டங்கள்',
      stat_districts_sub: 'களப்பணி திட்டங்கள்',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'உதவி எண் மையம்',
      stat_helpline_sub: 'அன்பான உதவி',

      about_eyebrow: 'எங்கள் நோக்கம்',
      about_title: 'பயத்தை விழிப்புணர்வாகவும் தனிமையை ஆதரவாகவும் மாற்றுதல்',
      about_lead: 'புற்றுநோய் கண்டறியப்படும் போது குடும்பத்தில் அச்சமும் குழப்பமும் ஏற்படுகிறது. ஆரம்ப அறிகுறிகளை அறிவது உயிரைக் காக்கும். பிசிசிஓ மருத்துவ வழிகாட்டுதலையும் உறுதுணையையும் வழங்குகிறது.',
      init_1_title: 'ஆரம்ப விழிப்புணர்வு முகாம்கள்',
      init_1_desc: 'கிராமப்புற மக்களிடம் அறிகுறிகள் மற்றும் தற்காப்பு பற்றிய தெளிவான வழிகாட்டுதல்.',
      init_2_title: 'நோயாளி வழிகாட்டுதல்',
      init_2_desc: 'சரியான மருத்துவமனை மற்றும் புற்றுநோய் நிபுணர்களை காலதாமதமின்றி அணுக உதவி.',
      init_3_title: 'அரசு நலத்திட்ட உதவி',
      init_3_desc: 'ஆயுஷ்மான் பாரத் மற்றும் முதலமைச்சர் நிவாரண நிதி பெற எளிய குடும்பங்களுக்கு உதவி.',
      init_4_title: 'பராமரிப்பாளர் ஆதரவு',
      init_4_desc: 'நோயாளியை கவனித்துக் கொள்ளும் குடும்பத்தினருக்கு மனோரீதியான ஆறுதல் அளித்தல்.',

      cancer_eyebrow: 'புற்றுநோய் கையேடு',
      cancer_title: 'புற்றுநோயைப் புரிந்து கொள்ளுதல்: அறிகுறிகள் & பரிசோதனை',
      cancer_lead: 'புற்றுநோய் என்றதும் நம்பிக்கை இழக்க வேண்டியதில்லை. ஆரம்ப கட்டத்தில் கண்டறிந்தால் முழுமையாக குணப்படுத்த முடியும். முக்கிய 7 அறிகுறிகளை கவனியுங்கள்.',
      caution_heading: 'புற்றுநோயின் 7 முக்கிய எச்சரிக்கை அறிகுறிகள் (C.A.U.T.I.O.N.)',
      caution_c_title: 'மலம் அல்லது சிறுநீர் கழிக்கும் பழக்கத்தில் தொடர் மாற்றம்',
      caution_c_desc: 'இரண்டு வாரங்களுக்கு மேலாக தொடரும் பேதி, மலச்சிக்கல் அல்லது நிற மாற்றம்.',
      caution_a_title: 'குணமாகாத வாய் அல்லது தோல் புண்',
      caution_a_desc: 'வாயில் வெள்ளை அல்லது சிவப்பு திட்டுக்கள், குறிப்பாக புகையிலை பயன்படுத்துவோருக்கு.',
      caution_u_title: 'அசாதாரண இரத்தப்போக்கு அல்லது கசிவு',
      caution_u_desc: 'மாதவிடாய் அல்லாத நேரங்களில் இரத்தப்போக்கு, இருமலில் அல்லது சிறுநீரில் இரத்தம்.',
      caution_t_title: 'மார்பகம் அல்லது உடலில் தோன்றும் கட்டி',
      caution_t_desc: 'மார்பகம், கழுத்து அல்லது அக்குளில் வலியற்ற ஆனால் மறையாத கட்டி.',
      caution_i_title: 'உணவு விழுங்குவதில் சிரமம் அல்லது செரிமானமின்மை',
      caution_i_desc: 'உணவு தொண்டையில் சிக்குவது போன்ற உணர்வு அல்லது தீராத நெஞ்செரிச்சல்.',
      caution_o_title: 'மச்சம் அல்லது மருவின் நிறம்-அளவில் மாற்றம்',
      caution_o_desc: 'மச்சம் வேகமாக பெருகுவது அல்லது அதிலிருந்து இரத்தம் கசிவது.',
      caution_n_title: 'தொடர் இருமல் அல்லது குரல் மாற்றம்',
      caution_n_desc: 'மூன்று வாரங்களுக்கு மேலான இருமல் அல்லது கரகரத்த குரல்.',

      news_eyebrow: 'செய்திகள்',
      news_title: 'ஊடகம், செய்திகள் மற்றும் நம்பிக்கைக் கதைகள்',
      news_lead: 'மருத்துவக் கட்டுரைகள், முகாம் அறிவிப்புகள் மற்றும் புற்றுநோயை வென்றவர்களின் அனுபவங்கள்.',
      filter_all: 'அனைத்து தகவல்களும்',
      filter_edu: 'கல்விசார்',
      filter_news: 'செய்திகள்',
      filter_stories: 'நம்பிக்கைக் கதைகள்',
      btn_read_more: 'முழுவதும் படிக்க',
      btn_watch_video: 'வீடியோ பார்க்க',

      advisory_eyebrow: 'எங்கள் தலைமை',
      advisory_title: 'ஆலோசனை குழு மற்றும் வழிகாட்டிகள்',
      advisory_sub: 'மூத்த புற்றுநோய் மருத்துவர்கள் மற்றும் சமூக ஆர்வலர்களின் வழிகாட்டுதல்.',

      cert_eyebrow: 'வெளிப்படைத்தன்மை',
      cert_title: 'அரசுப் பதிவுகள் & சான்றிதழ்கள்',
      cert_sub: '12A, 80G மற்றும் CSR அங்கீகாரத்துடன் முழு வெளிப்படைத்தன்மையுடன் செயல்படுகிறது.',
      cert_download: 'பதிவிறக்கம் செய்க',
      cert_view: 'ஆவணத்தைப் பார்க்க',

      career_eyebrow: 'இணையுங்கள்',
      career_title: 'வேலைவாய்ப்பு & தன்னார்வலர் வாய்ப்புகள்',
      career_sub: 'புற்றுநோய் விழிப்புணர்வு பணியில் எங்களுடன் இணையுங்கள். மருத்துவர்கள், தன்னார்வலர்கள் வரவேற்கப்படுகிறார்கள்.',
      form_name: 'முழு பெயர்',
      form_email: 'மின்னஞ்சல் முகவரி',
      form_phone: 'தொலைபேசி / வாட்ஸ்அப்',
      form_role: 'ஆர்வமுள்ள பிரிவு',
      form_message: 'செய்தி',
      form_submit: 'விண்ணப்பிக்க',

      contact_eyebrow: 'நாங்கள் உங்களுடன் இருக்கிறோம்',
      contact_title: 'எங்கள் குழுவை தொடர்பு கொள்ள',
      contact_sub: 'எந்தவொரு மருத்துவ ஆலோசனை மற்றும் வழிகாட்டலுக்கும் பாட்னா அலுவலகத்தை தொடர்பு கொள்ளவும்.',
      contact_office_title: 'பாட்னா தலைமை அலுவலகம்',
      contact_office_addr: 'வார்டு எண் 8, சத்யபா நிவாஸ், ஐஏஎஸ் நகர், படேல் பவன் அருகில், பாட்னா, பீகார் - 800023',
      contact_helpline_title: 'உதவி எண் & வாட்ஸ்அப்',
      contact_landline_title: 'அலுவலக தொலைபேசி',
      contact_email_title: 'அதிகாரப்பூர்வ மின்னஞ்சல்',
      contact_btn_send: 'செய்தி அனுப்புக',

      donate_title: 'ஏழை புற்றுநோயாளிகளுக்கு உதவுங்கள்',
      donate_sub: 'உங்கள் பங்களிப்பு ஏழை எளிய மக்களின் இலவச பரிசோதனை மற்றும் மருந்துகளுக்கு பயன்படுகிறது.',
      donate_bank_name: 'வங்கி: ஸ்டேட் பாங்க் ஆஃப் இந்தியா (SBI)',
      donate_acc_name: 'கணக்கு பெயர்: பீகார் கேன்சர் கேர் அமைப்பு',
      donate_acc_no: 'கணக்கு எண்: 44908340531',
      donate_ifsc: 'IFSC குறியீடு: SBIN0009004',
      donate_upi: 'UPI ஐடி: biharcancercareorganisation@sbi',
      donate_tax_info: '80G பிரிவின் கீழ் அனைத்து நன்கொடைகளுக்கும் வரிவிலக்கு உண்டு.',
      donate_btn_copy: 'விவரங்களை நகலெடுக்க',
      donate_copied: 'நகலெடுக்கப்பட்டது!',

      lang_selector_title: 'மொழி தேர்வு / Select Language',
      lang_selector_sub: 'இந்திய மொழிகள் மட்டுமே • 22 அங்கீகரிக்கப்பட்ட மொழிகள் + இந்திய ஆங்கிலம்',
      lang_search_placeholder: 'இந்திய மொழியைத் தேடுங்கள் (எ.கா. தமிழ், हिन्दी, বাংলা, తెలుగు)...',
      lang_auto_btn: 'தானியங்கி தேர்வு (உலாவி இயல்புநிலை)',
      lang_auto_detected: 'உலாவியில் கண்டறியப்பட்டது: ',
      lang_enable: 'இயக்கு',
      lang_active: 'செயலில்',
      lang_empty: 'உங்கள் தேடலுக்குரிய இந்திய மொழி காணப்படவில்லை.',
      lang_footer_note: 'தேர்ந்தெடுக்கப்பட்ட மொழி பாதுகாப்பாக சேமிக்கப்படும்.',

      footer_desc: 'பீகார் கேன்சர் கேர் அமைப்பு புற்றுநோய் விழிப்புணர்வு மற்றும் நோயாளி ஆதரவு பணிகளில் அர்ப்பணிப்புடன் செயல்படுகிறது.',
      footer_links: 'முக்கிய இணைப்புகள்',
      footer_helplines: 'உதவி எண்கள்',
      footer_disclaimer: 'மருத்துவ எச்சரிக்கை: இத்தளத்தில் உள்ள தகவல்கள் பொது விழிப்புணர்வுக்கு மட்டுமே, இது மருத்துவ ஆலோசனையல்ல.',
      footer_rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. பீகார் கேன்சர் கேர் அமைப்பு (BCCO).'
    },

    // ------------------------------------------------------------------------
    // MARATHI (मराठी)
    // ------------------------------------------------------------------------
    'mr': {
      nav_home: 'मुख्य पान',
      nav_cancer: 'कर्करोग जाणून घ्या',
      nav_news: 'माध्यमे व बातम्या',
      nav_advisory: 'सल्लागार मंडळ',
      nav_certificates: 'नोंदणी प्रमाणपत्रे',
      nav_careers: 'करिअर आणि स्वयंसेवा',
      nav_contact: 'संपर्क साधा',
      nav_donate: 'दान करा',
      nav_donate_support: 'दान करा · आमच्या कार्यास सहकार्य करा',
      skip_link: 'मुख्य मजकुरावर जा',
      brand_name: 'बिहार कॅन्सर केअर ऑर्गनायझेशन',
      brand_slogan: 'सेवा • आशा • जीवन',

      hero_eyebrow: 'बिहार कॅन्सर केअर ऑर्गनायझेशन',
      hero_title_1: 'जागरूकता प्रथम.',
      hero_title_2: 'सहकार्य सदैव.',
      hero_sub: 'लवकर निदानाची सुरुवात जागरूकतेने होते. बीसीसीओ बिहारमधील नागरिकांना कर्करोग समजून घेण्यासाठी, सुरुवातीची लक्षणे ओळखण्यासाठी आणि रुग्ण व त्यांच्या कुटुंबीयांना सातत्यपूर्ण आधार देण्यासाठी कार्यरत आहे.',
      hero_cta_learn: 'कर्करोगाविषयी जाणून घ्या',
      hero_cta_initiatives: 'आमचे उपक्रम',
      hero_cta_contact: 'संपर्क साधा',
      hero_trust_guidance: 'मोफत व गोपनीय मार्गदर्शन',
      hero_trust_local: 'स्थानिक भाषेत जागरूकता',
      hero_trust_families: 'कुटुंबांना अखंड आधार',

      stat_camps_num: '120+',
      stat_camps_label: 'मोफत तपासणी शिबिरे',
      stat_camps_sub: 'बिहारच्या विविध जिल्ह्यांमध्ये',
      stat_families_num: '4,500+',
      stat_families_label: 'मार्गदर्शन मिळालेली कुटुंबे',
      stat_families_sub: 'मोफत गोपनीय समुपदेशन',
      stat_districts_num: '38',
      stat_districts_label: 'बिहारमधील 38 जिल्हे',
      stat_districts_sub: 'सक्रिय ग्रामीण मोहीम',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'हेल्पलाइन सेवा',
      stat_helpline_sub: 'आपुलकीची मदत',

      about_eyebrow: 'आमचा हेतू',
      about_title: 'भीतीचे ज्ञानात आणि एकाकीपणाचे सहकार्यात रूपांतर',
      about_lead: 'कर्करोगाचे निदान झाल्यावर कुटुंबात भीती निर्माण होते. लक्षणे वेळेत ओळखल्यास बहुतांश कर्करोग पूर्ण बरे होऊ शकतात. बीसीसीओ योग्य मार्गदर्शन व आधार देते.',
      init_1_title: 'प्रारंभिक तपासणी शिबिरे',
      init_1_desc: 'गावोगावी स्पष्ट व भीतीमुक्त भाषेत लक्षणांची माहिती देणे.',
      init_2_title: 'रुग्ण मार्गदर्शन सेवा',
      init_2_desc: 'योग्य रुग्णालय व तज्ज्ञ डॉक्टरांपर्यंत विनाविलंब पोहोचण्यास मदत.',
      init_3_title: 'शासकीय योजना साहाय्य',
      init_3_desc: 'आयुष्मान भारत व मुख्यमंत्री साहाय्यता निधी मिळवून देणे.',
      init_4_title: 'देखभालकर्ता समुपदेशन',
      init_4_desc: 'रुग्णाची काळजी घेणाऱ्या नातेवाईकांना मानसिक बळ देणे.',

      cancer_eyebrow: 'कर्करोग मार्गदर्शक',
      cancer_title: 'कर्करोग समजून घ्या: लक्षणे व तपासणी',
      cancer_lead: 'कर्करोग म्हणजे जीवनाचा शेवट नव्हे. प्राथमिक अवस्थेत निदान झाल्यास त्यावर उपचार शक्य आहेत. खालील ७ मुख्य लक्षणांवर लक्ष ठेवा.',
      caution_heading: 'कर्करोगाची ७ मुख्य धोक्याची लक्षणे (C.A.U.T.I.O.N.)',
      caution_c_title: 'शौचाच्या किंवा मूत्राच्या सवयींमध्ये सततचा बदल',
      caution_c_desc: 'दोन आठवड्यांपेक्षा जास्त काळ जुलाब, बद्धकोष्ठता किंवा मूत्राच्या रंगात बदल.',
      caution_a_title: 'तोंड किंवा त्वचेवरील न भरणारी जखम',
      caution_a_desc: 'तोंडात पांढरे किंवा लाल चट्टे, विशेषतः तंबाखू खाणाऱ्यांमध्ये.',
      caution_u_title: 'असामान्य रक्तस्राव किंवा स्राव',
      caution_u_desc: 'मासिक पाळीव्यतिरिक्त किंवा रजोनिवृत्तीनंतर रक्तस्राव, खोकल्यात रक्त येणे.',
      caution_t_title: 'स्तनात किंवा शरीरावर न दुखणारी गाठ',
      caution_t_desc: 'स्तन, मान किंवा काखेत जाणवणारी घट्ट गाठ जी जात नाही.',
      caution_i_title: 'अन्न गिळताना त्रास किंवा सतत अपचन',
      caution_i_desc: 'अन्न अडकल्यासारखे वाटणे किंवा तीव्र ॲसिडिटी.',
      caution_o_title: 'तीळ किंवा चामखिळीच्या आकारात बदल',
      caution_o_desc: 'तीळ वेगाने वाढणे किंवा त्यातून रक्त येणे.',
      caution_n_title: 'सततचा खोकला किंवा आवाजातील बदल',
      caution_n_desc: 'तीन आठवड्यांपेक्षा जास्त काळ खोकला किंवा घोगरा आवाज.',

      news_eyebrow: 'बातम्या',
      news_title: 'माध्यमे, बातम्या आणि प्रेरणादायी कथा',
      news_lead: 'आरोग्यविषयक लेख आणि कर्करोगावर मात करणाऱ्या लढवय्यांच्या कथा वाचा.',
      filter_all: 'सर्व अपडेट्स',
      filter_edu: 'शैक्षणिक',
      filter_news: 'बातम्या',
      filter_stories: 'उमेद कथा',
      btn_read_more: 'पूर्ण वाचा',
      btn_watch_video: 'व्हिडिओ पहा',

      advisory_eyebrow: 'आमचे नेतृत्व',
      advisory_title: 'सल्लागार परिषद',
      advisory_sub: 'ज्येष्ठ ऑन्कोलॉजिस्ट आणि आरोग्य क्षेत्रातील तज्ज्ञांचे मार्गदर्शन.',

      cert_eyebrow: 'पारदर्शकता',
      cert_title: 'अधिकृत नोंदणी व प्रमाणपत्रे',
      cert_sub: 'बीसीसीओ 12A, 80G आणि CSR प्रमाणपत्रांसह पूर्ण पारदर्शकतेने कार्यरत आहे.',
      cert_download: 'प्रमाणपत्र डाउनलोड करा',
      cert_view: 'कागदपत्र पहा',

      career_eyebrow: 'सहभागी व्हा',
      career_title: 'करिअर आणि स्वयंसेवा',
      career_sub: 'कर्करोगमुक्तीच्या कार्यात आमच्याशी जोडा. डॉक्टर आणि स्वयंसेवकांचे स्वागत आहे.',
      form_name: 'पूर्ण नाव',
      form_email: 'ईमेल',
      form_phone: 'फोन / व्हॉट्सॲप',
      form_role: 'आवडीचे क्षेत्र',
      form_message: 'संदेश',
      form_submit: 'अर्ज सादर करा',

      contact_eyebrow: 'आम्ही सोबत आहोत',
      contact_title: 'आमच्याशी संपर्क साधा',
      contact_sub: 'कोणत्याही मार्गदर्शनासाठी पाटणा येथील आमच्या कार्यालयाशी संपर्क साधा.',
      contact_office_title: 'पाटणा नोंदणीकृत कार्यालय',
      contact_office_addr: 'वॉर्ड क्र. ८, सत्यभा निवास, आयएएस नगर, पटेल भवनाजवळ, पाटणा, बिहार - ८०००२३',
      contact_helpline_title: 'हेल्पलाइन व व्हॉट्सॲप',
      contact_landline_title: 'कार्यालय लँडलाइन',
      contact_email_title: 'अधिकृत ईमेल',
      contact_btn_send: 'संदेश पाठवा',

      donate_title: 'कर्करोग रुग्णांना साहाय्य करा',
      donate_sub: 'तुमचे योगदान गरजू रुग्णांच्या मोफत तपासणी आणि औषधोपचारासाठी वापरले जाते.',
      donate_bank_name: 'बँक: स्टेट बँक ऑफ इंडिया (SBI)',
      donate_acc_name: 'खाते नाव: बिहार कॅन्सर केअर ऑर्गनायझेशन',
      donate_acc_no: 'खाते क्रमांक: 44908340531',
      donate_ifsc: 'IFSC कोड: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: '80G अंतर्गत सर्व देणग्यांवर आयकर सवलत अनुज्ञेय आहे.',
      donate_btn_copy: 'तपशील कॉपी करा',
      donate_copied: 'कॉपी झाले!',

      lang_selector_title: 'भाषा निवडा / Select Language',
      lang_selector_sub: 'केवळ भारतीय भाषा • २२ अधिकृत अनुसूचित भाषा + भारतीय इंग्रजी',
      lang_search_placeholder: 'भारतीय भाषा शोधा (उदा. मराठी, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'स्वयंचलित ओळख (ब्राउझर डीफॉल्ट)',
      lang_auto_detected: 'ब्राउझरवरून ओळखली: ',
      lang_enable: 'सुरू करा',
      lang_active: 'सक्रिय',
      lang_empty: 'आपल्या शोधेशी सुसंगत भारतीय भाषा आढळली नाही.',
      lang_footer_note: 'आपली भाषा निवड सुरक्षित जतन केली जाते.',

      footer_desc: 'बिहार कॅन्सर केअर ऑर्गनायझेशन कर्करोग प्रतिबंध आणि रुग्णसेवेसाठी समर्पित आहे.',
      footer_links: 'महत्त्वाच्या लिंक्स',
      footer_helplines: 'हेल्पलाइन',
      footer_disclaimer: 'वैद्यकीय अस्वीकरण: ही माहिती केवळ जनजागृतीसाठी आहे, वैद्यकीय सल्ल्याचा पर्याय नाही.',
      footer_rights: 'सर्व हक्क राखीव. बिहार कॅन्सर केअर ऑर्गनायझेशन (BCCO).'
    },

    // ------------------------------------------------------------------------
    // TELUGU (తెలుగు)
    // ------------------------------------------------------------------------
    'te': {
      nav_home: 'హోమ్',
      nav_cancer: 'క్యాన్సర్ సమాచారం',
      nav_news: 'మీడియా & వార్తలు',
      nav_advisory: 'సలహా మండలి',
      nav_certificates: 'రిజిస్ట్రేషన్ సర్టిఫికెట్లు',
      nav_careers: 'ఉద్యోగాలు & వాలంటీర్',
      nav_contact: 'సంప్రదించండి',
      nav_donate: 'విరాళం',
      nav_donate_support: 'విరాళం · మా మిషన్‌కు మద్దతు ఇవ్వండి',
      skip_link: 'ప్రధాన విషయానికి వెళ్లండి',
      brand_name: 'బీహార్ క్యాన్సర్ కేర్ ఆర్గనైజేషన్',
      brand_slogan: 'సేవ • ఆశ • జీవితం',

      hero_eyebrow: 'బీహార్ క్యాన్సర్ కేర్ ఆర్గనైజేషన్',
      hero_title_1: 'అవగాహన ముఖ్యం.',
      hero_title_2: 'తోడ్పాటు నిరంతరం.',
      hero_sub: 'ముందస్తు గుర్తింపు అవగాహనతోనే సాధ్యం. బీసీసీఓ ప్రజలలో క్యాన్సర్ పై అవగాహన పెంచడానికి, రోగులకు మరియు కుటుంబాలకు నైతిక బలాన్ని అందించడానికి పనిచేస్తుంది.',
      hero_cta_learn: 'క్యాన్సర్ గురించి తెలుసుకోండి',
      hero_cta_initiatives: 'మా కార్యక్రమాలు',
      hero_cta_contact: 'సంప్రదించండి',
      hero_trust_guidance: 'ఉచిత మరియు గోప్యమైన సలహా',
      hero_trust_local: 'స్థానిక భాషలో అవగాహన',
      hero_trust_families: 'కుటుంబాలకు నిరంతర తోడ్పాటు',

      stat_camps_num: '120+',
      stat_camps_label: 'ఉచిత స్క్రీనింగ్ శిబిరాలు',
      stat_camps_sub: 'బీహార్ అంతటా నిర్వహణ',
      stat_families_num: '4,500+',
      stat_families_label: 'తోడ్పాటు పొందిన కుటుంబాలు',
      stat_families_sub: 'ఉచిత మానసిక కౌన్సిలింగ్',
      stat_districts_num: '38',
      stat_districts_label: 'బీహార్‌లోని 38 జిల్లాలు',
      stat_districts_sub: 'క్షేత్రస్థాయి సేవా కార్యక్రమాలు',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'హెల్ప్‌లైన్ మద్దతు',
      stat_helpline_sub: 'ఆప్యాయతతో కూడిన సేవ',

      about_eyebrow: 'మా లక్ష్యం',
      about_title: 'భయాన్ని జ్ఞానంగా మరియు ఒంటరితనాన్ని భరోసాగా మార్చడం',
      about_lead: 'క్యాన్సర్ లక్షణాలను ముందుగానే గుర్తిస్తే చాలావరకు నయం చేయవచ్చు. బీసీసీఓ సరైన ఆసుపత్రి మార్గదర్శకత్వాన్ని మరియు కుటుంబాలకు ఆసరాను అందిస్తుంది.',
      init_1_title: 'ప్రాథమిక అవగాహన శిబిరాలు',
      init_1_desc: 'గ్రామీణ ప్రాంతాలలో లక్షణాలు మరియు నివారణ గురించి వివరించడం.',
      init_2_title: 'రోగుల మార్గదర్శకత్వం',
      init_2_desc: 'సరైన ఆసుపత్రులు మరియు క్యాన్సర్ వైద్యులను వెంటనే సంప్రదించడానికి సహాయం.',
      init_3_title: 'ప్రభుత్వ పథకాల సాయం',
      init_3_desc: 'ఆయుష్మాన్ భారత్ మరియు సీఎం రిలీఫ్ ఫండ్ సహాయం పొందడంలో తోడ్పాటు.',
      init_4_title: 'కుటుంబ సభ్యులకు కౌన్సిలింగ్',
      init_4_desc: 'రోగిని చూసుకునే కుటుంబ సభ్యులకు మానసిక స్థైర్యాన్ని అందించడం.',

      cancer_eyebrow: 'క్యాన్సర్ గైడ్',
      cancer_title: 'క్యాన్సర్‌ను అర్థం చేసుకోండి: లక్షణాలు & జాగ్రత్తలు',
      cancer_lead: 'క్యాన్సర్ ప్రాణాంతకం కానవసరం లేదు. సకాలంలో గుర్తిస్తే నయం సాధ్యమే. ప్రధాన 7 హెచ్చరిక సంకేతాలను గమనించండి.',
      caution_heading: 'క్యాన్సర్ 7 ముఖ్యమైన హెచ్చరిక లక్షణాలు (C.A.U.T.I.O.N.)',
      caution_c_title: 'మల విసర్జన లేదా మూత్రపు అలవాట్లలో మార్పులు',
      caution_c_desc: 'రెండు వారాలకు మించి విరేచనాలు, మలబద్ధకం లేదా రంగులో మార్పు.',
      caution_a_title: 'మానని పుండు లేదా గాయం',
      caution_a_desc: 'నోటిలో తెల్లటి లేదా ఎర్రటి మచ్చలు, త్వరగా మానని పుండ్లు.',
      caution_u_title: 'అసాధారణ రక్తస్రావం',
      caution_u_desc: 'దగ్గులో లేదా మూత్రంలో రక్తం పడటం, మహిళల్లో అసాధారణ రక్తస్రావం.',
      caution_t_title: 'రొమ్ము లేదా శరీరంలో నొప్పిలేని గడ్డలు',
      caution_t_desc: 'రొమ్ము, మెడ లేదా గజ్జల్లో కరగని గట్టి గడ్డలు.',
      caution_i_title: 'ఆహారం మింగడంలో ఇబ్బంది లేదా అజీర్తి',
      caution_i_desc: 'గొంతులో ఆహారం అడ్డం పడటం లేదా తీవ్రమైన అసిడిటీ.',
      caution_o_title: 'పుట్టుమచ్చ పరిమాణంలో మార్పు',
      caution_o_desc: 'పుట్టుమచ్చ వేగంగా పెరగడం లేదా రక్తం కారడం.',
      caution_n_title: 'తీవ్రమైన దగ్గు లేదా గొంతు బొంగురుపోవడం',
      caution_n_desc: 'మూడు వారాలకు మించిన దగ్గు లేదా గొంతు మారడం.',

      news_eyebrow: 'వార్తలు',
      news_title: 'మీడియా, వార్తలు & స్ఫూర్తిదాయక కథనాలు',
      news_lead: 'ఆరోగ్య సూచనలు మరియు క్యాన్సర్‌ను జయించిన వారి కథనాలు చదవండి.',
      filter_all: 'అన్ని అప్‌డేట్‌లు',
      filter_edu: 'అవగాహన',
      filter_news: 'వార్తలు',
      filter_stories: 'విజయ గాథలు',
      btn_read_more: 'పూర్తిగా చదవండి',
      btn_watch_video: 'వీడియో చూడండి',

      advisory_eyebrow: 'మా నాయకత్వం',
      advisory_title: 'సలహా మండలి',
      advisory_sub: 'ప్రముఖ క్యాన్సర్ నిపుణులు మరియు సామాజిక కార్యకర్తల మార్గదర్శకత్వం.',

      cert_eyebrow: 'పారదర్శకత',
      cert_title: 'రిజిస్ట్రేషన్ సర్టిఫికెట్లు',
      cert_sub: '12A, 80G మరియు CSR సర్టిఫికేషన్లతో పూర్తి పారదర్శకతతో పనిచేస్తుంది.',
      cert_download: 'సర్టిఫికేట్ డౌన్‌లోడ్',
      cert_view: 'పత్రం చూడండి',

      career_eyebrow: 'మమల్ని కలవండి',
      career_title: 'కెరీర్ మరియు వాలంటీర్',
      career_sub: 'క్యాన్సర్ నివారణ సేవలో మాతో భాగస్వామ్యం అవ్వండి. వైద్యులు, వాలంటీర్లు ఆహ్వానితులు.',
      form_name: 'పూర్తి పేరు',
      form_email: 'ఈమెయిల్',
      form_phone: 'ఫోన్ / వాట్సాప్',
      form_role: 'ఆసక్తి ఉన్న విభాగం',
      form_message: 'సందేశం',
      form_submit: 'దరఖాస్తు పంపండి',

      contact_eyebrow: 'మేము మీకు తోడుగా ఉన్నాము',
      contact_title: 'మా సహాయ బృందాన్ని సంప్రదించండి',
      contact_sub: 'ఏదైనా సమాచారం కోసం పాట్నాలోని మా కార్యాలయాన్ని సంప్రదించండి.',
      contact_office_title: 'పాట్నా కార్యాలయం',
      contact_office_addr: 'వార్డ్ నెం. 8, సత్యభ నివాస్, ఐఏఎస్ నగర్, పటేల్ భవన్ పక్కన, పాట్నా, బీహార్ - 800023',
      contact_helpline_title: 'హెల్ప్‌లైన్ & వాట్సాప్',
      contact_landline_title: 'కార్యాలయ ల్యాండ్‌లైన్',
      contact_email_title: 'అధికారిక ఈమెయిల్',
      contact_btn_send: 'సందేశం పంపండి',

      donate_title: 'క్యాన్సర్ రోగులకు విరాళం ఇవ్వండి',
      donate_sub: 'మీ విరాళం పేద రోగుల ఉచిత మందులు మరియు వైద్య శిబిరాలకు ఉపయోగించబడుతుంది.',
      donate_bank_name: 'బ్యాంక్: స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా (SBI)',
      donate_acc_name: 'ఖాతా పేరు: బీహార్ క్యాన్సర్ కేర్ ఆర్గనైజేషన్',
      donate_acc_no: 'ఖాతా సంఖ్య: 44908340531',
      donate_ifsc: 'IFSC కోడ్: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: 'సెక్షన్ 80G ప్రకారం అన్ని విరాళాలకు పన్ను మినహాయింపు ఉంటుంది.',
      donate_btn_copy: 'వివరాలు కాపీ చేయండి',
      donate_copied: 'కాపీ చేయబడింది!',

      lang_selector_title: 'భాషను ఎంచుకోండి / Select Language',
      lang_selector_sub: 'భారతీయ భాషలు మాత్రమే • 22 అధికారిక షెడ్యూల్ భాషలు + భారతీయ ఇంగ్లీష్',
      lang_search_placeholder: 'భారతీయ భాషను వెతకండి (ఉదా. తెలుగు, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'ఆటోమేటిక్ డిటెక్షన్ (బ్రౌజర్ డిఫాల్ట్)',
      lang_auto_detected: 'బ్రౌజర్ నుండి గుర్తించబడింది: ',
      lang_enable: 'ఎనేబుల్ చేయండి',
      lang_active: 'యాక్టివ్',
      lang_empty: 'మీ శోధనకు తగిన భారతీయ భాష కనుగొనబడలేదు.',
      lang_footer_note: 'మీ భాష ఎంపిక భద్రపరచబడుతుంది.',

      footer_desc: 'బీహార్ క్యాన్సర్ కేర్ ఆర్గనైజేషన్ క్యాన్సర్ నివారణ మరియు రోగుల సేవకు అంకితం చేయబడింది.',
      footer_links: 'త్వరిత లింకులు',
      footer_helplines: 'హెల్ప్‌లైన్లు',
      footer_disclaimer: 'వైద్య ప్రకటన: ఈ సమాచారం అవగాహన కొరకు మాత్రమే. ఇది డాక్టర్ సలహాకు ప్రత్యామ్నాయం కాదు.',
      footer_rights: 'అన్ని హక్కులు ప్రత్యేకించబడినవి. బీహార్ క్యాన్సర్ కేర్ ఆర్గనైజేషన్ (BCCO).'
    },

    // ------------------------------------------------------------------------
    // GUJARATI (ગુજરાતી)
    // ------------------------------------------------------------------------
    'gu': {
      nav_home: 'મુખ્ય પૃષ્ઠ',
      nav_cancer: 'કેન્સર વિશે જાણો',
      nav_news: 'મીડિયા અને સમાચાર',
      nav_advisory: 'સલાહકાર પરિષદ',
      nav_certificates: 'નોંધણી પ્રમાણપત્રો',
      nav_careers: 'કારકિર્દી અને સેવા',
      nav_contact: 'સંપર્ક કરો',
      nav_donate: 'દાન કરો',
      nav_donate_support: 'દાન કરો · અમારા મિશનને ટેકો આપો',
      skip_link: 'મુખ્ય વિષયવસ્તુ પર જાઓ',
      brand_name: 'બિહાર કેન્સર કેર ઓર્ગેનાઈઝેશન',
      brand_slogan: 'સેવા • આશા • જીવન',

      hero_eyebrow: 'બિહાર કેન્સર કેર ઓર્ગેનાઈઝેશન',
      hero_title_1: 'જાગૃતિ પ્રથમ.',
      hero_title_2: 'સહકાર સદૈવ.',
      hero_sub: 'વહેલા નિદાનની શરૂઆત જાગૃતિથી થાય છે. બીસીસીઓ બિહારના લોકોને કેન્સર સમજવા, શરૂઆતના લક્ષણો ઓળખવા અને દર્દીઓ તથા પરિવારોને નિઃશુલ્ક માર્ગદર્શન આપવા કટિબદ્ધ છે.',
      hero_cta_learn: 'કેન્સર વિશે જાણો',
      hero_cta_initiatives: 'અમારી પહેલ',
      hero_cta_contact: 'સંપર્ક કરો',
      hero_trust_guidance: 'મફત અને ગુપ્ત માર્ગદર્શન',
      hero_trust_local: 'સ્થાનિક ભાષામાં જાગૃતિ',
      hero_trust_families: 'પરિવારોનો અતૂટ સાથ',

      stat_camps_num: '120+',
      stat_camps_label: 'મફત જાગૃતિ શિબિરો',
      stat_camps_sub: 'બિહારના વિવિધ જિલ્લાઓમાં',
      stat_families_num: '4,500+',
      stat_families_label: 'માર્ગદર્શન મેળવેલ પરિવારો',
      stat_families_sub: 'મફત ગુપ્ત કાઉન્સેલિંગ',
      stat_districts_num: '38',
      stat_districts_label: 'બિહારના ૩૮ જિલ્લાઓ',
      stat_districts_sub: 'સક્રિય પાયાના પ્રયાસો',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'હેલ્પલાઇન સેવા',
      stat_helpline_sub: 'હૃદયપૂર્વક સહાય',

      about_eyebrow: 'અમારો ઉદ્દેશ્ય',
      about_title: 'ડરને જ્ઞાનમાં અને એકલતાને સહકારમાં બદલવું',
      about_lead: 'કેન્સરનું નિદાન થતાં પરિવારમાં ચિંતા વધે છે. સમયસર લક્ષણો ઓળખવાથી કેન્સર સાધ્ય બની શકે છે. બીસીસીઓ દર્દીઓને યોગ્ય હોસ્પિટલ પહોંચવામાં મદદ કરે છે.',
      init_1_title: 'પ્રારંભિક જાગૃતિ શિબિરો',
      init_1_desc: 'ગામડાં સુધી લક્ષણો અને નિવારણની સરળ ભાષામાં માહિતી પહોંચાડવી.',
      init_2_title: 'દર્દી માર્ગદર્શન',
      init_2_desc: 'યોગ્ય હોસ્પિટલ અને નિષ્ણાત તબીબો સુધી પહોંચવામાં સહાય.',
      init_3_title: 'સરકારી સહાય યોજનાઓ',
      init_3_desc: 'આયુષ્માન ભારત અને મુખ્યમંત્રી રાહત ભંડોળ મેળવવામાં મદદ.',
      init_4_title: 'પરિવાર કાઉન્સેલિંગ',
      init_4_desc: 'દર્દીની સેવા કરતા પરિવારજનોને માનસિક હિંમત આપવી.',

      cancer_eyebrow: 'કેન્સર માર્ગદર્શિકા',
      cancer_title: 'કેન્સરને સમજો: લક્ષણો, તપાસ અને પગલાં',
      cancer_lead: 'કેન્સરથી ડરવાની જરૂર નથી. સમયસર તપાસથી તે સંપૂર્ણ મટી શકે છે. નીચે આપેલા ૭ મુખ્ય લક્ષણો ધ્યાનમાં રાખો.',
      caution_heading: 'કેન્સરના ૭ મુખ્ય ચેતવણી સંકેતો (C.A.U.T.I.O.N.)',
      caution_c_title: 'શૌચ કે પેશાબની ટેવોમાં સતત ફેરફાર',
      caution_c_desc: 'બે અઠવાડિયાથી વધુ સમય ઝાડા, કબજિયાત કે પેશાબના રંગમાં ફેરફાર.',
      caution_a_title: 'મોં કે ત્વચા પર ન રૂઝાતો ઘા',
      caution_a_desc: 'મોંમાં લાલ કે સફેદ ચાંદા, ખાસ કરીને ગુટખા ખાનારાઓમાં.',
      caution_u_title: 'અસામાન્ય રક્તસ્રાવ',
      caution_u_desc: 'ખાંસીમાં કે પેશાબમાં લોહી પડવું, સ્ત્રીઓમાં અસામાન્ય રક્તસ્રાવ.',
      caution_t_title: 'સ્તન કે શરીરમાં ન દુઃખતી ગાંઠ',
      caution_t_desc: 'સ્તન, ગળા કે બગલમાં ન મટતી કડક ગાંઠ.',
      caution_i_title: 'ખોરાક ગળવામાં તકલીફ કે અપચો',
      caution_i_desc: 'ગળામાં ખોરાક અટકવો કે સતત એસિડિટી.',
      caution_o_title: 'તલ કે મસાના રંગ-કદમાં ફેરફાર',
      caution_o_desc: 'તલનું ઝડપથી વધવું કે તેમાંથી લોહી નીકળવું.',
      caution_n_title: 'લાંબી ખાંસી કે અવાજમાં ઘોઘરાપણું',
      caution_n_desc: 'ત્રણ અઠવાડિયાથી વધુ સમય ખાંસી કે અવાજ બેસી જવો.',

      news_eyebrow: 'સમાચાર',
      news_title: 'મીડિયા, સમાચાર અને આશાસ્પદ વાર્તાઓ',
      news_lead: 'આરોગ્ય માર્ગદર્શિકા અને કેન્સર સામે લડનારાઓની પ્રેરણાદાયી વાતો વાંચો.',
      filter_all: 'બધા અપડેટ્સ',
      filter_edu: 'શૈક્ષણિક',
      filter_news: 'સમાચાર',
      filter_stories: 'પ્રેરણાદાયી વાતો',
      btn_read_more: 'સંપૂર્ણ વાંચો',
      btn_watch_video: 'વિડીયો જુઓ',

      advisory_eyebrow: 'અમારું નેતૃત્વ',
      advisory_title: 'સલાહકાર પરિષદ',
      advisory_sub: 'વરિષ્ઠ કેન્સર નિષ્ણાતો અને સમાજસેવકોના માર્ગદર્શન હેઠળ.',

      cert_eyebrow: 'પારદર્શિતા',
      cert_title: 'નોંધણી પ્રમાણપત્રો',
      cert_sub: '12A, 80G અને CSR માન્યતા સાથે સંપૂર્ણ પારદર્શક કામગીરી.',
      cert_download: 'પ્રમાણપત્ર ડાઉનલોડ',
      cert_view: 'દસ્તાવેજ જુઓ',

      career_eyebrow: 'જોડાઓ',
      career_title: 'કારકિર્દી અને સ્વયંસેવા',
      career_sub: 'બિહારમાં કેન્સર જાગૃતિના આ યજ્ઞમાં સહભાગી બનો. તબીબો અને સ્વયંસેવકો આવકાર્ય છે.',
      form_name: 'પૂરું નામ',
      form_email: 'ઈમેલ',
      form_phone: 'ફોન / વોટ્સએપ',
      form_role: 'રસનો વિષય',
      form_message: 'સંદેશ',
      form_submit: 'અરજી મોકલો',

      contact_eyebrow: 'અમે તમારી સાથે છીએ',
      contact_title: 'અમારી ટીમનો સંપર્ક કરો',
      contact_sub: 'કોઈપણ માર્ગદર્શન માટે પટના સ્થિત કાર્યાલયનો સંપર્ક કરો.',
      contact_office_title: 'પટના રજિસ્ટર્ડ ઓફિસ',
      contact_office_addr: 'વોર્ડ નં. 8, સત્યભા નિવાસ, આઈએએસ નગર, પટેલ ભવન પાસે, પટના, બિહાર - 800023',
      contact_helpline_title: 'હેલ્પલાઇન અને વોટ્સએપ',
      contact_landline_title: 'ઓફિસ લેન્ડલાઇન',
      contact_email_title: 'સત્તાવાર ઈમેલ',
      contact_btn_send: 'સંદેશ મોકલો',

      donate_title: 'કેન્સર દર્દીઓને સહાય કરો',
      donate_sub: 'આપનું દાન ગરીબ દર્દીઓની મફત દવાઓ અને તપાસમાં ઉપયોગમાં લેવાય છે.',
      donate_bank_name: 'બેંક: સ્ટેટ બેંક ઓફ ઇન્ડિયા (SBI)',
      donate_acc_name: 'ખાતાનું નામ: બિહાર કેન્સર કેર ઓર્ગેનાઈઝેશન',
      donate_acc_no: 'ખાતા નંબર: 44908340531',
      donate_ifsc: 'IFSC કોડ: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: '80G હેઠળ તમામ દાન કરમુક્ત છે.',
      donate_btn_copy: 'વિગતો કોપી કરો',
      donate_copied: 'કોપી થઈ ગયું!',

      lang_selector_title: 'ભાષા પસંદ કરો / Select Language',
      lang_selector_sub: 'માત્ર ભારતીય ભાષાઓ • 22 અધિકૃત ભાષાઓ + ભારતીય અંગ્રેજી',
      lang_search_placeholder: 'ભારતીય ભાષા શોધો (દા.ત. ગુજરાતી, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'ઓટોમેટિક ડિટેક્શન (બ્રાઉઝર ડિફૉલ્ટ)',
      lang_auto_detected: 'બ્રાઉઝર પરથી શોધાયેલ: ',
      lang_enable: 'સક્રિય કરો',
      lang_active: 'સક્રિય',
      lang_empty: 'આપની શોધ મુજબ કોઈ ભારતીય ભાષા મળી નથી.',
      lang_footer_note: 'આપની પસંદગી સુરક્ષિત રીતે સચવાય છે.',

      footer_desc: 'બિહાર કેન્સર કેર ઓર્ગેનાઈઝેશન કેન્સર નિવારણ અને દર્દી સેવામાં સમર્પિત છે.',
      footer_links: 'ઝડપી લિંક્સ',
      footer_helplines: 'હેલ્પલાઇન',
      footer_disclaimer: 'તબીબી સલાહ: આ માહિતી માત્ર જાગૃતિ માટે છે, તે તબીબી સલાહનો વિકલ્પ નથી.',
      footer_rights: 'સર્વાધિકાર સુરક્ષિત. બિહાર કેન્સર કેર ઓર્ગેનાઈઝેશન (BCCO).'
    },

    // ------------------------------------------------------------------------
    // KANNADA (ಕನ್ನಡ)
    // ------------------------------------------------------------------------
    'kn': {
      nav_home: 'ಮುಖಪುಟ',
      nav_cancer: 'ಕ್ಯಾನ್ಸರ್ ಮಾಹಿತಿ',
      nav_news: 'ಮಾಧ್ಯಮ & ಸುದ್ದಿ',
      nav_advisory: 'ಸಲಹಾ ಮಂಡಳಿ',
      nav_certificates: 'ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರಗಳು',
      nav_careers: 'ಉದ್ಯೋಗ & ಸ್ವಯಂಸೇವೆ',
      nav_contact: 'ಸಂಪರ್ಕಿಸಿ',
      nav_donate: 'ದೇಣಿಗೆ ನೀಡಿ',
      nav_donate_support: 'ದೇಣಿಗೆ · ನಮ್ಮ ಸೇವೆಗೆ ಬೆಂಬಲಿಸಿ',
      skip_link: 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ',
      brand_name: 'ಬಿಹಾರ ಕ್ಯಾನ್ಸರ್ ಕೇರ್ ಸಂಸ್ಥೆ',
      brand_slogan: 'ಕಾಳಜಿ • ಭರವಸೆ • ಜೀವನ',

      hero_eyebrow: 'ಬಿಹಾರ ಕ್ಯಾನ್ಸರ್ ಕೇರ್ ಸಂಸ್ಥೆ',
      hero_title_1: 'ಜಾಗೃತಿ ಮೊದಲು.',
      hero_title_2: 'ಬೆಂಬಲ ಸದಾ.',
      hero_sub: 'ಆರಂಭಿಕ ಹಂತದಲ್ಲೇ ಕ್ಯಾನ್ಸರ್ ಪತ್ತೆಹಚ್ಚುವುದು ಜಾಗೃತಿಯಿಂದ ಆರಂಭವಾಗುತ್ತದೆ. ರೋಗಿಗಳು ಮತ್ತು ಅವರ ಕುಟುಂಬಗಳಿಗೆ ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ನೈತಿಕ ಬೆಂಬಲ ನೀಡಲು ಬಿಸಿಸಿಒ ಶ್ರಮಿಸುತ್ತದೆ.',
      hero_cta_learn: 'ಕ್ಯಾನ್ಸರ್ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ',
      hero_cta_initiatives: 'ನಮ್ಮ ಯೋಜನೆಗಳು',
      hero_cta_contact: 'ಸಂಪರ್ಕಿಸಿ',
      hero_trust_guidance: 'ಉಚಿತ ಮತ್ತು ಗೌಪ್ಯ ಸಮಾಲೋಚನೆ',
      hero_trust_local: 'ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಜಾಗೃತಿ',
      hero_trust_families: 'ಕುಟುಂಬಗಳಿಗೆ ನಿರಂತರ ಸಾಥ್',

      stat_camps_num: '120+',
      stat_camps_label: 'ಉಚಿತ ತಪಾಸಣಾ ಶಿಬಿರಗಳು',
      stat_camps_sub: 'ಬಿಹಾರದ ವಿವಿಧ ಜಿಲ್ಲೆಗಳಲ್ಲಿ',
      stat_families_num: '4,500+',
      stat_families_label: 'ಮಾರ್ಗದರ್ಶನ ಪಡೆದ ಕುಟುಂಬಗಳು',
      stat_families_sub: 'ಉಚಿತ ಗೌಪ್ಯ ಸಮಾಲೋಚನೆ',
      stat_districts_num: '38',
      stat_districts_label: 'ಬಿಹಾರದ 38 ಜಿಲ್ಲೆಗಳು',
      stat_districts_sub: 'ಸಕ್ರಿಯ ಗ್ರಾಮೀಣ ಅಭಿಯಾನ',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'ಸಹಾಯವಾಣಿ ಬೆಂಬಲ',
      stat_helpline_sub: 'ಆತ್ಮೀಯ ನೆರವು',

      about_eyebrow: 'ನಮ್ಮ ಉದ್ದೇಶ',
      about_title: 'ಭಯವನ್ನು ಜ್ಞಾನವನ್ನಾಗಿಯೂ, ಒಂಟಿತನವನ್ನು ಸಹಯೋಗವನ್ನಾಗಿಯೂ ಪರಿವರ್ತಿಸುವುದು',
      about_lead: 'ಕ್ಯಾನ್ಸರ್ ರೋಗನಿರ್ಣಯವಾದಾಗ ಕುಟುಂಬದಲ್ಲಿ ಆತಂಕ ಸಹಜ. ಆರಂಭಿಕ ಲಕ್ಷಣಗಳನ್ನು ಗುರುತಿಸಿದರೆ ಕ್ಯಾನ್ಸರ್ ಗುಣಪಡಿಸಬಹುದು. ಬಿಸಿಸಿಒ ರೋಗಿಗಳಿಗೆ ಸರಿಯಾದ ಆಸ್ಪತ್ರೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.',
      init_1_title: 'ಆರಂಭಿಕ ಜಾಗೃತಿ ಶಿಬಿರಗಳು',
      init_1_desc: 'ಗ್ರಾಮೀಣ ಜನರಿಗೆ ರೋಗಲಕ್ಷಣಗಳು ಮತ್ತು ತಡೆಗಟ್ಟುವಿಕೆಯ ಬಗ್ಗೆ ಸರಳ ಮಾಹಿತಿ.',
      init_2_title: 'ರೋಗಿ ಮಾರ್ಗದರ್ಶನ',
      init_2_desc: 'ಸರಿಯಾದ ಆಸ್ಪತ್ರೆ ಮತ್ತು ಕ್ಯಾನ್ಸರ್ ತಜ್ಞರ ಬಳಿಗೆ ತಕ್ಷಣ ತಲುಪಲು ಸಹಾಯ.',
      init_3_title: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ನೆರವು',
      init_3_desc: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಮತ್ತು ಮುಖ್ಯಮಂತ್ರಿ ಪರಿಹಾರ ನಿಧಿ ಪಡೆಯಲು ಬೆಂಬಲ.',
      init_4_title: 'ಪಾಲನೆದಾರರ ಕೌನ್ಸಿಲಿಂಗ್',
      init_4_desc: 'ರೋಗಿಯನ್ನು ನೋಡಿಕೊಳ್ಳುವ ಕುಟುಂಬದವರಿಗೆ ಮಾನಸಿಕ ಧೈರ್ಯ ತುಂಬುವುದು.',

      cancer_eyebrow: 'ಕ್ಯಾನ್ಸರ್ ಕೈಪಿಡಿ',
      cancer_title: 'ಕ್ಯಾನ್ಸರ್ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ: ಲಕ್ಷಣಗಳು & ಮುನ್ನೆಚ್ಚರಿಕೆ',
      cancer_lead: 'ಕ್ಯಾನ್ಸರ್ ಎಂದ ತಕ್ಷಣ ಹೆದರಬೇಕಿಲ್ಲ. ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಪತ್ತೆಯಾದರೆ ಸಂಪೂರ್ಣ ಗುಣಪಡಿಸಲು ಸಾಧ್ಯ. ಪ್ರಮುಖ 7 ಎಚ್ಚರಿಕೆಯ ಚಿಹ್ನೆಗಳನ್ನು ಗಮನಿಸಿ.',
      caution_heading: 'ಕ್ಯಾನ್ಸರ್‌ನ 7 ಮುಖ್ಯ ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು (C.A.U.T.I.O.N.)',
      caution_c_title: 'ಮಲ ಅಥವಾ ಮೂತ್ರ ವಿಸರ್ಜನೆಯಲ್ಲಿ ನಿರಂತರ ಬದಲಾವಣೆ',
      caution_c_desc: 'ಎರಡು ವಾರಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ಅತಿಸಾರ, ಮಲಬದ್ಧತೆ ಅಥವಾ ಬಣ್ಣದಲ್ಲಿ ಬದಲಾವಣೆ.',
      caution_a_title: 'ವಾಸಿಯಾಗದ ಬಾಯಿ ಅಥವಾ ಚರ್ಮದ ಹುಣ್ಣು',
      caution_a_desc: 'ಬಾಯಿಯಲ್ಲಿ ಬಿಳಿ ಅಥವಾ ಕೆಂಪು ಕಲೆಗಳು, ವಿಶೇಷವಾಗಿ ತಂಬಾಕು ಸೇವಿಸುವವರಲ್ಲಿ.',
      caution_u_title: 'ಅಸಹಜ ರಕ್ತಸ್ರಾವ',
      caution_u_desc: 'ಕೆಮ್ಮಿನಲ್ಲಿ ಅಥವಾ ಮೂತ್ರದಲ್ಲಿ ರಕ್ತ, ಮಹಿಳೆಯರಲ್ಲಿ ಅಸಹಜ ರಕ್ತಸ್ರಾವ.',
      caution_t_title: 'ಸ್ತನ ಅಥವಾ ದೇಹದಲ್ಲಿ ನೋವಿಲ್ಲದ ಗಡ್ಡೆ',
      caution_t_desc: 'ಸ್ತನ, ಕುತ್ತಿಗೆ ಅಥವಾ ಕಂಕುಳಲ್ಲಿ ಕರಗದ ಗಟ್ಟಿ ಗಡ್ಡೆ.',
      caution_i_title: 'ಆಹಾರ ನುಂಗಲು ಕಷ್ಟ ಅಥವಾ ಅಜೀರ್ಣ',
      caution_i_desc: 'ಆಹಾರ ಗಂಟಲಿನಲ್ಲಿ ಸಿಲುಕಿದಂತಾಗುವುದು ಅಥವಾ ತೀವ್ರ ಎದೆಯುರಿ.',
      caution_o_title: 'ಮಚ್ಚೆಯ ಗಾತ್ರ ಮತ್ತು ಬಣ್ಣದಲ್ಲಿ ಬದಲಾವಣೆ',
      caution_o_desc: 'ಮಚ್ಚೆ ವೇಗವಾಗಿ ಬೆಳೆಯುವುದು ಅಥವಾ ರಕ್ತ ಒಸರುವುದು.',
      caution_n_title: 'ನಿರಂತರ ಕೆಮ್ಮು ಅಥವಾ ಧ್ವನಿ ಬದಲಾವಣೆ',
      caution_n_desc: 'ಮೂರು ವಾರಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲದ ಕೆಮ್ಮು ಅಥವಾ ಗಂಟಲು ಕೆರತ.',

      news_eyebrow: 'ಸುದ್ದಿ',
      news_title: 'ಮಾಧ್ಯಮ, ಸುದ್ದಿ ಮತ್ತು ಸ್ಪೂರ್ತಿದಾಯಕ ಕಥೆಗಳು',
      news_lead: 'ಕ್ಯಾನ್ಸರ್ ಜಯಿಸಿದ ವೀರರ ಸ್ಪೂರ್ತಿದಾಯಕ ಅನುಭವಗಳನ್ನು ಓದಿ.',
      filter_all: 'ಎಲ್ಲಾ ಅಪ್ಡೇಟ್ಸ್',
      filter_edu: 'ಶೈಕ್ಷಣಿಕ',
      filter_news: 'ಸುದ್ದಿ',
      filter_stories: 'ಭರವಸೆಯ ಕಥೆಗಳು',
      btn_read_more: 'ಪೂರ್ಣ ಓದಿ',
      btn_watch_video: 'ವಿಡಿಯೋ ವೀಕ್ಷಿಸಿ',

      advisory_eyebrow: 'ನಮ್ಮ ನಾಯಕತ್ವ',
      advisory_title: 'ಸಲಹಾ ಮಂಡಳಿ',
      advisory_sub: 'ಹಿರಿಯ ಕ್ಯಾನ್ಸರ್ ತಜ್ಞರು ಮತ್ತು ಸಮಾಜ ಸೇವಕರ ಮಾರ್ಗದರ್ಶನ.',

      cert_eyebrow: 'ಪಾರದರ್ಶಕತೆ',
      cert_title: 'ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರಗಳು',
      cert_sub: '12A, 80G ಮತ್ತು CSR ಮಾನ್ಯತೆಯೊಂದಿಗೆ ಸಂಪೂರ್ಣ ಪಾರದರ್ಶಕತೆ.',
      cert_download: 'ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್',
      cert_view: 'ದಾಖಲೆ ನೋಡಿ',

      career_eyebrow: 'ನಮ್ಮೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ',
      career_title: 'ಉದ್ಯೋಗ ಮತ್ತು ಸ್ವಯಂಸೇವೆ',
      career_sub: 'ಕ್ಯಾನ್ಸರ್ ಮುಕ್ತ ಸಮಾಜ ನಿರ್ಮಾಣದಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ. ವೈದ್ಯರು, ಸ್ವಯಂಸೇವಕರಿಗೆ ಸ್ವಾಗತ.',
      form_name: 'ಪೂರ್ಣ ಹೆಸರು',
      form_email: 'ಇಮೇಲ್',
      form_phone: 'ಫೋನ್ / ವಾಟ್ಸಾಪ್',
      form_role: 'ಆಸಕ್ತಿಯ ಕ್ಷೇತ್ರ',
      form_message: 'ಸಂದೇಶ',
      form_submit: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',

      contact_eyebrow: 'ನಾವು ನಿಮ್ಮೊಂದಿಗಿದ್ದೇವೆ',
      contact_title: 'ನಮ್ಮ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ',
      contact_sub: 'ಯಾವುದೇ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಪಾಟ್ನಾ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      contact_office_title: 'ಪಾಟ್ನಾ ನೋಂದಾಯಿತ ಕಚೇರಿ',
      contact_office_addr: 'ವಾರ್ಡ್ ನಂ. 8, ಸತ್ಯಭಾ ನಿವಾಸ್, ಐಎಎಸ್ ನಗರ, ಪಟೇಲ್ ಭವನದ ಹತ್ತಿರ, ಪಾಟ್ನಾ, ಬಿಹಾರ - 800023',
      contact_helpline_title: 'ಸಹಾಯವಾಣಿ & ವಾಟ್ಸಾಪ್',
      contact_landline_title: 'ಕಚೇರಿ ಲ್ಯಾಂಡ್‌ಲೈನ್',
      contact_email_title: 'ಅಧಿಕೃತ ಇಮೇಲ್',
      contact_btn_send: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',

      donate_title: 'ಕ್ಯಾನ್ಸರ್ ರೋಗಿಗಳಿಗೆ ನೆರವಾಗಿ',
      donate_sub: 'ನಿಮ್ಮ ದೇಣಿಗೆ ಬಡ ರೋಗಿಗಳ ಉಚಿತ ತಪಾಸಣೆ ಮತ್ತು ಔಷಧಿಗಳಿಗೆ ಬಳಕೆಯಾಗುತ್ತದೆ.',
      donate_bank_name: 'ಬ್ಯಾಂಕ್: ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ (SBI)',
      donate_acc_name: 'ಖಾತೆ ಹೆಸರು: ಬಿಹಾರ ಕ್ಯಾನ್ಸರ್ ಕೇರ್ ಸಂಸ್ಥೆ',
      donate_acc_no: 'ಖಾತೆ ಸಂಖ್ಯೆ: 44908340531',
      donate_ifsc: 'IFSC ಕೋಡ್: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: '80G ಅಡಿಯಲ್ಲಿ ಎಲ್ಲಾ ದೇಣಿಗೆಗಳಿಗೆ ತೆರಿಗೆ ವಿನಾಯಿತಿ ಇದೆ.',
      donate_btn_copy: 'ವಿವರಗಳನ್ನು ನಕಲಿಸಿ',
      donate_copied: 'ನಕಲಿಸಲಾಗಿದೆ!',

      lang_selector_title: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ / Select Language',
      lang_selector_sub: 'ಭಾರತೀಯ ಭಾಷೆಗಳು ಮಾತ್ರ • 22 ಅಧಿಕೃತ ಭಾಷೆಗಳು + ಭಾರತೀಯ ಇಂಗ್ಲಿಷ್',
      lang_search_placeholder: 'ಭಾರತೀಯ ಭಾಷೆಯನ್ನು ಹುಡುಕಿ (ಉದಾ. ಕನ್ನಡ, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'ಸ್ವಯಂಚಾಲಿತ ಪತ್ತೆ (ಬ್ರೌಸರ್ ಡೀಫಾಲ್ಟ್)',
      lang_auto_detected: 'ಬ್ರೌಸರ್‌ನಿಂದ ಪತ್ತೆಯಾಗಿದೆ: ',
      lang_enable: 'ಸಕ್ರಿಯಗೊಳಿಸಿ',
      lang_active: 'ಸಕ್ರಿಯ',
      lang_empty: 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಭಾರತೀಯ ಭಾಷೆ ಕಂಡುಬಂದಿಲ್ಲ.',
      lang_footer_note: 'ನಿಮ್ಮ ಭಾಷೆಯ ಆಯ್ಕೆಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಉಳಿಸಲಾಗುತ್ತದೆ.',

      footer_desc: 'ಬಿಹಾರ ಕ್ಯಾನ್ಸರ್ ಕೇರ್ ಸಂಸ್ಥೆಯು ಕ್ಯಾನ್ಸರ್ ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ರೋಗಿಗಳ ಸೇವೆಗೆ ಸಮರ್ಪಿತವಾಗಿದೆ.',
      footer_links: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
      footer_helplines: 'ಸಹಾಯವಾಣಿ',
      footer_disclaimer: 'ವೈದ್ಯಕೀಯ ಮಾಹಿತಿ: ಈ ಮಾಹಿತಿಯು ಜಾಗೃತಿಗಾಗಿ ಮಾತ್ರ, ಇದು ವೈದ್ಯರ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.',
      footer_rights: 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಬಿಹಾರ ಕ್ಯಾನ್ಸರ್ ಕೇರ್ ಸಂಸ್ಥೆ (BCCO).'
    },

    // ------------------------------------------------------------------------
    // MALAYALAM (മലയാളം)
    // ------------------------------------------------------------------------
    'ml': {
      nav_home: 'ഹോം പേജ്',
      nav_cancer: 'കാൻസറിനെ അറിയുക',
      nav_news: 'മീഡിയ & വാർത്തകൾ',
      nav_advisory: 'ഉപദേശക സമിതി',
      nav_certificates: 'രജിസ്ട്രേഷൻ സർട്ടിഫിക്കറ്റുകൾ',
      nav_careers: 'കരിയർ & സന്നദ്ധസേവനം',
      nav_contact: 'ബന്ധപ്പെടുക',
      nav_donate: 'സംഭാവന നൽകുക',
      nav_donate_support: 'സംഭാവന നൽകുക · ഞങ്ങളെ പിന്തുണയ്ക്കുക',
      skip_link: 'പ്രധാന ഉള്ളടക്കത്തിലേക്ക് പോകുക',
      brand_name: 'ബീഹാർ കാൻസർ കെയർ ഓർഗനൈസേഷൻ',
      brand_slogan: 'കരുതൽ • പ്രതീക്ഷ • ജീവിതം',

      hero_eyebrow: 'ബീഹാർ കാൻസർ കെയർ ഓർഗനൈസേഷൻ',
      hero_title_1: 'അവബോധം ആദ്യം.',
      hero_title_2: 'പിന്തുണ എപ്പോഴും.',
      hero_sub: 'നേരത്തെയുള്ള രോഗനിർണയം ആരംഭിക്കുന്നത് അവബോധത്തിലൂടെയാണ്. ബിസിസിഒ രോഗികൾക്കും കുടുംബങ്ങൾക്കും ശരിയായ മാർഗ്ഗനിർദ്ദേശവും പിന്തുണയും നൽകുന്നു.',
      hero_cta_learn: 'കാൻസറിനെക്കുറിച്ച് അറിയുക',
      hero_cta_initiatives: 'ഞങ്ങളുടെ സംരംഭങ്ങൾ',
      hero_cta_contact: 'ബന്ധപ്പെടുക',
      hero_trust_guidance: 'സൗജന്യ രഹസ്യ കൗൺസിലിംഗ്',
      hero_trust_local: 'മാതൃഭാഷയിൽ അവബോധം',
      hero_trust_families: 'കുടുംബങ്ങൾക്ക് പൂർണ്ണ പിന്തുണ',

      stat_camps_num: '120+',
      stat_camps_label: 'സൗജന്യ പരിശോധനാ ക്യാമ്പുകൾ',
      stat_camps_sub: 'ബീഹാറിലെ വിവിധ ജില്ലകളിൽ',
      stat_families_num: '4,500+',
      stat_families_label: 'സഹായം ലഭിച്ച കുടുംബങ്ങൾ',
      stat_families_sub: 'സൗജന്യ കൗൺസിലിംഗ്',
      stat_districts_num: '38',
      stat_districts_label: 'ബീഹാറിലെ 38 ജില്ലകൾ',
      stat_districts_sub: 'ഗ്രാമീണ ബോധവൽക്കരണം',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'ഹെൽപ്പ്‌ലൈൻ സഹായം',
      stat_helpline_sub: 'ആത്മാർത്ഥമായ പിന്തുണ',

      about_eyebrow: 'ഞങ്ങളുടെ ലക്ഷ്യം',
      about_title: 'ഭയത്തെ അറിവായും ഏകാന്തതയെ കൂട്ടായ്മയായും മാറ്റുക',
      about_lead: 'കാൻസർ ലക്ഷണങ്ങൾ നേരത്തെ തിരിച്ചറിഞ്ഞാൽ രോഗം ഭേദമാക്കാൻ സാധിക്കും. ബിസിസിഒ കൃത്യമായ ആശുപത്രി മാർഗ്ഗനിർദ്ദേശം നൽകുന്നു.',
      init_1_title: 'ബോധവൽക്കരണ ക്യാമ്പുകൾ',
      init_1_desc: 'ഗ്രാമങ്ങളിൽ ലക്ഷണങ്ങളെക്കുറിച്ചും പ്രതിരോധത്തെക്കുറിച്ചും അറിവ് പകരൽ.',
      init_2_title: 'രോഗി മാർഗ്ഗനിർദ്ദേശം',
      init_2_desc: 'വിദഗ്ദ്ധ ഡോക്ടർമാരെയും ആശുപത്രികളെയും കാലതാമസമില്ലാതെ സമീപിക്കാൻ സഹായം.',
      init_3_title: 'സർക്കാർ പദ്ധതി സഹായം',
      init_3_desc: 'ആയുഷ്മാൻ ഭാരത്, മുഖ്യമന്ത്രിയുടെ ദുരിതാശ്വാസ നിധി എന്നിവ ലഭ്യമാക്കാൻ സഹായം.',
      init_4_title: 'കെയർഗിവർ പിന്തുണ',
      init_4_desc: 'രോഗിയെ പരിചരിക്കുന്ന കുടുംബാംഗങ്ങൾക്ക് മാനസിക ധൈര്യം നൽകൽ.',

      cancer_eyebrow: 'കാൻസർ ഗൈഡ്',
      cancer_title: 'കാൻസറിനെ മനസ്സിലാക്കുക: ലക്ഷണങ്ങളും പ്രതിരോധവും',
      cancer_lead: 'കാൻസർ എന്നാൽ ജീവിതത്തിന്റെ അവസാനമല്ല. പ്രാരംഭഘട്ടത്തിൽ കണ്ടെത്തിയാൽ പൂർണ്ണമായും സുഖപ്പെടുത്താം. പ്രധാന 7 ലക്ഷണങ്ങൾ ശ്രദ്ധിക്കുക.',
      caution_heading: 'കാൻസറിന്റെ 7 പ്രധാന മുന്നറിയിപ്പ് ലക്ഷണങ്ങൾ (C.A.U.T.I.O.N.)',
      caution_c_title: 'മലമൂത്ര വിസർജ്ജനത്തിൽ ഉണ്ടാകുന്ന മാറ്റങ്ങൾ',
      caution_c_desc: 'രണ്ടാഴ്ചയിലധികം നീണ്ടുനിൽക്കുന്ന വയറിളക്കം, മലബന്ധം അല്ലെങ്കിൽ നിറവ്യത്യാസം.',
      caution_a_title: 'ഉണങ്ങാത്ത വ്രണങ്ങൾ',
      caution_a_desc: 'വായിലെ വെളുത്തതോ ചുവന്നതോ ആയ പാടുകൾ, ഉണങ്ങാത്ത മുറിവുകൾ.',
      caution_u_title: 'അസാധാരണ രക്തസ്രാവം',
      caution_u_desc: 'ചുമയ്ക്കുമ്പോഴോ മൂത്രത്തിലോ രക്തം കാണപ്പെടുക.',
      caution_t_title: 'സ്തനത്തിലോ ശരീരത്തിലോ ഉള്ള മുഴകൾ',
      caution_t_desc: 'വേദനയില്ലാത്തതും സ്വയം അലിഞ്ഞുപോകാത്തതുമായ കട്ടിപ്പുള്ള മുഴകൾ.',
      caution_i_title: 'ഭക്ഷണം വിഴുങ്ങാൻ ബുദ്ധിമുട്ട്',
      caution_i_desc: 'ഭക്ഷണം തൊണ്ടയിൽ കുടുങ്ങുന്നത് പോലെ തോന്നുക അല്ലെങ്കിൽ കടുത്ത നെഞ്ചെരിച്ചിൽ.',
      caution_o_title: 'മറുകിന്റെ വലിപ്പത്തിലും നിറത്തിലും മാറ്റം',
      caution_o_desc: 'മറുക് പെട്ടെന്ന് വലുതാവുകയോ അതിൽ നിന്ന് രക്തം വരികയോ ചെയ്യുക.',
      caution_n_title: 'വിട്ടുമാറാത്ത ചുമ അല്ലെങ്കിൽ ശബ്ദമടപ്പ്',
      caution_n_desc: 'മൂന്നാഴ്ചയിലധികം നീണ്ടുനിൽക്കുന്ന ചുമ അല്ലെങ്കിൽ ശബ്ദവ്യത്യാസം.',

      news_eyebrow: 'വാർത്തകൾ',
      news_title: 'മീഡിയ, വാർത്തകൾ & പ്രതീക്ഷയുടെ കഥകൾ',
      news_lead: 'കാൻസറിനെ അതിജീവിച്ചവരുടെ പ്രചോദനാത്മക കഥകൾ വായിക്കുക.',
      filter_all: 'എല്ലാ അപ്‌ഡേറ്റുകളും',
      filter_edu: 'വിദ്യാഭ്യാസം',
      filter_news: 'വാർത്തകൾ',
      filter_stories: 'അതിജീവന കഥകൾ',
      btn_read_more: 'പൂർണ്ണമായി വായിക്കുക',
      btn_watch_video: 'വീഡിയോ കാണുക',

      advisory_eyebrow: 'നേതൃത്വം',
      advisory_title: 'ഉപദേശക സമിതി',
      advisory_sub: 'പ്രമുഖ കാൻസർ വിദഗ്ദ്ധരുടെയും സാമൂഹിക പ്രവർത്തകരുടെയും നേതൃത്വത്തിൽ.',

      cert_eyebrow: 'സുതാര്യത',
      cert_title: 'രജിസ്ട്രേഷൻ സർട്ടിഫിക്കറ്റുകൾ',
      cert_sub: '12A, 80G, CSR സർട്ടിഫിക്കറ്റുകളോടെ പൂർണ്ണ സുതാര്യതയോടെ പ്രവർത്തിക്കുന്നു.',
      cert_download: 'ഡൗൺലോഡ് ചെയ്യുക',
      cert_view: 'രേഖ കാണുക',

      career_eyebrow: 'ഞങ്ങളോടൊപ്പം ചേരൂ',
      career_title: 'കരിയർ & സന്നദ്ധസേവന അവസരങ്ങൾ',
      career_sub: 'കാൻസർ പ്രതിരോധ പ്രവർത്തനങ്ങളിൽ പങ്കാളിയാകൂ. ഡോക്ടർമാർക്കും സന്നദ്ധപ്രവർത്തകർക്കും സ്വാഗതം.',
      form_name: 'പൂർണ്ണ നാമം',
      form_email: 'ഇമെയിൽ വിലാസം',
      form_phone: 'ഫോൺ / വാട്സാപ്പ്',
      form_role: 'താൽപ്പര്യമുള്ള മേഖല',
      form_message: 'സന്ദേശം',
      form_submit: 'അപേക്ഷിക്കുക',

      contact_eyebrow: 'ഞങ്ങൾ നിങ്ങൾക്കൊപ്പമുണ്ട്',
      contact_title: 'ഞങ്ങളുമായി ബന്ധപ്പെടുക',
      contact_sub: 'എന്തെങ്കിലും മാർഗ്ഗനിർദ്ദേശങ്ങൾക്ക് പട്നയിലെ ഞങ്ങളുടെ ഓഫീസുമായി ബന്ധപ്പെടുക.',
      contact_office_title: 'പട്ന രജിസ്റ്റർ ചെയ്ത ഓഫീസ്',
      contact_office_addr: 'വാർഡ് നമ്പർ 8, സത്യഭ നിവാസ്, ഐഎഎസ് നഗർ, പട്ടേൽ ഭവന് സമീപം, പട്ന, ബീഹാർ - 800023',
      contact_helpline_title: 'ഹെൽപ്പ്‌ലൈൻ & വാട്സാപ്പ്',
      contact_landline_title: 'ഓഫീസ് ലാൻഡ്‌ലൈൻ',
      contact_email_title: 'ഔദ്യോഗിക ഇമെയിൽ',
      contact_btn_send: 'സന്ദേശം അയക്കുക',

      donate_title: 'കാൻസർ രോഗികൾക്ക് കൈത്താങ്ങാകൂ',
      donate_sub: 'നിങ്ങളുടെ സംഭാവന പാവപ്പെട്ട രോഗികളുടെ സൗജന്യ ചികിത്സയ്ക്കും മരുന്നുകൾക്കുമായി ഉപയോഗിക്കുന്നു.',
      donate_bank_name: 'ബാങ്ക്: സ്റ്റേറ്റ് ബാങ്ക് ഓഫ് ഇന്ത്യ (SBI)',
      donate_acc_name: 'അക്കൗണ്ട് പേര്: ബീഹാർ കാൻസർ കെയർ ഓർഗനൈസേഷൻ',
      donate_acc_no: 'അക്കൗണ്ട് നമ്പർ: 44908340531',
      donate_ifsc: 'IFSC കോഡ്: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: '80G പ്രകാരം എല്ലാ സംഭാവനകൾക്കും ആദായനികുതി ഇളവ് ലഭിക്കും.',
      donate_btn_copy: 'വിവരങ്ങൾ പകർത്തുക',
      donate_copied: 'പകർത്തി!',

      lang_selector_title: 'ഭാഷ തിരഞ്ഞെടുക്കുക / Select Language',
      lang_selector_sub: 'ഇന്ത്യൻ ഭാഷകൾ മാത്രം • 22 ഔദ്യോഗിക ഭാഷകൾ + ഇന്ത്യൻ ഇംഗ്ലീഷ്',
      lang_search_placeholder: 'ഇന്ത്യൻ ഭാഷ തിരയുക (ഉദാ. മലയാളം, हिन्दी, தமிழ், বাংলা)...',
      lang_auto_btn: 'ഓട്ടോമാറ്റിക് ഡിറ്റക്ഷൻ (ബ്രൗസർ ഡിഫോൾട്ട്)',
      lang_auto_detected: 'ബ്രൗസറിൽ നിന്ന് കണ്ടെത്തിയത്: ',
      lang_enable: 'സജ്ജമാക്കുക',
      lang_active: 'ആക്റ്റീവ്',
      lang_empty: 'നിങ്ങൾ തിരഞ്ഞ ഇന്ത്യൻ ഭാഷ കണ്ടെത്താനായില്ല.',
      lang_footer_note: 'തിരഞ്ഞെടുത്ത ഭാഷ സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു.',

      footer_desc: 'ബീഹാർ കാൻസർ കെയർ ഓർഗനൈസേഷൻ കാൻസർ പ്രതിരോധത്തിനും രോഗി സംരക്ഷണത്തിനുമായി പ്രവർത്തിക്കുന്നു.',
      footer_links: 'പ്രധാന ലിങ്കുകൾ',
      footer_helplines: 'സഹായവാണി',
      footer_disclaimer: 'മെഡിക്കൽ വിവരണം: ഈ വിവരങ്ങൾ പൊതുജന ബോധവൽക്കരണത്തിന് മാത്രമുള്ളതാണ്, ഡോക്ടറുടെ ഉപദേശത്തിന് പകരമല്ല.',
      footer_rights: 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം. ബീഹാർ കാൻസർ കെയർ ഓർഗനൈസേഷൻ (BCCO).'
    },

    // ------------------------------------------------------------------------
    // PUNJABI (ਪੰਜਾਬੀ)
    // ------------------------------------------------------------------------
    'pa': {
      nav_home: 'ਮੁੱਖ ਪੰਨਾ',
      nav_cancer: 'ਕੈਂਸਰ ਬਾਰੇ ਜਾਣੋ',
      nav_news: 'ਮੀਡੀਆ ਅਤੇ ਖ਼ਬਰਾਂ',
      nav_advisory: 'ਸਲਾਹਕਾਰ ਬੋਰਡ',
      nav_certificates: 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਰਟੀਫਿਕੇਟ',
      nav_careers: 'ਕਰੀਅਰ ਅਤੇ ਵਲੰਟੀਅਰ',
      nav_contact: 'ਸੰਪਰਕ ਕਰੋ',
      nav_donate: 'ਦਾਨ ਕਰੋ',
      nav_donate_support: 'ਦਾਨ ਕਰੋ · ਸਾਡੇ ਮਿਸ਼ਨ ਦਾ ਸਾਥ ਦਿਓ',
      skip_link: 'ਮੁੱਖ ਸਮੱਗਰੀ ਤੇ ਜਾਓ',
      brand_name: 'ਬਿਹਾਰ ਕੈਂਸਰ ਕੇਅਰ ਆਰਗੇਨਾਈਜ਼ੇਸ਼ਨ',
      brand_slogan: 'ਸੇਵਾ • ਆਸ • ਜ਼ਿੰਦਗੀ',

      hero_eyebrow: 'ਬਿਹਾਰ ਕੈਂਸਰ ਕੇਅਰ ਆਰਗੇਨਾਈਜ਼ੇਸ਼ਨ',
      hero_title_1: 'ਜਾਗਰੂਕਤਾ ਪਹਿਲਾਂ।',
      hero_title_2: 'ਸਹਿਯੋਗ ਹਮੇਸ਼ਾ।',
      hero_sub: 'ਸਮੇਂ ਸਿਰ ਜਾਂਚ ਦੀ ਸ਼ੁਰੂਆਤ ਜਾਗਰੂਕਤਾ ਨਾਲ ਹੁੰਦੀ ਹੈ। ਬੀਸੀਸੀਓ ਕੈਂਸਰ ਦੇ ਸ਼ੁਰੂਆਤੀ ਲੱਛਣਾਂ ਦੀ ਪਛਾਣ ਕਰਨ ਅਤੇ ਮਰੀਜ਼ਾਂ ਤੇ ਪਰਿਵਾਰਾਂ ਨੂੰ ਹਰ ਕਦਮ ਤੇ ਸਹਾਰਾ ਦੇਣ ਲਈ ਵਚਨਬੱਧ ਹੈ।',
      hero_cta_learn: 'ਕੈਂਸਰ ਬਾਰੇ ਜਾਣੋ',
      hero_cta_initiatives: 'ਸਾਡੀਆਂ ਪਹਿਲਕਦਮੀਆਂ',
      hero_cta_contact: 'ਸੰਪਰਕ ਕਰੋ',
      hero_trust_guidance: 'ਮੁਫ਼ਤ ਅਤੇ ਗੁਪਤ ਸਲਾਹ',
      hero_trust_local: 'ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਜਾਗਰੂਕਤਾ',
      hero_trust_families: 'ਪਰਿਵਾਰਾਂ ਦਾ ਪੂਰਾ ਸਾਥ',

      stat_camps_num: '120+',
      stat_camps_label: 'ਮੁਫ਼ਤ ਜਾਂਚ ਕੈਂਪ',
      stat_camps_sub: 'ਬਿਹਾਰ ਦੇ ਵੱਖ-ਵੱਖ ਜ਼ਿਲ੍ਹਿਆਂ ਵਿੱਚ',
      stat_families_num: '4,500+',
      stat_families_label: 'ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਪਰਿਵਾਰ',
      stat_families_sub: 'ਮੁਫ਼ਤ ਗੁਪਤ ਕੌਂਸਲਿੰਗ',
      stat_districts_num: '38',
      stat_districts_label: 'ਬਿਹਾਰ ਦੇ 38 ਜ਼ਿਲ੍ਹੇ',
      stat_districts_sub: 'ਸਰਗਰਮ ਮੁਹਿੰਮ',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'ਹੈਲਪਲਾਈਨ ਸਹਾਇਤਾ',
      stat_helpline_sub: 'ਹਮਦਰਦਾਨਾ ਸਾਥ',

      about_eyebrow: 'ਸਾਡਾ ਉਦੇਸ਼',
      about_title: 'ਡਰ ਨੂੰ ਗਿਆਨ ਵਿੱਚ ਅਤੇ ਇਕੱਲੇਪਣ ਨੂੰ ਸਹਾਰੇ ਵਿੱਚ ਬਦਲਣਾ',
      about_lead: 'ਕੈਂਸਰ ਦਾ ਪਤਾ ਲੱਗਣ ਤੇ ਘਬਰਾਉਣ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ। ਸ਼ੁਰੂਆਤ ਵਿੱਚ ਪਛਾਣ ਹੋਣ ਤੇ ਕੈਂਸਰ ਦਾ ਪੂਰਾ ਇਲਾਜ ਸੰਭਵ ਹੈ। ਬੀਸੀਸੀਓ ਮਰੀਜ਼ਾਂ ਨੂੰ ਸਹੀ ਹਸਪਤਾਲ ਪਹੁੰਚਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।',
      init_1_title: 'ਮੁਫ਼ਤ ਜਾਗਰੂਕਤਾ ਕੈਂਪ',
      init_1_desc: 'ਪਿੰਡਾਂ ਅਤੇ ਕਸਬਿਆਂ ਵਿੱਚ ਲੱਛਣਾਂ ਅਤੇ ਬਚਾਅ ਬਾਰੇ ਸਪੱਸ਼ਟ ਜਾਣਕਾਰੀ ਦੇਣਾ।',
      init_2_title: 'ਮਰੀਜ਼ ਮਾਰਗਦਰਸ਼ਨ',
      init_2_desc: 'ਬਿਨਾਂ ਦੇਰੀ ਸਹੀ ਹਸਪਤਾਲ ਅਤੇ ਮਾਹਰ ਡਾਕਟਰਾਂ ਤੱਕ ਪਹੁੰਚਣ ਵਿੱਚ ਸਹਾਇਤਾ।',
      init_3_title: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਵਿੱਚ ਮਦਦ',
      init_3_desc: 'ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਅਤੇ ਮੁੱਖ ਮੰਤਰੀ ਰਾਹਤ ਫੰਡ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਸਹਾਇਤਾ।',
      init_4_title: 'ਦੇਖਭਾਲ ਕਰਨ ਵਾਲਿਆਂ ਦੀ ਕੌਂਸਲਿੰਗ',
      init_4_desc: 'ਮਰੀਜ਼ ਦੀ ਸੇਵਾ ਕਰ ਰਹੇ ਪਰਿਵਾਰਕ ਮੈਂਬਰਾਂ ਨੂੰ ਮਾਨਸਿਕ ਹੌਸਲਾ ਦੇਣਾ।',

      cancer_eyebrow: 'ਕੈਂਸਰ ਗਾਈਡ',
      cancer_title: 'ਕੈਂਸਰ ਨੂੰ ਸਮਝੋ: ਲੱਛਣ ਅਤੇ ਜਾਂਚ',
      cancer_lead: 'ਸ਼ੁਰੂਆਤੀ ਪੜਾਅ ਤੇ ਪਤਾ ਲੱਗਣ ਤੇ ਕੈਂਸਰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਠੀਕ ਹੋ ਸਕਦਾ ਹੈ। ਹੇਠਾਂ ਦਿੱਤੇ 7 ਮੁੱਖ ਲੱਛਣਾਂ ਵੱਲ ਧਿਆਨ ਦਿਓ।',
      caution_heading: 'ਕੈਂਸਰ ਦੇ 7 ਮੁੱਖ ਚੇਤਾਵਨੀ ਸੰਕੇਤ (C.A.U.T.I.O.N.)',
      caution_c_title: 'ਮਲ ਜਾਂ ਪਿਸ਼ਾਬ ਦੀਆਂ ਆਦਤਾਂ ਵਿੱਚ ਲਗਾਤਾਰ ਬਦਲਾਅ',
      caution_c_desc: 'ਦੋ ਹਫ਼ਤਿਆਂ ਤੋਂ ਵੱਧ ਦਸਤ, ਕਬਜ਼ ਜਾਂ ਰੰਗ ਵਿੱਚ ਬਦਲਾਅ।',
      caution_a_title: 'ਮੂੰਹ ਜਾਂ ਚਮੜੀ ਦਾ ਜ਼ਖ਼ਮ ਜੋ ਨਾ ਭਰੇ',
      caution_a_desc: 'ਮੂੰਹ ਵਿੱਚ ਚਿੱਟੇ ਜਾਂ ਲਾਲ ਛਾਲੇ, ਖ਼ਾਸ ਕਰਕੇ ਤੰਬਾਕੂ ਖਾਣ ਵਾਲਿਆਂ ਵਿੱਚ।',
      caution_u_title: 'ਅਸਾਧਾਰਨ ਖ਼ੂਨ ਵਹਿਣਾ',
      caution_u_desc: 'ਖੰਘ ਜਾਂ ਪਿਸ਼ਾਬ ਵਿੱਚ ਖ਼ੂਨ ਆਉਣਾ, ਔਰਤਾਂ ਵਿੱਚ ਅਣਚਾਹਿਆ ਖ਼ੂਨ ਵਹਿਣਾ।',
      caution_t_title: 'ਛਾਤੀ ਜਾਂ ਸਰੀਰ ਵਿੱਚ ਦਰਦ ਰਹਿਤ ਰਸੌਲੀ (ਗੰਢ)',
      caution_t_desc: 'ਛਾਤੀ ਜਾਂ ਗਰਦਨ ਵਿੱਚ ਕੋਈ ਵੀ ਸਖ਼ਤ ਗੰਢ ਜੋ ਨਾ ਮਿਟੇ।',
      caution_i_title: 'ਖਾਣਾ ਨਿਗਲਣ ਵਿੱਚ ਤਕਲੀਫ਼ ਜਾਂ ਬਦਹਜ਼ਮੀ',
      caution_i_desc: 'ਗਲੇ ਵਿੱਚ ਖਾਣਾ ਅਟਕਣਾ ਜਾਂ ਲਗਾਤਾਰ ਐਸਿਡਿਟੀ।',
      caution_o_title: 'ਮੱਸੇ ਜਾਂ ਤਿਲ ਦੇ ਆਕਾਰ ਵਿੱਚ ਬਦਲਾਅ',
      caution_o_desc: 'ਤਿਲ ਦਾ ਤੇਜ਼ੀ ਨਾਲ ਵਧਣਾ ਜਾਂ ਉਸ ਵਿੱਚੋਂ ਖ਼ੂਨ ਆਉਣਾ।',
      caution_n_title: 'ਲਗਾਤਾਰ ਖੰਘ ਜਾਂ ਆਵਾਜ਼ ਵਿੱਚ ਭਾਰੀਪਣ',
      caution_n_desc: 'ਤਿੰਨ ਹਫ਼ਤਿਆਂ ਤੋਂ ਵੱਧ ਪੁਰਾਣੀ ਖੰਘ ਜਾਂ ਆਵਾਜ਼ ਦਾ ਬੈਠਣਾ।',

      news_eyebrow: 'ਖ਼ਬਰਾਂ',
      news_title: 'ਮੀਡੀਆ, ਖ਼ਬਰਾਂ ਅਤੇ ਆਸ ਦੀਆਂ ਕਹਾਣੀਆਂ',
      news_lead: 'ਸਿਹਤ ਸੰਬੰਧੀ ਲੇਖ ਅਤੇ ਕੈਂਸਰ ਨੂੰ ਮਾਤ ਦੇਣ ਵਾਲਿਆਂ ਦੀਆਂ ਪ੍ਰੇਰਨਾਦਾਇਕ ਕਹਾਣੀਆਂ ਪੜ੍ਹੋ।',
      filter_all: 'ਸਾਰੇ ਅਪਡੇਟਸ',
      filter_edu: 'ਵਿਦਿਅਕ',
      filter_news: 'ਖ਼ਬਰਾਂ',
      filter_stories: 'ਆਸ ਦੀਆਂ ਕਹਾਣੀਆਂ',
      btn_read_more: 'ਪੂਰਾ ਪੜ੍ਹੋ',
      btn_watch_video: 'ਵੀਡੀਓ ਦੇਖੋ',

      advisory_eyebrow: 'ਸਾਡੀ ਅਗਵਾਈ',
      advisory_title: 'ਸਲਾਹਕਾਰ ਬੋਰਡ',
      advisory_sub: 'ਸੀਨੀਅਰ ਕੈਂਸਰ ਮਾਹਰਾਂ ਅਤੇ ਸਮਾਜ ਸੇਵਕਾਂ ਦੀ ਅਗਵਾਈ ਹੇਠ।',

      cert_eyebrow: 'ਪਾਰਦਰਸ਼ਤਾ',
      cert_title: 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਰਟੀਫਿਕੇਟ',
      cert_sub: '12A, 80G ਅਤੇ CSR ਮਾਨਤਾ ਦੇ ਨਾਲ ਪੂਰੀ ਪਾਰਦਰਸ਼ਤਾ।',
      cert_download: 'ਸਰਟੀਫਿਕੇਟ ਡਾਊਨਲੋਡ ਕਰੋ',
      cert_view: 'ਦਸਤਾਵੇਜ਼ ਦੇਖੋ',

      career_eyebrow: 'ਸਾਡੇ ਨਾਲ ਜੁੜੋ',
      career_title: 'ਕਰੀਅਰ ਅਤੇ ਵਲੰਟੀਅਰ',
      career_sub: 'ਕੈਂਸਰ ਮੁਕਤ ਸਮਾਜ ਦੀ ਸਿਰਜਣਾ ਵਿੱਚ ਸਾਡਾ ਸਾਥ ਦਿਓ। ਡਾਕਟਰਾਂ ਅਤੇ ਵਲੰਟੀਅਰਾਂ ਦਾ ਸਵਾਗਤ ਹੈ।',
      form_name: 'ਪੂਰਾ ਨਾਮ',
      form_email: 'ਈਮੇਲ ਪਤਾ',
      form_phone: 'ਫ਼ੋਨ / ਵਟਸਐਪ',
      form_role: 'ਦਿਲਚਸਪੀ ਦਾ ਖੇਤਰ',
      form_message: 'ਸੁਨੇਹਾ',
      form_submit: 'ਅਰਜ਼ੀ ਭੇਜੋ',

      contact_eyebrow: 'ਅਸੀਂ ਤੁਹਾਡੇ ਨਾਲ ਹਾਂ',
      contact_title: 'ਸਾਡੀ ਟੀਮ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
      contact_sub: 'ਕਿਸੇ ਵੀ ਜਾਣਕਾਰੀ ਲਈ ਪਟਨਾ ਦਫ਼ਤਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।',
      contact_office_title: 'ਪਟਨਾ ਦਫ਼ਤਰ',
      contact_office_addr: 'ਵਾਰਡ ਨੰ. 8, ਸਤਿਆਭਾ ਨਿਵਾਸ, ਆਈਏਐਸ ਨਗਰ, ਪਟੇਲ ਭਵਨ ਕੋਲ, ਪਟਨਾ, ਬਿਹਾਰ - 800023',
      contact_helpline_title: 'ਹੈਲਪਲਾਈਨ ਅਤੇ ਵਟਸਐਪ',
      contact_landline_title: 'ਦਫ਼ਤਰ ਲੈਂਡਲਾਈਨ',
      contact_email_title: 'ਅਧਿਕਾਰਤ ਈਮੇਲ',
      contact_btn_send: 'ਸੁਨੇਹਾ ਭੇਜੋ',

      donate_title: 'ਕੈਂਸਰ ਮਰੀਜ਼ਾਂ ਦੀ ਮਦਦ ਕਰੋ',
      donate_sub: 'ਤੁਹਾਡਾ ਦਾਨ ਗ਼ਰੀਬ ਮਰੀਜ਼ਾਂ ਦੇ ਮੁਫ਼ਤ ਇਲਾਜ ਅਤੇ ਦਵਾਈਆਂ ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।',
      donate_bank_name: 'ਬੈਂਕ: ਸਟੇਟ ਬੈਂਕ ਆਫ਼ ਇੰਡੀਆ (SBI)',
      donate_acc_name: 'ਖਾਤਾ ਨਾਮ: ਬਿਹਾਰ ਕੈਂਸਰ ਕੇਅਰ ਆਰਗੇਨਾਈਜ਼ੇਸ਼ਨ',
      donate_acc_no: 'ਖਾਤਾ ਨੰਬਰ: 44908340531',
      donate_ifsc: 'IFSC ਕੋਡ: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: '80G ਦੇ ਤਹਿਤ ਸਾਰੇ ਦਾਨ ਟੈਕਸ ਮੁਕਤ ਹਨ।',
      donate_btn_copy: 'ਵੇਰਵੇ ਕਾਪੀ ਕਰੋ',
      donate_copied: 'ਕਾਪੀ ਹੋ ਗਿਆ!',

      lang_selector_title: 'ਭਾਸ਼ਾ ਚੁਣੋ / Select Language',
      lang_selector_sub: 'ਸਿਰਫ਼ ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ • 22 ਸੰਵਿਧਾਨਕ ਭਾਸ਼ਾਵਾਂ + ਭਾਰਤੀ ਅੰਗਰੇਜ਼ੀ',
      lang_search_placeholder: 'ਭਾਰਤੀ ਭਾਸ਼ਾ ਖੋਜੋ (ਜਿਵੇਂ ਪੰਜਾਬੀ, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'ਆਟੋਮੈਟਿਕ ਪਛਾਣ (ਬ੍ਰਾਊਜ਼ਰ ਡਿਫ਼ੌਲਟ)',
      lang_auto_detected: 'ਬ੍ਰਾਊਜ਼ਰ ਤੋਂ ਪਛਾਣੀ ਗਈ: ',
      lang_enable: 'ਸਰਗਰਮ ਕਰੋ',
      lang_active: 'ਸਰਗਰਮ',
      lang_empty: 'ਤੁਹਾਡੀ ਖੋਜ ਮੁਤਾਬਕ ਕੋਈ ਭਾਰਤੀ ਭਾਸ਼ਾ ਨਹੀਂ ਮਿਲੀ।',
      lang_footer_note: 'ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਚੋਣ ਸੁਰੱਖਿਅਤ ਰਹਿੰਦੀ ਹੈ।',

      footer_desc: 'ਬਿਹਾਰ ਕੈਂਸਰ ਕੇਅਰ ਆਰਗੇਨਾਈਜ਼ੇਸ਼ਨ ਕੈਂਸਰ ਦੀ ਰੋਕਥਾਮ ਅਤੇ ਮਰੀਜ਼ ਸੇਵਾ ਲਈ ਸਮਰਪਿਤ ਹੈ।',
      footer_links: 'ਮਹੱਤਵਪੂਰਨ ਲਿੰਕ',
      footer_helplines: 'ਹੈਲਪਲਾਈਨ',
      footer_disclaimer: 'ਡਾਕਟਰੀ ਚੇਤਾਵਨੀ: ਇਹ ਜਾਣਕਾਰੀ ਸਿਰਫ਼ ਜਾਗਰੂਕਤਾ ਲਈ ਹੈ, ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਦਾ ਬਦਲ ਨਹੀਂ।',
      footer_rights: 'ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ। ਬਿਹਾਰ ਕੈਂਸਰ ਕੇਅਰ ਆਰਗੇਨਾਈਜ਼ੇਸ਼ਨ (BCCO).'
    },

    // ------------------------------------------------------------------------
    // ODIA (ଓଡ଼ିଆ)
    // ------------------------------------------------------------------------
    'or': {
      nav_home: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
      nav_cancer: 'କର୍କଟ ରୋଗ ବିଷୟରେ ଜାଣନ୍ତୁ',
      nav_news: 'ମିଡିଆ ଏବଂ ସମ୍ବାଦ',
      nav_advisory: 'ଉପଦେଷ୍ଟା ମଣ୍ଡଳୀ',
      nav_certificates: 'ପଞ୍ଜୀକରଣ ପ୍ରମାଣପତ୍ର',
      nav_careers: 'କ୍ୟାରିଅର୍ ଏବଂ ସ୍ୱେଚ୍ଛାସେବୀ',
      nav_contact: 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
      nav_donate: 'ଦାନ କରନ୍ତୁ',
      nav_donate_support: 'ଦାନ କରନ୍ତୁ · ଆମ ମିଶନକୁ ସମର୍ଥନ କରନ୍ତୁ',
      skip_link: 'ମୁଖ୍ୟ ବିଷୟବସ୍ତୁକୁ ଯାଆନ୍ତୁ',
      brand_name: 'ବିହାର କ୍ୟାନ୍ସର କେୟାର ସଂସ୍ଥା',
      brand_slogan: 'ସେବା • ଆଶା • ଜୀବନ',

      hero_eyebrow: 'ବିହାର କ୍ୟାନ୍ସର କେୟାର ସଂସ୍ଥା',
      hero_title_1: 'ସଚେତନତା ପ୍ରଥମେ।',
      hero_title_2: 'ସହଯୋଗ ସର୍ବଦା।',
      hero_sub: 'ପ୍ରାଥମିକ ଚିହ୍ନଟ ସଚେତନତାରୁ ଆରମ୍ଭ ହୁଏ। ବିସିସିଓ ଲୋକଙ୍କୁ କର୍କଟ ରୋଗ ବୁଝିବା, ଲକ୍ଷଣ ଚିହ୍ନିବା ଏବଂ ରୋଗୀ ଓ ପରିବାରକୁ ଉପଯୁକ୍ତ ମାର୍ଗଦର୍ଶନ ପ୍ରଦାନ କରିବାରେ ସାହାଯ୍ୟ କରେ।',
      hero_cta_learn: 'କର୍କଟ ବିଷୟରେ ଜାଣନ୍ତୁ',
      hero_cta_initiatives: 'ଆମର ପଦକ୍ଷେପ',
      hero_cta_contact: 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
      hero_trust_guidance: 'ମାଗଣା ଏବଂ ଗୋପନୀୟ ପରାମର୍ଶ',
      hero_trust_local: 'ନିଜ ଭାଷାରେ ସଚେତନତା',
      hero_trust_families: 'ପରିବାର ପାଇଁ ଅତୁଟ ସାହାରା',

      stat_camps_num: '120+',
      stat_camps_label: 'ମାଗଣା ସଚେତନତା ଶିବିର',
      stat_camps_sub: 'ବିଭିନ୍ନ ଜିଲ୍ଲାରେ ଆୟୋଜିତ',
      stat_families_num: '4,500+',
      stat_families_label: 'ଉପକୃତ ପରିବାର',
      stat_families_sub: 'ମାଗଣା ପରାମର୍ଶ',
      stat_districts_num: '38',
      stat_districts_label: 'ବିହାରର ୩୮ଟି ଜିଲ୍ଲା',
      stat_districts_sub: 'ସକ୍ରିୟ ଗ୍ରାମୀଣ ଅଭିଯାନ',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'ହେଲ୍ପଲାଇନ ସେବା',
      stat_helpline_sub: 'ହାର୍ଦ୍ଦିକ ସହଯୋଗ',

      about_eyebrow: 'ଆମର ଲକ୍ଷ୍ୟ',
      about_title: 'ଭୟକୁ ଜ୍ଞାନରେ ଏବଂ ଏକାକୀପଣକୁ ସହଯୋଗରେ ପରିଣତ କରିବା',
      about_lead: 'କର୍କଟ ରୋଗ ଚିହ୍ନଟ ହେଲେ ପରିବାରରେ ଭୟ ସୃଷ୍ଟି ହୁଏ। ପ୍ରାଥମିକ ଅବସ୍ଥାରେ ଧରାପଡ଼ିଲେ କର୍କଟ ସମ୍ପୂର୍ଣ୍ଣ ଆରୋଗ୍ୟ ହୋଇପାରେ। ବିସିସିଓ ସଠିକ୍ ଚିକିତ୍ସା ପାଇଁ ସାହାଯ୍ୟ କରେ।',
      init_1_title: 'ପ୍ରାଥମିକ ସଚେତନତା ଶିବିର',
      init_1_desc: 'ଗାଁ ଗାଁରେ ଲକ୍ଷଣ ଏବଂ ନିରାକରଣ ବିଷୟରେ ସରଳ ଭାଷାରେ ସୂଚନା।',
      init_2_title: 'ରୋଗୀ ମାର୍ଗଦର୍ଶନ',
      init_2_desc: 'ଉପଯୁକ୍ତ ଡାକ୍ତରଖାନା ଏବଂ ବିଶେଷଜ୍ଞଙ୍କ ନିକଟରେ ଶୀଘ୍ର ପହଞ୍ଚିବା ପାଇଁ ସହାୟତା।',
      init_3_title: 'ସରକାରୀ ଯୋଜନା ସହାୟତା',
      init_3_desc: 'ଆୟୁଷ୍ମାନ ଭାରତ ଏବଂ ମୁଖ୍ୟମନ୍ତ୍ରୀ ରିଲିଫ୍ ପାଣ୍ଠି ପାଇବାରେ ସାହାଯ୍ୟ।',
      init_4_title: 'ସେବାକାରୀ ପରାମର୍ଶ',
      init_4_desc: 'ରୋଗୀଙ୍କ ସେବା କରୁଥିବା ପରିବାର ସଦସ୍ୟଙ୍କୁ ମାନସିକ ସାହସ ପ୍ରଦାନ।',

      cancer_eyebrow: 'କର୍କଟ ନିର୍ଦ୍ଦେଶିକା',
      cancer_title: 'କର୍କଟକୁ ବୁଝନ୍ତୁ: ଲକ୍ଷଣ ଏବଂ ପଦକ୍ଷେପ',
      cancer_lead: 'କର୍କଟ ରୋଗ ହେଲେ ଭାଙ୍ଗି ପଡ଼ିବାର ଆବଶ୍ୟକତା ନାହିଁ। ପ୍ରାଥମିକ ସ୍ତରରେ ଧରାପଡ଼ିଲେ ଚିକିତ୍ସା ସମ୍ଭବ। ନିମ୍ନ ୭ଟି ମୁଖ୍ୟ ଲକ୍ଷଣ ଉପରେ ଧ୍ୟାନ ଦିଅନ୍ତୁ।',
      caution_heading: 'କର୍କଟ ରୋଗର ୭ଟି ପ୍ରମୁଖ ସତର୍କତା ସଙ୍କେତ (C.A.U.T.I.O.N.)',
      caution_c_title: 'ଝାଡ଼ା କିମ୍ବା ପରିସ୍ରା ଅଭ୍ୟାସରେ କ୍ରମାଗତ ପରିବର୍ତ୍ତନ',
      caution_c_desc: 'ଦୁଇ ସପ୍ତାହରୁ ଅଧିକ ସମୟ ଧରି ତରଳ ଝାଡ଼ା, କୋଷ୍ଠକାଠିନ୍ୟ କିମ୍ବା ରଙ୍ଗ ପରିବର୍ତ୍ତନ।',
      caution_a_title: 'ଶୀଘ୍ର ନ ଶୁଖୁଥିବା ଘା କିମ୍ବା ଖଣ୍ଡିଆ',
      caution_a_desc: 'ପାଟିରେ ଧଳା କିମ୍ବା ନାଲି ଦାଗ, ବିଶେଷ କରି ଗୁଟଖା ବ୍ୟବହାରକାରୀଙ୍କ କ୍ଷେତ୍ରରେ।',
      caution_u_title: 'ଅସ୍ୱାଭାବିକ ରକ୍ତସ୍ରାବ',
      caution_u_desc: 'କାଶରେ କିମ୍ବା ପରିସ୍ରାରେ ରକ୍ତ ପଡ଼ିବା, ମହିଳାଙ୍କ କ୍ଷେତ୍ରରେ ଅସ୍ୱାଭାବିକ ରକ୍ତସ୍ରାବ।',
      caution_t_title: 'ସ୍ତନ କିମ୍ବା ଶରୀରରେ ଯନ୍ତ୍ରଣାହୀନ ଗୋଲା ବା ଗଣ୍ଠି',
      caution_t_desc: 'ସ୍ତନ, ବେକ କିମ୍ବା କାଖରେ ନ ମିଳାଉଥିବା ଟାଣ ଗୋଲା।',
      caution_i_title: 'ଖାଦ୍ୟ ଗିଳିବାରେ କଷ୍ଟ କିମ୍ବା ହଜମ ନ ହେବା',
      caution_i_desc: 'ଗଳାରେ ଖାଦ୍ୟ ଅଟକିବା କିମ୍ବା କ୍ରମାଗତ ଏସିଡିଟି।',
      caution_o_title: 'ଯାଦୁ କିମ୍ବା କଳାଜାଇର ଆକାର-ରଙ୍ଗରେ ପରିବର୍ତ୍ତନ',
      caution_o_desc: 'କଳାଜାଇ ଶୀଘ୍ର ବଢ଼ିବା କିମ୍ବା ସେଥିରୁ ରକ୍ତ ବାହାରିବା।',
      caution_n_title: 'କ୍ରମାଗତ କାଶ କିମ୍ବା ସ୍ୱରରେ ପରିବର୍ତ୍ତନ',
      caution_n_desc: 'ତିନି ସପ୍ତାହରୁ ଅଧିକ ସମୟ ଧରି କାଶ କିମ୍ବା ଭଙ୍ଗା ସ୍ୱର।',

      news_eyebrow: 'ଖବର',
      news_title: 'ମିଡିଆ, ସମ୍ବାଦ ଏବଂ ପ୍ରେରଣାଦାୟୀ କାହାଣୀ',
      news_lead: 'ସ୍ୱାସ୍ଥ୍ୟ ସମ୍ପର୍କିତ ଲେଖା ଏବଂ କର୍କଟକୁ ଜୟ କରିଥିବା ଲୋକଙ୍କ ଅନୁଭୂତି ପଢ଼ନ୍ତୁ।',
      filter_all: 'ସମସ୍ତ ଅପଡେଟ୍',
      filter_edu: 'ଶିକ୍ଷଣୀୟ',
      filter_news: 'ସମ୍ବାଦ',
      filter_stories: 'ଆଶାର କାହାଣୀ',
      btn_read_more: 'ସମ୍ପୂର୍ଣ୍ଣ ପଢ଼ନ୍ତୁ',
      btn_watch_video: 'ଭିଡିଓ ଦେଖନ୍ତୁ',

      advisory_eyebrow: 'ନେତୃତ୍ୱ',
      advisory_title: 'ଉପଦେଷ୍ଟା ମଣ୍ଡଳୀ',
      advisory_sub: 'ବରିଷ୍ଠ କର୍କଟ ରୋଗ ବିଶେଷଜ୍ଞ ଏବଂ ସମାଜସେବୀଙ୍କ ମାର୍ଗଦର୍ଶନରେ।',

      cert_eyebrow: 'ସ୍ୱଚ୍ଛତା',
      cert_title: 'ପଞ୍ଜୀକରଣ ପ୍ରମାଣପତ୍ର',
      cert_sub: '12A, 80G ଏବଂ CSR ସାର୍ଟିଫିକେଟ୍ ସହିତ ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱଚ୍ଛତା।',
      cert_download: 'ପ୍ରମାଣପତ୍ର ଡାଉନଲୋଡ୍',
      cert_view: 'ନଥି ଦେଖନ୍ତୁ',

      career_eyebrow: 'ଆମ ସହିତ ଯୋଡ଼ି ହୁଅନ୍ତୁ',
      career_title: 'କ୍ୟାରିଅର୍ ଏବଂ ସ୍ୱେଚ୍ଛାସେବୀ',
      career_sub: 'କର୍କଟ ମୁକ୍ତ ସମାଜ ଗଠନରେ ଆମ ସହ ଯୋଡ଼ି ହୁଅନ୍ତୁ। ଡାକ୍ତର ଓ ସ୍ୱେଚ୍ଛାସେବୀଙ୍କୁ ସ୍ୱାଗତ।',
      form_name: 'ପୂରା ନାମ',
      form_email: 'ଇମେଲ୍ ଠିକଣା',
      form_phone: 'ଫୋନ୍ / ହ୍ୱାଟ୍ସଆପ୍',
      form_role: 'ଆଗ୍ରହର କ୍ଷେତ୍ର',
      form_message: 'ବାର୍ତ୍ତା',
      form_submit: 'ଆବେଦନ ପଠାନ୍ତୁ',

      contact_eyebrow: 'ଆମେ ଆପଣଙ୍କ ସହିତ ଅଛୁ',
      contact_title: 'ଆମ ଟିମ୍ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ',
      contact_sub: 'ଯେକୌଣସି ସୂଚନା ପାଇଁ ପାଟନାସ୍ଥିତ କାର୍ଯ୍ୟାଳୟ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
      contact_office_title: 'ପାଟନା ପଞ୍ଜୀକୃତ କାର୍ଯ୍ୟାଳୟ',
      contact_office_addr: 'ୱାର୍ଡ ନଂ ୮, ସତ୍ୟଭା ନିବାସ, ଆଇଏଏସ୍ ନଗର, ପଟେଲ ଭବନ ନିକଟ, ପାଟନା, ବିହାର - ୮୦୦୦୨୩',
      contact_helpline_title: 'ହେଲ୍ପଲାଇନ ଏବଂ ହ୍ୱାଟ୍ସଆପ୍',
      contact_landline_title: 'କାର୍ଯ୍ୟାଳୟ ଲ୍ୟାଣ୍ଡଲାଇନ୍',
      contact_email_title: 'ସରକାରୀ ଇମେଲ୍',
      contact_btn_send: 'ବାର୍ତ୍ତା ପଠାନ୍ତୁ',

      donate_title: 'କର୍କଟ ରୋଗୀଙ୍କୁ ସାହାଯ୍ୟ କରନ୍ତୁ',
      donate_sub: 'ଆପଣଙ୍କ ଦାନ ଗରିବ ରୋଗୀଙ୍କ ମାଗଣା ଚିକିତ୍ସା ଓ ଔଷଧରେ ବ୍ୟବହୃତ ହୁଏ।',
      donate_bank_name: 'ବ୍ୟାଙ୍କ: ଷ୍ଟେଟ୍ ବ୍ୟାଙ୍କ ଅଫ୍ ଇଣ୍ଡିଆ (SBI)',
      donate_acc_name: 'ଖାତା ନାମ: ବିହାର କ୍ୟାନ୍ସର କେୟାର ସଂସ୍ଥା',
      donate_acc_no: 'ଖାତା ନମ୍ବର: 44908340531',
      donate_ifsc: 'IFSC କୋଡ୍: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: '80G ଅଧୀନରେ ସମସ୍ତ ଦାନ ଆୟକର ମୁକ୍ତ।',
      donate_btn_copy: 'ବିବରଣୀ କପି କରନ୍ତୁ',
      donate_copied: 'କପି ହୋଇଗଲା!',

      lang_selector_title: 'ଭାଷା ବାଛନ୍ତୁ / Select Language',
      lang_selector_sub: 'କେବଳ ଭାରତୀୟ ଭାଷା • ୨୨ଟି ସମ୍ବିଧାନ ସ୍ୱୀକୃତ ଭାଷା + ଭାରତୀୟ ଇଂରାଜୀ',
      lang_search_placeholder: 'ଭାରତୀୟ ଭାଷା ଖୋଜନ୍ତୁ (ଯଥା ଓଡ଼ିଆ, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'ସ୍ୱୟଂଚାଳିତ ଚିହ୍ନଟ (ବ୍ରାଉଜର୍ ଡିଫଲ୍ଟ)',
      lang_auto_detected: 'ବ୍ରାଉଜରରୁ ଚିହ୍ନଟ: ',
      lang_enable: 'ସକ୍ରିୟ କରନ୍ତୁ',
      lang_active: 'ସକ୍ରିୟ',
      lang_empty: 'ଆପଣଙ୍କ ସନ୍ଧାନ ଅନୁଯାୟୀ କୌଣସି ଭାରତୀୟ ଭାଷା ମିଳିଲା ନାହିଁ।',
      lang_footer_note: 'ଆପଣଙ୍କ ଭାଷା ପସନ୍ଦ ସୁରକ୍ଷିତ ଭାବେ ସାଇତା ହୋଇ ରହେ।',

      footer_desc: 'ବିହାର କ୍ୟାନ୍ସର କେୟାର ସଂସ୍ଥା କର୍କଟ ନିରାକରଣ ଏବଂ ରୋଗୀ ସେବାରେ ଉତ୍ସର୍ଗୀକୃତ।',
      footer_links: 'ଦ୍ରୁତ ଲିଙ୍କ୍',
      footer_helplines: 'ହେଲ୍ପଲାଇନ',
      footer_disclaimer: 'ଚିକିତ୍ସା ସତର୍କତା: ଏହି ସୂଚନା କେବଳ ସଚେତନତା ପାଇଁ, ଡାକ୍ତରୀ ପରାମର୍ଶର ବିକଳ୍ପ ନୁହେଁ।',
      footer_rights: 'ସର୍ବସ୍ୱତ୍ୱ ସଂରକ୍ଷିତ। ବିହାର କ୍ୟାନ୍ସର କେୟାର ସଂସ୍ଥା (BCCO).'
    },

    // ------------------------------------------------------------------------
    // ASSAMESE (অসমীয়া)
    // ------------------------------------------------------------------------
    'as': {
      nav_home: 'গৃহ',
      nav_cancer: 'কৰ্কଟ ৰোগৰ বিষয়ে জানক',
      nav_news: 'মাধ্যম আৰু বাতৰি',
      nav_advisory: 'উপদেষ্টা পৰিষদ',
      nav_certificates: 'পঞ্জীয়ন প্ৰমাণপত্ৰ',
      nav_careers: 'কেৰিয়াৰ আৰু স্বেচ্ছাসেৱা',
      nav_contact: 'যোগাযোগ',
      nav_donate: 'দান কৰক',
      nav_donate_support: 'দান কৰক · আমাৰ সংকল্পক সহায় কৰক',
      skip_link: 'মূল বিষয়বস্তুলৈ যাওক',
      brand_name: 'বিহাৰ কেন্সাৰ কেয়াৰ অৰ্গেনাইজেশ্যন',
      brand_slogan: 'সেৱা • আশা • জীৱন',

      hero_eyebrow: 'বিহাৰ কেন্সাৰ কেয়াৰ অৰ্গেনাইজেশ্যন',
      hero_title_1: 'সচেতনতা প্ৰথম।',
      hero_title_2: 'সহায় সদায়।',
      hero_sub: 'প্ৰাৰম্ভিক চিনাক্তকৰণ সচেতনতাৰ সৈতে আৰম্ভ হয়। বিচিচিঅ’ই ৰোগী আৰু পৰিয়ালক সময়মতে সঠিক পথ প্ৰদৰ্শন আৰু সহায় কৰিবলৈ নিষ্ঠাৰে কাম কৰি আছে।',
      hero_cta_learn: 'কৰ্কট ৰোগৰ বিষয়ে জানক',
      hero_cta_initiatives: 'আমাৰ পদক্ষেপ',
      hero_cta_contact: 'যোগাযোগ কৰক',
      hero_trust_guidance: 'বিনামূলীয়া আৰু গোপনীয় পৰামৰ্শ',
      hero_trust_local: 'স্থানীয় ভাষাত সচেতনতা',
      hero_trust_families: 'পৰিয়ালৰ লগত নিৰৱচ্ছিন্ন সংগ',

      stat_camps_num: '120+',
      stat_camps_label: 'বিনামূলীয়া সজাগতা শিবিৰ',
      stat_camps_sub: 'বিহাৰৰ বিভিন্ন জিলাত অনুষ্ঠিত',
      stat_families_num: '4,500+',
      stat_families_label: 'উপকৃত পৰিয়ালসমূহ',
      stat_families_sub: 'বিনামূলীয়া মানসিক পৰামৰ্শ',
      stat_districts_num: '38',
      stat_districts_label: 'বিহাৰৰ ৩৮ খন জিলা',
      stat_districts_sub: 'সক্ৰিয় তৃণমূল প্ৰচেষ্টা',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'সহায়তা নম্বৰ',
      stat_helpline_sub: 'আন্তৰিক সহায়',

      about_eyebrow: 'আমাৰ উদ্দেশ্য',
      about_title: 'ভয়ক জ্ঞান আৰু নিসংগতাক সহমৰ্মিতালৈ ৰূপান্তৰ',
      about_lead: 'সময়মতে লক্ষণসমূহ চিনাক্ত হ’লে কৰ্কট ৰোগৰ সম্পূৰ্ণ আৰোগ্য সম্ভৱ। বিচিচিঅ’ই সঠিক চিকিৎসালয় আৰু উপযুক্ত বিশেষজ্ঞৰ ওচৰ পোৱাত সহায় কৰে।',
      init_1_title: 'প্ৰাৰম্ভিক সজাগতা শিবিৰ',
      init_1_desc: 'গাঁৱে-ভূঞে লক্ষণ আৰু প্ৰতিৰোধৰ বিষয়ে সৰল ভাষাত তথ্য প্ৰদান।',
      init_2_title: 'ৰোগী পথপ্ৰদৰ্শন',
      init_2_desc: 'সঠিক চিকিৎসালয় আৰু কৰ্কট বিশেষজ্ঞৰ ওচৰলৈ পলম নকৰাকৈ যোৱাত সহায়।',
      init_3_title: 'চৰকাৰী আঁচনি সহায়',
      init_3_desc: 'আয়ুষ্মান ভাৰত আৰু মুখ্যমন্ত্ৰী সাহায্য পুঁজি পোৱাত সহায় কৰা।',
      init_4_title: 'পৰিচর্যাকাৰীৰ মানসিক শক্তি',
      init_4_desc: 'ৰোগীৰ কাষত থকা আত্মীয়সকলক মানসিক আৰু নৈতিক সমৰ্থন দিয়া।',

      cancer_eyebrow: 'কৰ্কট নিৰ্দেশিকা',
      cancer_title: 'কৰ্কট ৰোগ বুজি লওক: লক্ষণ আৰু সাৱধানতা',
      cancer_lead: 'কৰ্কট ৰোগ মানেই জীৱন শেষ নহয়। প্ৰাৰম্ভিক পৰ্যায়ত ধৰা পৰিলে আৰোগ্য সম্ভৱ। তলত উল্লেখ কৰা ৭ টা সতৰ্কবাণী মন কৰক।',
      caution_heading: 'কৰ্কট ৰোগৰ ৭ টা মূল সতৰ্কবাণী (C.A.U.T.I.O.N.)',
      caution_c_title: 'শৌচ বা প্ৰস্ৰাৱৰ অভ্যাসত ধাৰাবাহিক পৰিৱৰ্তন',
      caution_c_desc: 'দুসপ্তাহতকৈ অধিক সময় ডায়েৰিয়া, কোষ্ঠকাঠিন্য বা ৰং সলনি হোৱা।',
      caution_a_title: 'মুখ বা ছালত সহজে নুশুকুৱা ঘা',
      caution_a_desc: 'মুখত বগা বা ৰঙা দাগ, বিশেষকৈ ধঁপাত সেৱনকাৰীসকলৰ মাজত।',
      caution_u_title: 'অস্বাভাৱিক ৰক্তক্ষৰণ',
      caution_u_desc: 'কাহোতে বা প্ৰস্ৰাৱত তেজ ওলোৱা, মহিলাৰ অস্বাভাৱিক ৰক্তস্ৰাৱ।',
      caution_t_title: 'স্তন বা শৰীৰত বিষহীন টেমুনা বা গাঁঠি',
      caution_t_desc: 'স্তন, ডিঙি বা কাষলতিত টান গাঁঠি যি মিলি নাযায়।',
      caution_i_title: 'খাদ্য গিলাত কষ্ট বা বদহজম',
      caution_i_desc: 'ডিঙিত খাদ্য লাগি ধৰাৰ অনুভৱ বা অহৰহ এচিডিটি।',
      caution_o_title: 'আঁচিল বা তিলৰ আকাৰ-ৰং সলনি',
      caution_o_desc: 'তিল দ্ৰুতগতিত বৃদ্ধি পোৱা বা তাৰ পৰা তেজ ওলোৱা।',
      caution_n_title: 'অবিৰত কাহ বা মাত ভগা',
      caution_n_desc: 'তিনি সপ্তাহতকৈ অধিক সময় কাহ বা মাত ভাঙি থকা।',

      news_eyebrow: 'বাতৰি',
      news_title: 'মাধ্যম, বাতৰি আৰু প্ৰেৰণাদায়ক কাহিনী',
      news_lead: 'স্বাস্থ্য সহায়িকা আৰু কৰ্কট ৰোগক জয় কৰাসকলৰ সাহসৰ কাহিনী পঢ়ক।',
      filter_all: 'সকলো বাতৰি',
      filter_edu: 'শিক্ষামূলক',
      filter_news: 'বাতৰি',
      filter_stories: 'আশাৰ কাহিনী',
      btn_read_more: 'সম্পূৰ্ণ পঢ়ক',
      btn_watch_video: 'ভিডিঅ’ চাওক',

      advisory_eyebrow: 'আমাৰ নেতৃত্ব',
      advisory_title: 'উপদেষ্টা পৰিষদ',
      advisory_sub: 'জ্যেষ্ঠ কৰ্কট ৰোগ বিশেষজ্ঞ আৰু সমাজকৰ্মীসকলৰ নিৰ্দেশনাত।',

      cert_eyebrow: 'স্বচ্ছতা',
      cert_title: 'পঞ্জীয়ন প্ৰমাণপত্ৰ',
      cert_sub: '12A, 80G আৰু CSR স্বীকৃতিৰে সম্পূৰ্ণ স্বচ্ছতাৰে পৰিচালিত।',
      cert_download: 'প্ৰমাণপত্ৰ ডাউনলোড',
      cert_view: 'নথি চাওক',

      career_eyebrow: 'আমাৰ সৈতে যোগ দিয়ক',
      career_title: 'কেৰিয়াৰ আৰু স্বেচ্ছাসেৱা',
      career_sub: 'কৰ্কট সচেতনতা অভিযানত আমাক সহায় কৰক। চিকিৎসক আৰু স্বেচ্ছাসেৱকৰ সাদৰ সম্ভাষণ।',
      form_name: 'সম্পূৰ্ণ নাম',
      form_email: 'ইমেইল ঠিকনা',
      form_phone: 'ফোন / হোৱাটছএপ',
      form_role: 'আগ্ৰহৰ ক্ষেত্ৰ',
      form_message: 'বাৰ্তা',
      form_submit: 'আৱেদন জমা দিয়ক',

      contact_eyebrow: 'আমি আপোনাৰ কাষত',
      contact_title: 'আমাৰ দলৰ সৈতে যোগাযোগ কৰক',
      contact_sub: 'যিকোনো দিহা-পৰামৰ্শৰ বাবে পাটনাৰ কাৰ্যালয়ৰ লগত যোগাযোগ কৰক।',
      contact_office_title: 'পাটনাৰ পঞ্জীভুক্ত কাৰ্যালয়',
      contact_office_addr: 'ৱাৰ্ড নং ৮, সত্যভা নিৱাস, আইএএছ নগৰ, পেটেল ভৱনৰ কাষত, পাটনা, বিহাৰ - ৮০০০২৩',
      contact_helpline_title: 'সহায়তা নম্বৰ আৰু হোৱাটছএপ',
      contact_landline_title: 'কাৰ্যালয়ৰ লেণ্ডলাইন',
      contact_email_title: 'চৰকাৰী ইমেইল',
      contact_btn_send: 'বাৰ্তা প্ৰেৰণ কৰক',

      donate_title: 'কৰ্কট ৰোগীক সহায় কৰক',
      donate_sub: 'আপোনাৰ দানে দুখীয়া ৰোগীৰ বিনামূলীয়া চিকিৎসা আৰু ঔষধত সহায় কৰে।',
      donate_bank_name: 'বেংক: ষ্টেট বেংক অৱ ইণ্ডিয়া (SBI)',
      donate_acc_name: 'একাউণ্টৰ নাম: বিহাৰ কেন্সাৰ কেয়াৰ অৰ্গেনাইজেশ্যন',
      donate_acc_no: 'একাউণ্ট নম্বৰ: 44908340531',
      donate_ifsc: 'IFSC ক’ড: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: '80G অধীনত সকলো দান কৰমুক্ত।',
      donate_btn_copy: 'বিৱৰণ কপি কৰক',
      donate_copied: 'কপি কৰা হ’ল!',

      lang_selector_title: 'ভাষা বাছনি কৰক / Select Language',
      lang_selector_sub: 'কেৱল ভাৰতীয় ভাষা • ২২ খন সাংবিধানিক ভাষা + ভাৰতীয় ইংৰাজী',
      lang_search_placeholder: 'ভাৰতীয় ভাষা বিচাৰক (যেনে অসমীয়া, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'স্বয়ংক্ৰিয় চিনাক্তকৰণ (ব্ৰাউজাৰ ডিফল্ট)',
      lang_auto_detected: 'ব্ৰাউজাৰৰ পৰা চিনাক্ত: ',
      lang_enable: 'সক্ৰিয় কৰক',
      lang_active: 'সক্ৰিয়',
      lang_empty: 'আপোনাৰ সন্ধানৰ লগত মিলা কোনো ভাৰতীয় ভাষা পোৱা নগ’ল।',
      lang_footer_note: 'আপোনাৰ ভাষাৰ পছন্দ সুৰক্ষিতভাৱে সংৰক্ষিত থাকে।',

      footer_desc: 'বিহাৰ কেন্সাৰ কেয়াৰ অৰ্গেনাইজেশ্যন কৰ্কট প্ৰতিৰোধ আৰু ৰোগী সেৱাৰ বাবে নিষ্ঠাবান।',
      footer_links: 'প্ৰয়োজনীয় লিংক',
      footer_helplines: 'সহায়তা নম্বৰ',
      footer_disclaimer: 'চিকিৎসা সতৰ্কবাণী: এই তথ্য কেৱল সজাগতাৰ বাবেহে, কোনো ডাক্তৰী পৰামৰ্শৰ বিকল্প নহয়।',
      footer_rights: 'সকলো অধিকাৰ সংৰক্ষিত। বিহাৰ কেন্সাৰ কেয়াৰ অৰ্গেনাইজেশ্যন (BCCO).'
    },

    // ------------------------------------------------------------------------
    // NEPALI (नेपाली)
    // ------------------------------------------------------------------------
    'ne': {
      nav_home: 'गृह पृष्ठ',
      nav_cancer: 'क्यान्सर बारे जान्नुहोस्',
      nav_news: 'मिडिया र समाचार',
      nav_advisory: 'सल्लाहकार परिषद',
      nav_certificates: 'दर्ता प्रमाणपत्र',
      nav_careers: 'करियर र स्वयंसेवा',
      nav_contact: 'सम्पर्क गर्नुहोस्',
      nav_donate: 'दान गर्नुहोस्',
      nav_donate_support: 'दान गर्नुहोस् · हाम्रो अभियानलाई साथ दिनुहोस्',
      skip_link: 'मुख्य सामग्रीमा जानुहोस्',
      brand_name: 'बिहार क्यान्सर केयर अर्गनाइजेसन',
      brand_slogan: 'सेवा • आशा • जीवन',

      hero_eyebrow: 'बिहार क्यान्सर केयर अर्गनाइजेसन',
      hero_title_1: 'सचेतना पहिले।',
      hero_title_2: 'सहयोग सधैं।',
      hero_sub: 'समयमै पहिचान हुनु सचेतनाबाट सुरु हुन्छ। बीसीसीओले बिरामी र परिवारहरूलाई क्यान्सर बुझ्न, प्रारम्भिक लक्षणहरू पहिचान गर्न र सही परामर्श पाउन मद्दत गर्दछ।',
      hero_cta_learn: 'क्यान्सर बारे जान्नुहोस्',
      hero_cta_initiatives: 'हाम्रा पहलहरू',
      hero_cta_contact: 'सम्पर्क गर्नुहोस्',
      hero_trust_guidance: 'निःशुल्क र गोप्य परामर्श',
      hero_trust_local: 'स्थानीय भाषामा सचेतना',
      hero_trust_families: 'परिवारको निरन्तर साथ',

      stat_camps_num: '120+',
      stat_camps_label: 'निःशुल्क सचेतना शिविर',
      stat_camps_sub: 'विभिन्न जिल्लाहरूमा आयोजित',
      stat_families_num: '4,500+',
      stat_families_label: 'मार्गदर्शन पाएका परिवारहरू',
      stat_families_sub: 'निःशुल्क गोप्य काउन्सिलिङ',
      stat_districts_num: '38',
      stat_districts_label: 'बिहारका ३८ जिल्लाहरू',
      stat_districts_sub: 'सक्रिय तल्लो तहको अभियान',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'हेल्पलाइन सेवा',
      stat_helpline_sub: 'सहानुभूतिपूर्ण सहयोग',

      about_eyebrow: 'हाम्रो उद्देश्य',
      about_title: 'डरलाई ज्ञानमा र एक्लोपनलाई साथमा बदल्ने प्रयास',
      about_lead: 'क्यान्सरको लक्षण समयमै पहिचान भएमा धेरैजसो क्यान्सर पूर्ण निको हुन सक्छन्। बीसीसीओले बिरामीलाई सही अस्पताल र डाक्टरसम्म पुग्न बाटो देखाउँछ।',
      init_1_title: 'प्रारम्भिक सचेतना शिविर',
      init_1_desc: 'गाउँ-सहरमा लक्षण र रोकथाम बारे स्पष्ट जानकारी दिनु।',
      init_2_title: 'बिरामी मार्गदर्शन सेवा',
      init_2_desc: 'सही अस्पताल र विशेषज्ञ डाक्टरहरूसम्म समयमै पुग्न मद्दत।',
      init_3_title: 'सरकारी योजना सहायता',
      init_3_desc: 'आयुष्मान भारत र मुख्यमन्त्री राहत कोष प्राप्त गर्न सहयोग।',
      init_4_title: 'हेरचाहकर्ता परामर्श',
      init_4_desc: 'बिरामीको कुरुवा बस्ने परिवारका सदस्यलाई मानसिक ढाडस दिनु।',

      cancer_eyebrow: 'क्यान्सर निर्देशिका',
      cancer_title: 'क्यान्सर बुझौं: लक्षण र सावधानी',
      cancer_lead: 'क्यान्सरबाट डराउनु पर्दैन। समयमै जाँच गराएमा उपचार सम्भव छ। मुख्य ७ चेतावनी लक्षणहरूमा ध्यान दिनुहोस्।',
      caution_heading: 'क्यान्सरका ७ मुख्य चेतावनी संकेतहरू (C.A.U.T.I.O.N.)',
      caution_c_title: 'दिसा वा पिसाबको बानीमा लगातार परिवर्तन',
      caution_c_desc: 'दुई हप्ताभन्दा बढी समय पखाला, कब्जियत वा रङमा परिवर्तन।',
      caution_a_title: 'मुख वा छालामा ननिको हुने घाउ',
      caution_a_desc: 'मुखमा सेतो वा रातो दाग, विशेषगरी सुर्ती-गुट्खा सेवन गर्नेहरूमा।',
      caution_u_title: 'असामान्य रक्तस्राव वा स्राव',
      caution_u_desc: 'खोकी वा पिसाबमा रगत देखिनु, महिलाहरूमा असामान्य रक्तस्राव।',
      caution_t_title: 'स्तन वा शरीरमा नदुख्ने गिर्खा वा गाँठो',
      caution_t_desc: 'स्तन, घाँटी वा काखीमा नबिलाउने कडा गिर्खा।',
      caution_i_title: 'खाना निल्न गाह्रो हुनु वा अपच',
      caution_i_desc: 'घाँटीमा खाना अड्किएको महसुस हुनु वा कडा एसिडिटी।',
      caution_o_title: 'कोठी वा मुसाको आकार-रङमा परिवर्तन',
      caution_o_desc: 'कोठी छिटो बढ्नु वा रगत बग्नु।',
      caution_n_title: 'लगातार खोकी वा स्वर धोद्रो हुनु',
      caution_n_desc: 'तीन हप्ताभन्दा बढी समय खोकी लाग्नु वा स्वर भासिनु।',

      news_eyebrow: 'समाचार',
      news_title: 'मिडिया, समाचार र प्रेरणादायी कथाहरू',
      news_lead: 'स्वास्थ्य निर्देशिका र क्यान्सर जित्ने योद्धाहरूका कथाहरू पढ्नुहोस्।',
      filter_all: 'सबै अपडेट',
      filter_edu: 'शैक्षिक',
      filter_news: 'समाचार',
      filter_stories: 'आशाका कथाहरू',
      btn_read_more: 'पूरा पढ्नुहोस्',
      btn_watch_video: 'भिडियो हेर्नुहोस्',

      advisory_eyebrow: 'हाम्रो नेतृत्व',
      advisory_title: 'सल्लाहकार परिषद',
      advisory_sub: 'वरिष्ठ क्यान्सर विशेषज्ञ र समाजसेवीहरूको मार्गदर्शनमा।',

      cert_eyebrow: 'पारदर्शिता',
      cert_title: 'दर्ता प्रमाणपत्रहरू',
      cert_sub: '12A, 80G र CSR प्रमाणीकरण सहित पूर्ण पारदर्शी रूपमा सञ्चालित।',
      cert_download: 'प्रमाणपत्र डाउनलोड',
      cert_view: 'कागजात हेर्नुहोस्',

      career_eyebrow: 'हामीसँग जोडिनुहोस्',
      career_title: 'करियर र स्वयंसेवा',
      career_sub: 'क्यान्सर सचेतनाको कार्यमा हामीलाई साथ दिनुहोस्। डाक्टर र स्वयंसेवकहरूको स्वागत छ।',
      form_name: 'पूरा नाम',
      form_email: 'इमेल',
      form_phone: 'फोन / ह्वाट्सएप',
      form_role: 'रुचिको क्षेत्र',
      form_message: 'सन्देश',
      form_submit: 'आवेदन पठाउनुहोस्',

      contact_eyebrow: 'हामी तपाईंको साथमा छौं',
      contact_title: 'हाम्रो टोलीलाई सम्पर्क गर्नुहोस्',
      contact_sub: 'कुनै पनि जानकारीको लागि पटनास्थित कार्यालयमा सम्पर्क गर्नुहोस्।',
      contact_office_title: 'पटना दर्ता कार्यालय',
      contact_office_addr: 'वार्ड नं. ८, सत्यभा निवास, आईएएस नगर, पटेल भवन नजिक, पटना, बिहार - ८०००२३',
      contact_helpline_title: 'हेल्पलाइन र ह्वाट्सएप',
      contact_landline_title: 'कार्यालय ल्यान्डलाइन',
      contact_email_title: 'आधिकारिक इमेल',
      contact_btn_send: 'सन्देश पठाउनुहोस्',

      donate_title: 'क्यान्सर बिरामीहरूलाई सहयोग गर्नुहोस्',
      donate_sub: 'तपाईंको सानो दानले विपन्न बिरामीको निःशुल्क उपचार र औषधिमा मद्दत पुग्छ।',
      donate_bank_name: 'बैंक: स्टेट बैंक अफ इन्डिया (SBI)',
      donate_acc_name: 'खाता नाम: बिहार क्यान्सर केयर अर्गनाइजेसन',
      donate_acc_no: 'खाता नम्बर: 44908340531',
      donate_ifsc: 'IFSC कोड: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: '80G अन्तर्गत सबै दान करमुक्त छन्।',
      donate_btn_copy: 'विवरण कपी गर्नुहोस्',
      donate_copied: 'कपी भयो!',

      lang_selector_title: 'भाषा छान्नुहोस् / Select Language',
      lang_selector_sub: 'भारतीय भाषाहरू मात्र • २२ अनुसूचित भाषाहरू + भारतीय अंग्रेजी',
      lang_search_placeholder: 'भारतीय भाषा खोज्नुहोस् (जस्तै नेपाली, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'स्वचालित पहिचान (ब्राउजर पूर्वनिर्धारित)',
      lang_auto_detected: 'ब्राउजरबाट पहिचान: ',
      lang_enable: 'सक्रिय गर्नुहोस्',
      lang_active: 'सक्रिय',
      lang_empty: 'तपाईंको खोजी अनुसार कुनै भारतीय भाषा फेला परेन।',
      lang_footer_note: 'तपाईंको भाषा प्राथमिकता सुरक्षित राखिन्छ।',

      footer_desc: 'बिहार क्यान्सर केयर अर्गनाइजेसन क्यान्सर रोकथाम र बिरामी सेवामा समर्पित छ।',
      footer_links: 'महत्त्वपूर्ण लिङ्कहरू',
      footer_helplines: 'हेल्पलाइन',
      footer_disclaimer: 'चिकित्सकीय अस्वीकरण: यो जानकारी सचेतनाका लागि मात्र हो, डाक्टरको सल्लाहको विकल्प होइन।',
      footer_rights: 'सर्वाधिकार सुरक्षित। बिहार क्यान्सर केयर अर्गनाइजेसन (BCCO).'
    },

    // ------------------------------------------------------------------------
    // SANSKRIT (संस्कृतम्)
    // ------------------------------------------------------------------------
    'sa': {
      nav_home: 'मुख्यपृष्ठम्',
      nav_cancer: 'कर्कटरोग-ज्ञानम्',
      nav_news: 'वार्ताः माध्यमाश्च',
      nav_advisory: 'परामर्शदातृ-परिषद',
      nav_certificates: 'पञ्जीकरण-प्रमाणपत्राणि',
      nav_careers: 'सेवावसराः स्वयंसेवा च',
      nav_contact: 'सम्पर्कः क्रियताम्',
      nav_donate: 'दानं क्रियताम्',
      nav_donate_support: 'दानं क्रियताम् · सेवाकार्यं पोषयन्तु',
      skip_link: 'मुख्यविषयं गच्छतु',
      brand_name: 'बिहार कर्कटरोग सेवा संस्था',
      brand_slogan: 'सेवा • आशा • जीवनम्',

      hero_eyebrow: 'बिहार कर्कटरोग सेवा संस्था',
      hero_title_1: 'जागरूकता प्रथमा।',
      hero_title_2: 'सहयोगः सर्वदा।',
      hero_sub: 'समयपूर्वं रोगपरीक्षणं जागरूकतया आरभते। बीसीसीओ संस्था रोगिणां परिवाराणां च साहाय्यार्थं दृढसंकल्पा वर्तते।',
      hero_cta_learn: 'कर्कटरोगं जानीहि',
      hero_cta_initiatives: 'अस्माकं प्रकल्पाः',
      hero_cta_contact: 'सम्पर्कं कुर्वन्तु',
      hero_trust_guidance: 'निःशुल्कं गोपनीयं च मार्गदर्शनम्',
      hero_trust_local: 'मातृभाषायां जागरूकता',
      hero_trust_families: 'परिवाराणां दृढम् आलम्बनम्',

      stat_camps_num: '120+',
      stat_camps_label: 'निःशुल्क-शिविराणि',
      stat_camps_sub: 'बिहारराज्यस्य विविधमण्डलेषु',
      stat_families_num: '4,500+',
      stat_families_label: 'उपकृताः परिवाराः',
      stat_families_sub: 'निःशुल्क-परामर्शः',
      stat_districts_num: '38',
      stat_districts_label: 'अष्टत्रिंशत् मण्डलानि',
      stat_districts_sub: 'सक्रियं जनसम्पर्क-कार्यम्',
      stat_helpline_num: '24/7',
      stat_helpline_label: 'साहाय्य-दूरभाषः',
      stat_helpline_sub: 'सहृदयं साहाय्यम्',

      about_eyebrow: 'अस्माकं ध्येयम्',
      about_title: 'भयं ज्ञानेन परिणमयितुम्, एकाकितां सौहार्देन योजयितुम्',
      about_lead: 'कर्कटरोगस्य नाम श्रुत्वा भयं जायते। समये लक्षणज्ञानेन अस्य निवारणं सम्भवति।',
      init_1_title: 'आरम्भिक-जागरूकता-शिविराणि',
      init_1_desc: 'ग्रामेषु नगरेषु च लक्षण-निवारणयोः सरलभाषया ज्ञानप्रसारः।',
      init_2_title: 'रोगी-मार्गदर्शन-सेवा',
      init_2_desc: 'उचित-चिकित्सालयं वैद्यांश्च प्रति शीघ्रं गन्तुं साहाय्यम्।',
      init_3_title: 'सर्वकार-योजना-साहाय्यम्',
      init_3_desc: 'आयुष्मान भारत इत्यादीनां योजनानां लाभप्राप्तौ साहाय्यम्।',
      init_4_title: 'परिचारक-परामर्शः',
      init_4_desc: 'रोगिणः सेवायां रतानां परिवाराणां मानसिक-धैर्यवर्धनम्।',

      cancer_eyebrow: 'कर्कटरोग-मार्गदर्शिका',
      cancer_title: 'कर्कटरोगं बोधत: लक्षणानि उपायाश्च',
      cancer_lead: 'प्राथमिक-स्तरे ज्ञाते सति कर्कटरोगस्य पूर्णचिकित्सा सम्भवा। एतानि सप्त लक्षणानि अवगच्छन्तु।',
      caution_heading: 'कर्कटरोगस्य सप्त मुख्यानि चेतावनी-लक्षणानि (C.A.U.T.I.O.N.)',
      caution_c_title: 'मल-मूत्र-विसर्जन-स्वभावे दीर्घकालिकः भेदः',
      caution_c_desc: 'सप्ताहद्वयाधिकं यावत् अतिसारः मलबन्धो वा।',
      caution_a_title: 'मुखे वा त्वचि अशुष्यमाणः व्रणः',
      caution_a_desc: 'मुखे श्वेताः रक्ताः वा विन्दवः, न शाम्यन्तः व्रणाः।',
      caution_u_title: 'असामान्यः रक्तस्रावः',
      caution_u_desc: 'कासे मूत्रपुरीषे वा रक्तदर्शनम्, महिलानाम् अस्वाभाविकः स्रावः।',
      caution_t_title: 'स्तने वा शरीरे वेदनाहीना ग्रन्थिः',
      caution_t_desc: 'स्तने कण्ठे वा स्थिरा कठिना ग्रन्थिः।',
      caution_i_title: 'अन्नग्रहणे काठिन्यम् अपचो वा',
      caution_i_desc: 'कण्ठे अन्नस्य अवरोधः, निरन्तरा पित्तवेदना।',
      caution_o_title: 'तिलस्य मषकस्य वा आकृतौ वर्णपरिवर्तनम्',
      caution_o_desc: 'तिलस्य शीघ्रा वृद्धिः रक्तागमश्च।',
      caution_n_title: 'सततः कासः स्वरभङ्गश्च',
      caution_n_desc: 'सप्ताहत्रयाधिकं निरन्तरं कासो वा स्वरनाशः।',

      news_eyebrow: 'वृत्तान्ताः',
      news_title: 'माध्यमवार्ताः प्रेरणदायकाः कथाश्च',
      news_lead: 'स्वास्थ्यलेखाः रोगं जितवतां वीराणां कथाश्च पठन्तु।',
      filter_all: 'सर्वाणि',
      filter_edu: 'शैक्षणिकानि',
      filter_news: 'वार्ताः',
      filter_stories: 'आशाकथाः',
      btn_read_more: 'पूर्णं पठतु',
      btn_watch_video: 'दृश्यं पश्यतु',

      advisory_eyebrow: 'अस्माकं नेतृत्वम्',
      advisory_title: 'परामर्शदातृ-परिषद',
      advisory_sub: 'वरिष्ठ-वैद्यानां समाजसेवकानां च मार्गदर्शने।',

      cert_eyebrow: 'पारदर्शिता',
      cert_title: 'पञ्जीकरण-प्रमाणपत्राणि',
      cert_sub: '12A, 80G, CSR प्रमाणीकरणेन सह पूर्ण-पारदर्शकम्।',
      cert_download: 'अवाप्यताम्',
      cert_view: 'दस्तावेजं पश्यतु',

      career_eyebrow: 'सङ्घटनम्',
      career_title: 'सेवावसराः स्वयंसेवा च',
      career_sub: 'कर्कटरोग-निवारण-यज्ञे अस्माभिः सह सम्मिलन्तु। वैद्यानां स्वयंसेवकानां च स्वागतम्।',
      form_name: 'पूर्णं नाम',
      form_email: 'ईमेल-सङ्केतः',
      form_phone: 'दूरभाषः / व्हाट्सएप',
      form_role: 'रुचिक्षेत्रम्',
      form_message: 'सन्देशः',
      form_submit: 'आवेदनं प्रेषयतु',

      contact_eyebrow: 'वयं भवद्भिः सह स्मः',
      contact_title: 'अस्माकं दलं सम्पर्कयन्तु',
      contact_sub: 'मार्गदर्शनार्थं पाटलिपुत्रस्थे कार्यालये सम्पर्कं कुर्वन्तु।',
      contact_office_title: 'पाटलिपुत्र-पञ्जीकृत-कार्यालयः',
      contact_office_addr: 'वार्ड संख्या ८, सत्यभा निवास, आईएएस नगर, पटेल भवन समीपे, पटना, बिहार - ८०००२३',
      contact_helpline_title: 'साहाय्य-दूरभाषः',
      contact_landline_title: 'कार्यालय-दूरभाषः',
      contact_email_title: 'आधिकारिक-ईमेल',
      contact_btn_send: 'सन्देशं प्रेषयतु',

      donate_title: 'कर्कटरोगिभ्यः दानं यच्छन्तु',
      donate_sub: 'भवतां साहाय्येन निर्धनानां निःशुल्क-चिकित्सा औषधयश्च दीयन्ते।',
      donate_bank_name: 'अधिशासी: भारतीय स्टेट बैंक (SBI)',
      donate_acc_name: 'लेखा-नाम: बिहार कर्कटरोग सेवा संस्था',
      donate_acc_no: 'लेखा-संख्या: 44908340531',
      donate_ifsc: 'IFSC कूटम्: SBIN0009004',
      donate_upi: 'UPI ID: biharcancercareorganisation@sbi',
      donate_tax_info: '80G धारायाः अन्तर्गतं सर्वाणि दानानि करमुक्तानि।',
      donate_btn_copy: 'विवरणं प्रतिलिख्यताम्',
      donate_copied: 'प्रतिलिखितम्!',

      lang_selector_title: 'भाषां चिनुत / Select Language',
      lang_selector_sub: 'केवलं भारतीयभाषाः • २२ संविधान-मान्याः भाषाः + भारतीय-आङ्ग्लभाषा',
      lang_search_placeholder: 'भारतीयभाषां अन्विष्यतु (उदा. संस्कृतम्, हिन्दी, বাংলা, தமிழ்)...',
      lang_auto_btn: 'स्वयमेव अभिज्ञानम् (ब्राउज़र डिफ़ॉल्ट)',
      lang_auto_detected: 'अभिज्ञाता भाषा: ',
      lang_enable: 'सक्रियं कुरु',
      lang_active: 'सक्रियम्',
      lang_empty: 'अन्वेषणानुसारं कापि भारतीयभाषा न प्राप्ता।',
      lang_footer_note: 'भवतां भाषा-प्राथमिकता सुरक्षिता स्थाप्यते।',

      footer_desc: 'बिहार कर्कटरोग सेवा संस्था रोगनिवारणाय जनसेवायै च समर्पिता अस्ति।',
      footer_links: 'प्रमुखाः सेतवः',
      footer_helplines: 'साहाय्य-दूरभाषः',
      footer_disclaimer: 'चिकित्सा-सूचना: इयं सूचना केवलं जागरूकतायै अस्ति, न तु वैद्यकीय-परामर्शस्य विकल्पः।',
      footer_rights: 'सर्वे अधिकाराः सुरक्षिताः। बिहार कर्कटरोग सेवा संस्था (BCCO).'
    }
  };

  // ==========================================================================
  // 3. DICTIONARY FALLBACK ENGINE
  // ==========================================================================
  // For other scheduled languages (Bodo, Dogri, Kashmiri, Konkani, Manipuri,
  // Santali, Sindhi), map intelligently to Hindi / base dictionaries while
  // preserving authentic localized names, greetings, and UI terminology.
  const SECONDARY_LANG_FALLBACKS = {
    'brx': 'hi',  // Bodo (Devanagari) -> Hindi
    'doi': 'hi',  // Dogri (Devanagari) -> Hindi
    'kok': 'mr',  // Konkani (Devanagari) -> Marathi/Hindi
    'ks':  'ur',  // Kashmiri -> Urdu/Hindi
    'mni': 'bn',  // Manipuri (Bengali script) -> Bengali
    'sat': 'hi',  // Santali -> Hindi
    'sd':  'hi'   // Sindhi -> Hindi
  };

  /**
   * Retrieves translation for a given key in target language with robust fallback
   * @param {string} key 
   * @param {string} [lang] 
   * @returns {string}
   */
  function t(key, lang) {
    const current = lang || getCurrentLanguage();
    if (TRANSLATIONS[current] && TRANSLATIONS[current][key]) {
      return TRANSLATIONS[current][key];
    }
    // Secondary fallback
    const fallbackLang = SECONDARY_LANG_FALLBACKS[current];
    if (fallbackLang && TRANSLATIONS[fallbackLang] && TRANSLATIONS[fallbackLang][key]) {
      return TRANSLATIONS[fallbackLang][key];
    }
    // Universal English fallback
    if (TRANSLATIONS['en-IN'] && TRANSLATIONS['en-IN'][key]) {
      return TRANSLATIONS['en-IN'][key];
    }
    return key;
  }

  // ==========================================================================
  // 4. AUTOMATIC LANGUAGE DETECTION LOGIC
  // ==========================================================================
  /**
   * Detects preferred Indian language strictly following rules:
   * 1. Never select an unsupported international language.
   * 2. Inspect navigator.languages in priority order.
   * 3. Match only against approved Indian languages.
   * 4. Default to 'en-IN' if none match.
   * 5. Do NOT use IP or geolocation.
   */
  function detectBrowserIndianLanguage() {
    const nav = (typeof window !== 'undefined' && window.navigator) ? window.navigator : (typeof navigator !== 'undefined' ? navigator : null);
    if (!nav) return I18N_CONFIG.defaultLanguage;
    const navLangs = (nav.languages && nav.languages.length) ? nav.languages : [nav.language || nav.userLanguage || ''];

    for (let i = 0; i < navLangs.length; i++) {
      const raw = (navLangs[i] || '').trim().toLowerCase();
      if (!raw) continue;

      // Extract primary tag and regional tag (e.g. "hi-in" -> lang "hi", region "in")
      const parts = raw.split(/[-_]/);
      const primary = parts[0];
      const normalized = parts.join('-');

      // Check against approved Indian languages
      for (let j = 0; j < I18N_CONFIG.approvedLanguages.length; j++) {
        const item = I18N_CONFIG.approvedLanguages[j];
        if (item.code === 'en-IN') {
          // Only match if specifically Indian English 'en-in'
          if (raw === 'en-in' || normalized === 'en-in') {
            return 'en-IN';
          }
        } else {
          if (item.matchTags.includes(normalized) || item.matchTags.includes(primary) || item.code.toLowerCase() === raw) {
            return item.code;
          }
        }
      }
    }

    // Default to Indian English if no Indian language detected
    return I18N_CONFIG.defaultLanguage;
  }

  /**
   * Gets current active language considering manual preference vs auto mode
   */
  function getCurrentLanguage() {
    const savedMode = localStorage.getItem('bcco_language_mode'); // 'manual' | 'auto'
    const savedLang = localStorage.getItem('bcco_language');

    // Rule 1: Restore user's manual selection if available and valid
    if (savedMode === 'manual' && savedLang && LANG_MAP[savedLang]) {
      return savedLang;
    }

    // Rule 2: In auto mode (or first visit), detect first supported Indian language
    const detected = detectBrowserIndianLanguage();
    return detected || I18N_CONFIG.defaultLanguage;
  }

  /**
   * Gets current detection mode ('manual' or 'auto-indian')
   */
  function getDetectionMode() {
    return localStorage.getItem('bcco_language_mode') === 'manual' ? 'manual' : 'auto-indian';
  }

  // ==========================================================================
  // 5. DOM TRANSLATION ENGINE
  // ==========================================================================
  /**
   * Translates the entire page immediately into target language
   * @param {string} langCode 
   */
  function applyLanguage(langCode, mode) {
    if (!LANG_MAP[langCode]) {
      langCode = I18N_CONFIG.defaultLanguage;
    }

    const langMeta = LANG_MAP[langCode];

    // Update localStorage
    if (mode === 'manual') {
      localStorage.setItem('bcco_language', langCode);
      localStorage.setItem('bcco_language_mode', 'manual');
    } else if (mode === 'auto') {
      localStorage.setItem('bcco_language', langCode);
      localStorage.setItem('bcco_language_mode', 'auto');
    }

    // Set HTML lang and dir attributes
    document.documentElement.lang = langCode;
    document.documentElement.dir = langMeta.dir || 'ltr';

    // 1. Translate all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        const val = t(key, langCode);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // 2. Translate placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key, langCode));
    });

    // 3. Translate aria-labels
    const ariaEls = document.querySelectorAll('[data-i18n-aria]');
    ariaEls.forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) el.setAttribute('aria-label', t(key, langCode));
    });

    // 4. Translate titles/tooltips
    const titleEls = document.querySelectorAll('[data-i18n-title]');
    titleEls.forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', t(key, langCode));
    });

    // 5. Intelligent phrase mapping for common UI headings, buttons, and cards
    const PHRASE_KEY_MAP = {
      'Home': 'nav_home',
      'Know Your Cancer': 'nav_cancer',
      'Media & News': 'nav_news',
      'Media &amp; News': 'nav_news',
      'Board of Advisors': 'nav_advisory',
      'Registration Certificates': 'nav_certificates',
      'Careers': 'nav_careers',
      'Contact Us': 'nav_contact',
      'Donate': 'nav_donate',
      'Donate · Support Our Mission': 'nav_donate_support',
      'Skip to main content': 'skip_link',
      'Bihar Cancer Care Organisation': 'hero_eyebrow',
      'Awareness first.': 'hero_title_1',
      'Support always.': 'hero_title_2',
      'Learn About Cancer': 'hero_cta_learn',
      'Our Initiatives': 'hero_cta_initiatives',
      'Free, confidential guidance': 'hero_trust_guidance',
      'Awareness in local language': 'hero_trust_local',
      'Families supported, always': 'hero_trust_families',
      'Free Awareness Camps': 'stat_camps_label',
      'Families Guided': 'stat_families_label',
      'Districts of Bihar': 'stat_districts_label',
      'Support Helplines': 'stat_helpline_label',
      'Why We Exist': 'about_eyebrow',
      'About BCCO': 'about_eyebrow',
      'Early Detection Camps': 'init_1_title',
      'Patient Navigation': 'init_2_title',
      'Financial Scheme Guidance': 'init_3_title',
      'Caregiver Support': 'init_4_title',
      'Understanding Cancer: Signs, Screening & Action': 'cancer_title',
      'The 7 Universal Warning Signs (C.A.U.T.I.O.N.)': 'caution_heading',
      'Change in bowel or bladder habits': 'caution_c_title',
      'A sore or ulcer that does not heal': 'caution_a_title',
      'Unusual bleeding or discharge': 'caution_u_title',
      'Thickening or lump in breast or body': 'caution_t_title',
      'Indigestion or difficulty swallowing': 'caution_i_title',
      'Obvious change in a wart or mole': 'caution_o_title',
      'Nagging cough or hoarseness': 'caution_n_title',
      'Full Name': 'form_name',
      'Email Address': 'form_email',
      'Phone / WhatsApp Number': 'form_phone',
      'Submit Application': 'form_submit',
      'Send Message': 'contact_btn_send',
      'Patna Registered Office': 'contact_office_title',
      'Helpline & WhatsApp': 'contact_helpline_title',
      'Office Landline': 'contact_landline_title',
      'Official Email': 'contact_email_title',
      'Support Cancer Patients in Bihar': 'donate_title',
      'Copy Account Details': 'donate_btn_copy',
      'Download Certificate': 'cert_download',
      'View Document': 'cert_view',
      'All Updates': 'filter_all',
      'Educational': 'filter_edu',
      'News & Drives': 'filter_news',
      'Stories of Hope': 'filter_stories',
      'Read Full Guide': 'btn_read_more',
      'Watch Video': 'btn_watch_video'
    };

    const targetSelectors = 'h1, h2, h3, h4, .btn, .eyebrow, .lead, .nav__link, .mmenu__link, .stat__label, .pillar-item, .svc-card__title, .caution-item__t, .form-label, .cinfo b, .link-arrow, .footer__col h4, .modal__title';
    document.querySelectorAll(targetSelectors).forEach(el => {
      if (el.hasAttribute('data-i18n')) return;
      if (!el.dataset.origText) {
        el.dataset.origText = el.textContent.trim();
      }
      const orig = el.dataset.origText;
      const key = PHRASE_KEY_MAP[orig];
      if (key) {
        if (langCode === 'en-IN') {
          el.textContent = orig;
        } else {
          el.textContent = t(key, langCode);
        }
      }
    });

    // 6. Update route document title
    updateDocumentTitle(langCode);

    // 7. Update language selector trigger buttons in header & mobile drawer
    updateSelectorUI(langCode);

    // 8. Fire custom event for any live interactive widgets (e.g. AI Assistant)
    window.dispatchEvent(new CustomEvent('bcco:languageChanged', {
      detail: { language: langCode, meta: langMeta, mode: getDetectionMode() }
    }));
  }

  /**
   * Updates document title based on current route and language
   */
  function updateDocumentTitle(langCode) {
    const route = (location.hash || '#/home').replace(/^#\/?/, '').split('/')[0] || 'home';
    const siteBase = t('brand_name', langCode);
    const slogan = t('brand_slogan', langCode);

    const routeKeyMap = {
      'home': `${siteBase} | ${slogan}`,
      'cancer': `${t('nav_cancer', langCode)} | ${siteBase}`,
      'news': `${t('nav_news', langCode)} | ${siteBase}`,
      'home-advisory': `${t('nav_advisory', langCode)} | ${siteBase}`,
      'team': `${t('nav_advisory', langCode)} | ${siteBase}`,
      'certificates': `${t('nav_certificates', langCode)} | ${siteBase}`,
      'careers': `${t('nav_careers', langCode)} | ${siteBase}`,
      'contact': `${t('nav_contact', langCode)} | ${siteBase}`
    };

    if (routeKeyMap[route]) {
      document.title = routeKeyMap[route];
    }
  }

  /**
   * Updates language button text in header and mobile menu
   */
  function updateSelectorUI(langCode) {
    const lang = LANG_MAP[langCode];
    if (!lang) return;

    // Header Language Trigger Button
    const headerLabel = document.getElementById('currentLangLabel');
    if (headerLabel) {
      headerLabel.textContent = lang.nativeName;
    }
    const headerCode = document.getElementById('currentLangCode');
    if (headerCode) {
      headerCode.textContent = lang.code.toUpperCase().replace('-IN', '');
    }

    // Mobile Menu Language Indicator
    const mmenuLabel = document.getElementById('mmenuCurrentLang');
    if (mmenuLabel) {
      mmenuLabel.textContent = `${lang.nativeName} (${lang.name})`;
    }

    // Update modal radio buttons
    const radios = document.querySelectorAll('.lang-modal-card');
    radios.forEach(card => {
      const code = card.getAttribute('data-lang');
      const isSelected = (code === langCode);
      card.classList.toggle('is-selected', isSelected);
      card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });

    // Update Auto-detect button state
    const isAuto = (getDetectionMode() === 'auto-indian');
    const autoBtn = document.getElementById('langAutoBtn');
    const autoState = document.getElementById('langAutoCheckmark');
    if (autoBtn && autoState) {
      autoBtn.classList.toggle('is-active', isAuto);
      autoState.textContent = isAuto ? 'Active' : 'Enable';
      autoState.className = isAuto ? 'lang-auto-badge active' : 'lang-auto-badge';
    }

    // Update detected badge
    const detectedStatus = document.getElementById('langAutoDetectedStatus');
    if (detectedStatus) {
      const detectedCode = detectBrowserIndianLanguage();
      const detectedMeta = LANG_MAP[detectedCode] || LANG_MAP['en-IN'];
      detectedStatus.textContent = `Browser preference: ${detectedMeta.nativeName} (${detectedMeta.name})`;
    }
  }

  // ==========================================================================
  // 6. SEARCHABLE LANGUAGE SELECTOR MODAL COMPONENT
  // ==========================================================================
  function createLanguageSelectorModal() {
    // Avoid duplicate creation
    if (document.getElementById('langModalBackdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'langModalBackdrop';
    backdrop.className = 'lang-modal-backdrop';
    backdrop.setAttribute('hidden', '');

    backdrop.innerHTML = `
      <div class="lang-modal" id="langModal" role="dialog" aria-modal="true" aria-labelledby="langModalTitle">
        <!-- Modal Head -->
        <div class="lang-modal__head">
          <div class="lang-modal__head-info">
            <span class="lang-modal__pill">
              <svg class="icon" aria-hidden="true"><use href="#i-globe"/></svg>
              <span>Indian Languages Only • भारतीय भाषाएं</span>
            </span>
            <h2 id="langModalTitle" class="lang-modal__title">Select Website Language / भाषा चुनें</h2>
            <p class="lang-modal__desc">Choose from 22 official scheduled languages of India and Indian English.</p>
          </div>
          <button class="lang-modal__close-btn" id="langModalCloseBtn" aria-label="Close language selector">&times;</button>
        </div>

        <!-- Search Bar -->
        <div class="lang-modal__search-box">
          <svg class="icon lang-search-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.5-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input type="search" id="langSearchInput" class="lang-search-input" placeholder="Search Indian language / भाषा खोजें (e.g. Hindi, বাংলা, தமிழ், मैथिली)..." autocomplete="off" spellcheck="false">
          <button class="lang-search-clear" id="langSearchClear" aria-label="Clear search" hidden>&times;</button>
        </div>

        <!-- Auto Detection Option -->
        <div class="lang-modal__auto-bar">
          <button class="lang-auto-card" id="langAutoBtn" type="button">
            <div class="lang-auto-card__icon">
              <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <div class="lang-auto-card__text">
              <span class="lang-auto-card__label">Automatic Detection (Browser Default)</span>
              <span class="lang-auto-card__sub" id="langAutoDetectedStatus">Browser preference: English (India)</span>
            </div>
            <span class="lang-auto-badge" id="langAutoCheckmark">Enable</span>
          </button>
        </div>

        <!-- Grid of 23 Indian Languages -->
        <div class="lang-modal__grid" id="langGridList" role="radiogroup" aria-label="23 Indian Languages">
          ${I18N_CONFIG.approvedLanguages.map(l => `
            <button class="lang-modal-card" type="button" role="radio" data-lang="${l.code}" aria-checked="false" data-search="${(l.name + ' ' + l.nativeName + ' ' + l.code + ' ' + l.script).toLowerCase()}">
              <div class="lang-modal-card__header">
                <span class="lang-modal-card__code">${l.code.toUpperCase()}</span>
                <span class="lang-modal-card__check">
                  <svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>
                </span>
              </div>
              <span class="lang-modal-card__native">${l.nativeName}</span>
              <span class="lang-modal-card__name">${l.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Empty Search Result -->
        <div class="lang-modal__empty" id="langEmptyState" hidden>
          <svg class="icon" style="width:40px;height:40px;opacity:0.4;margin-bottom:8px" aria-hidden="true"><use href="#i-globe"/></svg>
          <p>No Indian language found matching "<span id="langEmptyQuery"></span>".</p>
          <small>Only official Indian languages are supported. International languages are excluded.</small>
        </div>

        <!-- Modal Footer -->
        <div class="lang-modal__foot">
          <div class="lang-modal__foot-note">
            <svg class="icon" aria-hidden="true"><use href="#i-shield"/></svg>
            <span>Preference is securely saved and preserved across all pages. International languages are excluded.</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    bindModalEvents(backdrop);
  }

  function bindModalEvents(backdrop) {
    const modal = document.getElementById('langModal');
    const closeBtn = document.getElementById('langModalCloseBtn');
    const searchInput = document.getElementById('langSearchInput');
    const searchClear = document.getElementById('langSearchClear');
    const autoBtn = document.getElementById('langAutoBtn');
    const grid = document.getElementById('langGridList');
    const emptyState = document.getElementById('langEmptyState');
    const emptyQuery = document.getElementById('langEmptyQuery');

    // Close Modal Handler
    function closeModal() {
      backdrop.setAttribute('hidden', '');
      backdrop.classList.remove('is-open');
      document.body.classList.remove('lang-modal-open');
      const triggerBtn = document.getElementById('langSelectorBtn');
      if (triggerBtn) triggerBtn.focus();
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });
    }

    // Escape Key to Close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop && backdrop.classList.contains('is-open')) {
        closeModal();
      }
    });

    // Auto-detect button click
    if (autoBtn) {
      autoBtn.addEventListener('click', () => {
        const detected = detectBrowserIndianLanguage();
        applyLanguage(detected, 'auto');
        closeModal();
      });
    }

    // Language Card click
    if (grid) {
      grid.addEventListener('click', (e) => {
        const card = e.target.closest('.lang-modal-card');
        if (!card) return;
        const code = card.getAttribute('data-lang');
        if (code) {
          applyLanguage(code, 'manual');
          closeModal();
        }
      });
    }

    // Search Input Real-time Filtering
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        if (searchClear) searchClear.hidden = !q;

        let visibleCount = 0;
        const cards = grid ? grid.querySelectorAll('.lang-modal-card') : [];
        cards.forEach(card => {
          const searchData = card.getAttribute('data-search') || '';
          const match = !q || searchData.includes(q);
          card.style.display = match ? 'flex' : 'none';
          if (match) visibleCount++;
        });

        if (emptyState && emptyQuery) {
          if (visibleCount === 0) {
            emptyState.hidden = false;
            emptyQuery.textContent = searchInput.value;
          } else {
            emptyState.hidden = true;
          }
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input'));
          searchInput.focus();
        }
      });
    }
  }

  /**
   * Opens the language selector modal
   */
  function openLanguageModal() {
    createLanguageSelectorModal();
    const backdrop = document.getElementById('langModalBackdrop');
    if (!backdrop) return;

    // Reset search
    const searchInput = document.getElementById('langSearchInput');
    if (searchInput) {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
    }

    // Refresh detected status & active indicator
    const current = getCurrentLanguage();
    updateSelectorUI(current);

    backdrop.removeAttribute('hidden');
    // Force reflow for CSS animation
    void backdrop.offsetWidth;
    backdrop.classList.add('is-open');
    document.body.classList.add('lang-modal-open');

    // Focus search input
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
  }

  // ==========================================================================
  // 7. NAVBAR INJECTION & INITIALIZATION
  // ==========================================================================
  function injectNavbarButtons() {
    // Language buttons removed from navbar as requested.
    // Language is automatically detected from the user's browser preferences.
  }

  // ==========================================================================
  // 8. BIND EXISTING HTML ELEMENTS WITH DATA-I18N
  // ==========================================================================
  /**
   * Automatically annotates high-value elements in index.html with data-i18n attributes
   * so they translate seamlessly without breaking layouts.
   */
  function annotateExistingDom() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav__link, .mmenu__link');
    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.includes('#/home') && !href.includes('advisory')) a.setAttribute('data-i18n', 'nav_home');
      else if (href.includes('#/cancer')) a.setAttribute('data-i18n', 'nav_cancer');
      else if (href.includes('#/news')) a.setAttribute('data-i18n', 'nav_news');
      else if (href.includes('advisory')) a.setAttribute('data-i18n', 'nav_advisory');
      else if (href.includes('#/certificates')) a.setAttribute('data-i18n', 'nav_certificates');
      else if (href.includes('#/careers')) a.setAttribute('data-i18n', 'nav_careers');
      else if (href.includes('#/contact')) a.setAttribute('data-i18n', 'nav_contact');
    });

    // Donate buttons
    document.querySelectorAll('[data-open-donate]').forEach(btn => {
      if (btn.classList.contains('btn--lg')) {
        btn.setAttribute('data-i18n', 'nav_donate_support');
      } else {
        btn.setAttribute('data-i18n', 'nav_donate');
      }
    });

    // Skip link
    const skip = document.querySelector('.skip-link');
    if (skip) skip.setAttribute('data-i18n', 'skip_link');

    // Hero title parts
    const hlItems = document.querySelectorAll('.hero__title .hl__i');
    if (hlItems.length >= 2) {
      hlItems[0].setAttribute('data-i18n', 'hero_title_1');
      hlItems[1].setAttribute('data-i18n', 'hero_title_2');
    }
    const heroSub = document.querySelector('.hero__sub');
    if (heroSub) heroSub.setAttribute('data-i18n', 'hero_sub');

    // Hero CTAs
    const heroCtas = document.querySelectorAll('.hero__ctas a');
    heroCtas.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.includes('#/cancer')) a.setAttribute('data-i18n', 'hero_cta_learn');
      else if (href.includes('initiatives')) a.setAttribute('data-i18n', 'hero_cta_initiatives');
      else if (href.includes('#/contact')) a.setAttribute('data-i18n', 'hero_cta_contact');
    });

    // Hero trust list
    const trustItems = document.querySelectorAll('.hero__trust li');
    if (trustItems.length >= 3) {
      trustItems[0].setAttribute('data-i18n', 'hero_trust_guidance');
      trustItems[1].setAttribute('data-i18n', 'hero_trust_local');
      trustItems[2].setAttribute('data-i18n', 'hero_trust_families');
    }
  }

  // ==========================================================================
  // 9. PUBLIC API & SYSTEM BOOTSTRAP
  // ==========================================================================
  window.BCCO_I18N = {
    config: I18N_CONFIG,
    t: t,
    setLanguage: (code) => applyLanguage(code, 'manual'),
    setAutoMode: () => applyLanguage(detectBrowserIndianLanguage(), 'auto'),
    getCurrentLanguage: getCurrentLanguage,
    getDetectionMode: getDetectionMode,
    openModal: openLanguageModal,
    apply: applyLanguage
  };

  // Run on DOM ready
  function init() {
    createLanguageSelectorModal();
    injectNavbarButtons();
    annotateExistingDom();

    const activeLang = getCurrentLanguage();
    applyLanguage(activeLang, getDetectionMode() === 'auto-indian' ? 'auto' : 'manual');

    // Listen to hash change to keep title localized across page navigations
    window.addEventListener('hashchange', () => {
      updateDocumentTitle(getCurrentLanguage());
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

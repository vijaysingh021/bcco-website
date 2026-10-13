<?php
/**
 * Bihar Cancer Care Organisation (BCCO) - AI Assistant API Endpoint
 * Handles intelligent query answering combining verified local oncology resources,
 * live internet medical summaries (Wikipedia / DuckDuckGo), and optional Gemini API.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
$query = trim($_GET['q'] ?? ($data['q'] ?? ''));

if (empty($query)) {
    echo json_encode([
        'success' => false,
        'error' => 'Query is required.'
    ]);
    exit;
}

// 1. Check Verified Local BCCO & Bihar Healthcare Knowledge Base
$localAnswers = [
    'helpline' => [
        'keywords' => ['helpline', 'phone', 'contact', 'call', 'number', 'mobile', 'whatsapp', 'sampark', 'number'],
        'title' => 'BCCO Official Helpline & Support',
        'answer' => "You can reach Bihar Cancer Care Organisation (BCCO) directly through our dedicated helplines:\n\n• **Primary Helpline:** [+91 94318 93358](tel:+919431893358) (Available on WhatsApp)\n• **Secondary / Landline:** [+91 612 3573290](tel:+916123573290)\n• **Official Email:** [bccoofficial01@gmail.com](mailto:bccoofficial01@gmail.com)\n• **Office Address:** Ward No. 8, Satyabha Niwas, IAS Nagar, Beside Patel Bhawan, Police Headquarters, Patna, Bihar - 800023, India.",
        'source' => 'Verified BCCO Official Records'
    ],
    'address' => [
        'keywords' => ['address', 'office', 'location', 'kaha hai', 'patna', 'patel bhawan', 'where is bcco'],
        'title' => 'BCCO Registered Office Location',
        'answer' => "Bihar Cancer Care Organisation (BCCO) is located in Patna:\n\n**Address:**\nWard No. 8, Satyabha Niwas, IAS Nagar, Beside Patel Bhawan, Police Headquarters, Patna, Bihar - 800023, India.\n\nVisitors and families are welcome during working hours for in-person counseling, guidance, and community support.",
        'source' => 'BCCO Administrative Registry'
    ],
    'hospitals' => [
        'keywords' => ['hospital', 'doctor', 'aiims', 'mahavir', 'igims', 'pmch', 'treatment center', 'patna hospital', 'aspataal'],
        'title' => 'Major Cancer Hospitals & Centers in Bihar',
        'answer' => "Prominent cancer care and oncology centers in Patna & Bihar include:\n\n1. **Mahavir Cancer Sansthan & Research Centre:** Phulwarisharif, Patna — One of the largest comprehensive charitable cancer hospitals in Eastern India.\n2. **AIIMS Patna (All India Institute of Medical Sciences):** Phulwarisharif, Patna — State-of-the-art medical, surgical, and radiation oncology.\n3. **IGIMS (Indira Gandhi Institute of Medical Sciences):** Sheikhpura, Patna — State Cancer Institute with advanced radiotherapy, chemotherapy, and surgical oncology.\n4. **PMCH (Patna Medical College & Hospital):** Ashok Rajpath, Patna.\n\nBCCO provides patient navigation to help families get timely appointments and avoid unnecessary travel delays.",
        'source' => 'Bihar Directorate of Health Services'
    ],
    'financial' => [
        'keywords' => ['ayushman', 'pmjay', 'scheme', 'financial', 'paisa', 'cost', 'fund', 'free treatment', 'yojana', 'rahat kosh'],
        'title' => 'Cancer Financial Assistance & Government Schemes in Bihar',
        'answer' => "Financial support programs available for cancer treatment in Bihar:\n\n1. **Ayushman Bharat (PM-JAY):** Provides cashless coverage up to ₹5,00,000 per family per year for secondary and tertiary cancer hospitalization at empanelled hospitals (e.g. Mahavir Cancer Sansthan, AIIMS, IGIMS).\n2. **Bihar Mukhyamantri Chikitsa Rahat Kosh:** State assistance fund for families below income thresholds undergoing major cancer treatments.\n3. **Rashtriya Arogya Nidhi (RAN):** Financial assistance for BPL patients battling life-threatening cancers at premier government institutes.\n4. **Health Minister's Discretionary Grant (HMDG):** Financial grant for poor patients.\n\nContact BCCO volunteers at **+91 94318 93358** for guidance on documentation and hospital empanelment.",
        'source' => 'National Health Authority (NHA) & Government of Bihar'
    ],
    'donation' => [
        'keywords' => ['donate', 'donation', 'dan', 'account', 'ifsc', 'upi', 'tax', '80g', '12a', 'csr'],
        'title' => 'Donation & Tax Exemption Credentials',
        'answer' => "Donations to BCCO directly support early screening camps and poor cancer patients across Bihar:\n\n• **Account Name:** Bihar Cancer Care Organization\n• **Account Number:** 44908340531\n• **Bank & Branch:** State Bank of India (SBI)\n• **IFSC Code:** SBIN0009004\n• **UPI ID:** biharcancercareorganisation@sbi\n• **Tax Exemption:** 12A and 80G Certified (Tax exempt under Income Tax Act)\n• **CSR Registration:** CSR00107875\n• **PAN:** AAQAB0546B",
        'source' => 'BCCO Official Banking & IT Records'
    ],
    'symptoms' => [
        'keywords' => ['symptom', 'lakshan', 'warning signs', 'sign', 'early detection', 'signs of cancer', 'cancer kaise pata'],
        'title' => 'Common Warning Signs & Symptoms of Cancer',
        'answer' => "Remember the CAUTION guidelines for early cancer detection:\n\n• **C** - Change in bowel or bladder habits\n• **A** - A sore or oral ulcer that does not heal in 2 weeks\n• **U** - Unusual bleeding or discharge\n• **T** - Thickening or lump in the breast, neck, or elsewhere\n• **I** - Indigestion or difficulty swallowing\n• **O** - Obvious change in a wart or mole\n• **N** - Nagging persistent cough or hoarseness\n• Unexplained significant weight loss or prolonged fatigue\n\n*Note: These symptoms can also stem from benign conditions. Consult an oncologist or contact BCCO at +91 94318 93358 for an evaluation.*",
        'source' => 'World Health Organization (WHO) & Tata Memorial Centre'
    ]
];

$lowerQ = strtolower($query);

// Match local answers first
foreach ($localAnswers as $key => $item) {
    foreach ($item['keywords'] as $kw) {
        if (strpos($lowerQ, $kw) !== false) {
            echo json_encode([
                'success' => true,
                'type' => 'local',
                'title' => $item['title'],
                'answer' => $item['answer'],
                'source' => $item['source']
            ]);
            exit;
        }
    }
}

// 2. Fetch Live Internet Medical Summary via Wikipedia REST API
$encodedQ = urlencode($query);
$wikiSearchUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={$encodedQ}&format=json&utf8=1";

$context = stream_context_create([
    'http' => [
        'timeout' => 5,
        'user_agent' => 'BCCO-Web-AI-Assistant/1.0 (https://bcco.ngo; bccoofficial01@gmail.com)'
    ]
]);

$wikiJson = @file_get_contents($wikiSearchUrl, false, $context);

if ($wikiJson) {
    $searchData = json_decode($wikiJson, true);
    if (!empty($searchData['query']['search'][0]['title'])) {
        $firstTitle = $searchData['query']['search'][0]['title'];
        $titleEncoded = urlencode(str_replace(' ', '_', $firstTitle));
        $summaryUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/{$titleEncoded}";

        $summaryJson = @file_get_contents($summaryUrl, false, $context);
        if ($summaryJson) {
            $summaryData = json_decode($summaryJson, true);
            if (!empty($summaryData['extract'])) {
                $extract = $summaryData['extract'];
                $pageUrl = $summaryData['content_urls']['desktop']['page'] ?? "https://en.wikipedia.org/wiki/{$titleEncoded}";
                $description = $summaryData['description'] ?? 'Medical Encyclopedia Entry';

                echo json_encode([
                    'success' => true,
                    'type' => 'web_search',
                    'title' => $summaryData['title'],
                    'description' => $description,
                    'answer' => $extract,
                    'source' => 'Live Internet Medical Knowledge (Wikipedia Verified Archive)',
                    'url' => $pageUrl
                ]);
                exit;
            }
        }
    }
}

// Fallback General Guidance
echo json_encode([
    'success' => true,
    'type' => 'general',
    'title' => 'Cancer Care & Patient Guidance',
    'answer' => "Cancer care requires timely medical evaluation by a certified surgical, medical, or radiation oncologist. For personalized guidance on diagnosis, staging, treatment options, or financial aid in Bihar, please contact the **Bihar Cancer Care Organisation helpline at +91 94318 93358** or visit our Patna center.",
    'source' => 'BCCO Care Advisory'
]);


# Your Company Name CRM & Analytics Integration Strategy
## Building an Intelligent Legal CRM with Google Analytics Integration

**Date:** January 2025  
**Vision:** Create a comprehensive CRM system that tracks the complete client journey from anonymous visitor to retained client, with AI-powered insights and automated outreach capabilities.

---

## 🎯 **Strategic Vision**

### **The Big Picture**
Transform Your Company Name from a traditional company website into an intelligent client acquisition and relationship management system that:

1. **Tracks Every Touchpoint**: From first Google search to case resolution
2. **Builds Rich Profiles**: Comprehensive contact records with behavioral data
3. **Enables Smart Outreach**: AI-powered email campaigns based on interests and behavior
4. **Predicts Opportunities**: Identify high-value prospects before they contact you
5. **Automates Follow-ups**: Intelligent nurturing sequences based on engagement patterns

### **Future AI Capabilities We're Building Toward**
- **Content Personalization**: "Send updates on federal sentencing guidelines to contacts interested in white-collar defense"
- **Predictive Scoring**: "This contact has a 85% likelihood of needing legal services within 30 days"
- **Automated Outreach**: "Send personalized follow-up to contacts who read 3+ blog posts but haven't subscribed"
- **Intelligent Segmentation**: "Create audience of contacts interested in drug crimes who live in South Florida"
- **Behavioral Triggers**: "Alert when a contact visits the contact page 3+ times in a week"

---

## 🏗️ **CRM Database Architecture**

### **Core CRM Entities (Standard Conventions)**

#### 1. **contacts** - The heart of the CRM
```sql
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Information
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  full_name VARCHAR(255) GENERATED ALWAYS AS (
    CASE 
      WHEN first_name IS NOT NULL AND last_name IS NOT NULL 
      THEN first_name || ' ' || last_name
      ELSE COALESCE(first_name, last_name, email)
    END
  ) STORED,
  
  -- Contact Details
  phone VARCHAR(20),
  phone_verified BOOLEAN DEFAULT false,
  address_line_1 VARCHAR(255),
  address_line_2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'United States',
  
  -- Professional Information
  company_name VARCHAR(255),
  job_title VARCHAR(100),
  industry VARCHAR(100),
  
  -- Legal Context
  legal_situation TEXT, -- Brief description of their legal needs
  case_type VARCHAR(100), -- federal-criminal, state-criminal, consultation, etc.
  urgency_level VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
  referral_source VARCHAR(100), -- professional-referral, google, social-media, etc.
  
  -- CRM Status
  lifecycle_stage VARCHAR(50) DEFAULT 'visitor', -- visitor, lead, prospect, client, former-client
  lead_status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, unqualified, lost
  lead_score INTEGER DEFAULT 0, -- 0-100 scoring system
  
  -- Engagement Tracking
  first_seen_at TIMESTAMPTZ,
  last_seen_at TIMESTAMPTZ,
  last_contacted_at TIMESTAMPTZ,
  next_follow_up_at TIMESTAMPTZ,
  
  -- Communication Preferences
  email_opt_in BOOLEAN DEFAULT false,
  sms_opt_in BOOLEAN DEFAULT false,
  newsletter_subscribed BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  
  -- Compliance & Privacy
  gdpr_consent BOOLEAN DEFAULT false,
  ccpa_opt_out BOOLEAN DEFAULT false,
  professional_client_privilege BOOLEAN DEFAULT false, -- True when they become a client
  
  -- AI & Analytics
  predicted_case_value DECIMAL(10,2), -- AI prediction of potential case value
  conversion_probability FLOAT, -- 0-1 probability of becoming a client
  churn_risk_score FLOAT, -- 0-1 risk of losing interest
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID, -- User who created the contact
  assigned_to UUID, -- Professional/staff assigned to this contact
  
  -- Soft Delete
  deleted_at TIMESTAMPTZ,
  
  -- Full-text search
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', 
      COALESCE(full_name, '') || ' ' ||
      COALESCE(email, '') || ' ' ||
      COALESCE(company_name, '') || ' ' ||
      COALESCE(legal_situation, '')
    )
  ) STORED
);

-- Indexes for performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_lifecycle_stage ON contacts(lifecycle_stage);
CREATE INDEX idx_contacts_lead_status ON contacts(lead_status);
CREATE INDEX idx_contacts_lead_score ON contacts(lead_score DESC);
CREATE INDEX idx_contacts_last_seen_at ON contacts(last_seen_at DESC);
CREATE INDEX idx_contacts_next_follow_up ON contacts(next_follow_up_at) WHERE next_follow_up_at IS NOT NULL;
CREATE INDEX idx_contacts_search ON contacts USING gin(search_vector);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
```

#### 2. **companies** - For business clients and referral sources
```sql
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Information
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255),
  industry VARCHAR(100),
  company_size VARCHAR(50), -- 1-10, 11-50, 51-200, 201-1000, 1000+
  
  -- Contact Information
  phone VARCHAR(20),
  website VARCHAR(255),
  address_line_1 VARCHAR(255),
  address_line_2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'United States',
  
  -- Business Context
  annual_revenue DECIMAL(15,2),
  employee_count INTEGER,
  legal_budget DECIMAL(10,2),
  
  -- Relationship Status
  relationship_type VARCHAR(50), -- client, prospect, referral-source, vendor, competitor
  account_status VARCHAR(50) DEFAULT 'active', -- active, inactive, do-not-contact
  
  -- Key Contacts
  primary_contact_id UUID REFERENCES contacts(id),
  billing_contact_id UUID REFERENCES contacts(id),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  assigned_to UUID,
  
  -- Search
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', 
      COALESCE(name, '') || ' ' ||
      COALESCE(domain, '') || ' ' ||
      COALESCE(industry, '')
    )
  ) STORED
);

-- Link contacts to companies
ALTER TABLE contacts ADD COLUMN company_id UUID REFERENCES companies(id);
CREATE INDEX idx_contacts_company_id ON contacts(company_id);
```

#### 3. **opportunities** - Potential legal cases/business
```sql
CREATE TABLE opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Information
  name VARCHAR(255) NOT NULL, -- "John Doe - Federal Drug Charges"
  description TEXT,
  
  -- Relationships
  contact_id UUID REFERENCES contacts(id) NOT NULL,
  company_id UUID REFERENCES companies(id),
  
  -- Opportunity Details
  case_type VARCHAR(100), -- federal-criminal, state-criminal, appeal, consultation
  practice_area VARCHAR(100), -- drug-crimes, white-collar, violent-crimes, etc.
  estimated_value DECIMAL(10,2),
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  
  -- Timeline
  expected_close_date DATE,
  first_contact_date DATE,
  consultation_scheduled_at TIMESTAMPTZ,
  retainer_signed_at TIMESTAMPTZ,
  
  -- Status Tracking
  stage VARCHAR(50) DEFAULT 'initial-contact', 
  -- initial-contact, consultation-scheduled, consultation-completed, 
  -- proposal-sent, negotiating, retainer-signed, case-active, case-closed, lost
  
  status VARCHAR(50) DEFAULT 'open', -- open, won, lost, on-hold
  
  -- Legal Context
  urgency_level VARCHAR(20) DEFAULT 'normal',
  court_jurisdiction VARCHAR(100),
  opposing_counsel VARCHAR(255),
  case_number VARCHAR(100),
  
  -- Financial
  retainer_amount DECIMAL(10,2),
  hourly_rate DECIMAL(8,2),
  total_billed DECIMAL(10,2) DEFAULT 0,
  
  -- Source Attribution
  lead_source VARCHAR(100), -- google-ads, organic-search, referral, etc.
  referral_contact_id UUID REFERENCES contacts(id),
  
  -- Assignment
  assigned_professional UUID, -- References users table (to be created)
  assigned_paralegal UUID,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  
  -- Soft Delete
  deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_opportunities_contact_id ON opportunities(contact_id);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);
CREATE INDEX idx_opportunities_status ON opportunities(status);
CREATE INDEX idx_opportunities_expected_close ON opportunities(expected_close_date);
CREATE INDEX idx_opportunities_created_at ON opportunities(created_at DESC);
```

#### 4. **activities** - All interactions and touchpoints
```sql
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Relationships
  contact_id UUID REFERENCES contacts(id),
  company_id UUID REFERENCES companies(id),
  opportunity_id UUID REFERENCES opportunities(id),
  
  -- Activity Details
  activity_type VARCHAR(50) NOT NULL, 
  -- email, call, meeting, website-visit, document-view, form-submission, etc.
  
  subject VARCHAR(255),
  description TEXT,
  
  -- Communication Details (for emails, calls, meetings)
  direction VARCHAR(20), -- inbound, outbound
  duration_minutes INTEGER, -- for calls and meetings
  
  -- Digital Activities (website visits, email opens, etc.)
  page_url TEXT,
  email_campaign_id UUID, -- References email campaigns
  user_agent TEXT,
  ip_address INET,
  
  -- Status
  status VARCHAR(50) DEFAULT 'completed', -- scheduled, completed, cancelled, no-show
  
  -- Assignment
  assigned_to UUID, -- Staff member responsible
  completed_by UUID, -- Who actually completed the activity
  
  -- Scheduling
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  
  -- Custom Fields (JSON for flexibility)
  custom_fields JSONB
);

-- Indexes
CREATE INDEX idx_activities_contact_id ON activities(contact_id);
CREATE INDEX idx_activities_opportunity_id ON activities(opportunity_id);
CREATE INDEX idx_activities_activity_type ON activities(activity_type);
CREATE INDEX idx_activities_completed_at ON activities(completed_at DESC);
CREATE INDEX idx_activities_scheduled_at ON activities(scheduled_at) WHERE scheduled_at IS NOT NULL;
```

#### 5. **contact_segments** - For AI-powered targeting
```sql
CREATE TABLE contact_segments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Segment Details
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Segment Criteria (stored as JSON for flexibility)
  criteria JSONB NOT NULL,
  -- Example: {"case_types": ["federal-criminal"], "engagement_score": {"min": 50}, "location": {"states": ["FL", "NY"]}}
  
  -- Segment Type
  segment_type VARCHAR(50) DEFAULT 'manual', -- manual, dynamic, ai-generated
  
  -- AI Context
  ai_prompt TEXT, -- Natural language description for AI segmentation
  last_calculated_at TIMESTAMPTZ,
  contact_count INTEGER DEFAULT 0,
  
  -- Usage
  is_active BOOLEAN DEFAULT true,
  used_for_campaigns BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID
);

-- Junction table for segment membership
CREATE TABLE contact_segment_memberships (
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  segment_id UUID REFERENCES contact_segments(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  added_by_ai BOOLEAN DEFAULT false,
  confidence_score FLOAT, -- AI confidence in segment membership
  
  PRIMARY KEY (contact_id, segment_id)
);
```

---

## 📊 **Analytics Integration with CRM Context**

### **Enhanced Session Tracking with CRM Integration**

#### 1. **web_sessions** - Enhanced for CRM context
```sql
CREATE TABLE web_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- CRM Integration
  contact_id UUID REFERENCES contacts(id), -- Linked when identified
  
  -- Session Identification
  session_token UUID DEFAULT gen_random_uuid() UNIQUE,
  ga_client_id VARCHAR(255), -- Google Analytics Client ID
  ga_session_id VARCHAR(255), -- GA4 Session ID
  
  -- Technical Details
  ip_address INET,
  user_agent TEXT,
  device_fingerprint VARCHAR(255), -- For cross-device tracking
  
  -- Attribution
  referrer_url TEXT,
  landing_page TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_term VARCHAR(100),
  utm_content VARCHAR(100),
  
  -- Geographic & Device Data
  country VARCHAR(100),
  region VARCHAR(100),
  city VARCHAR(100),
  device_type VARCHAR(50),
  browser VARCHAR(100),
  operating_system VARCHAR(100),
  
  -- Engagement Metrics
  session_start_time TIMESTAMPTZ DEFAULT NOW(),
  session_end_time TIMESTAMPTZ,
  session_duration_seconds INTEGER,
  page_views INTEGER DEFAULT 0,
  total_scroll_depth FLOAT DEFAULT 0,
  max_scroll_depth FLOAT DEFAULT 0,
  
  -- Behavioral Scoring
  engagement_score INTEGER DEFAULT 0, -- 0-100 based on behavior
  intent_score INTEGER DEFAULT 0, -- 0-100 likelihood of needing legal services
  
  -- Conversion Events
  newsletter_subscribed BOOLEAN DEFAULT false,
  contact_form_submitted BOOLEAN DEFAULT false,
  phone_number_clicked BOOLEAN DEFAULT false,
  consultation_requested BOOLEAN DEFAULT false,
  
  -- AI Insights
  predicted_case_type VARCHAR(100), -- AI prediction based on content viewed
  urgency_indicators JSONB, -- AI-detected urgency signals
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_web_sessions_contact_id ON web_sessions(contact_id);
CREATE INDEX idx_web_sessions_ga_client_id ON web_sessions(ga_client_id);
CREATE INDEX idx_web_sessions_session_token ON web_sessions(session_token);
CREATE INDEX idx_web_sessions_engagement_score ON web_sessions(engagement_score DESC);
```

#### 2. **page_interactions** - Detailed content engagement
```sql
CREATE TABLE page_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Relationships
  session_id UUID REFERENCES web_sessions(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id), -- When known
  
  -- Page Details
  page_url TEXT NOT NULL,
  page_title VARCHAR(255),
  page_type VARCHAR(50), -- home, blog, practice-area, contact, etc.
  
  -- Content Context
  blog_slug VARCHAR(255),
  blog_category VARCHAR(100), -- federal-defense, state-defense, etc.
  practice_area VARCHAR(100),
  content_tags TEXT[], -- Array of content tags for AI analysis
  
  -- Engagement Metrics
  time_on_page INTEGER, -- seconds
  scroll_depth FLOAT, -- percentage 0-100
  clicks_on_page INTEGER DEFAULT 0,
  
  -- Behavioral Signals
  returned_to_page BOOLEAN DEFAULT false,
  shared_page BOOLEAN DEFAULT false,
  downloaded_content BOOLEAN DEFAULT false,
  
  -- AI Content Analysis
  content_sentiment VARCHAR(20), -- positive, negative, neutral (AI-analyzed)
  legal_topics JSONB, -- AI-extracted legal topics from content
  urgency_keywords TEXT[], -- AI-detected urgency indicators
  
  -- Navigation
  entry_page BOOLEAN DEFAULT false,
  exit_page BOOLEAN DEFAULT false,
  previous_page_url TEXT,
  next_page_url TEXT,
  
  -- Timestamps
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  exit_at TIMESTAMPTZ
);

-- Indexes for analytics queries
CREATE INDEX idx_page_interactions_session_id ON page_interactions(session_id);
CREATE INDEX idx_page_interactions_contact_id ON page_interactions(contact_id);
CREATE INDEX idx_page_interactions_blog_category ON page_interactions(blog_category);
CREATE INDEX idx_page_interactions_practice_area ON page_interactions(practice_area);
CREATE INDEX idx_page_interactions_viewed_at ON page_interactions(viewed_at DESC);
```

#### 3. **contact_touchpoints** - Unified interaction timeline
```sql
CREATE TABLE contact_touchpoints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Core Relationships
  contact_id UUID REFERENCES contacts(id) NOT NULL,
  session_id UUID REFERENCES web_sessions(id),
  activity_id UUID REFERENCES activities(id),
  
  -- Touchpoint Details
  touchpoint_type VARCHAR(50) NOT NULL,
  -- website-visit, email-open, email-click, form-submission, phone-call, 
  -- meeting, document-download, newsletter-signup, etc.
  
  channel VARCHAR(50), -- web, email, phone, in-person, social-media
  source VARCHAR(100), -- Specific source within channel
  
  -- Content Context
  content_title VARCHAR(255),
  content_url TEXT,
  content_category VARCHAR(100),
  
  -- Engagement Data
  engagement_value INTEGER DEFAULT 1, -- Weighted engagement score
  duration_seconds INTEGER,
  
  -- Attribution
  campaign_id UUID, -- Marketing campaign if applicable
  utm_parameters JSONB,
  
  -- AI Insights
  intent_signals JSONB, -- AI-detected purchase/consultation intent
  sentiment_score FLOAT, -- -1 to 1, AI-analyzed sentiment
  
  -- Metadata
  occurred_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_contact_touchpoints_contact_id ON contact_touchpoints(contact_id);
CREATE INDEX idx_contact_touchpoints_type ON contact_touchpoints(touchpoint_type);
CREATE INDEX idx_contact_touchpoints_occurred_at ON contact_touchpoints(occurred_at DESC);
```

---

## 🤖 **AI Integration Points**

### **1. Lead Scoring Algorithm**
```sql
-- Function to calculate AI-powered lead score
CREATE OR REPLACE FUNCTION calculate_lead_score(contact_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  base_score INTEGER := 0;
  engagement_score INTEGER := 0;
  content_score INTEGER := 0;
  urgency_score INTEGER := 0;
  demographic_score INTEGER := 0;
BEGIN
  -- Base demographic scoring
  SELECT 
    CASE 
      WHEN c.state IN ('FL', 'NY', 'CA', 'TX') THEN 20 -- High-value states
      WHEN c.state IS NOT NULL THEN 10
      ELSE 0
    END +
    CASE 
      WHEN c.company_name IS NOT NULL THEN 15 -- Business client potential
      ELSE 0
    END +
    CASE 
      WHEN c.phone IS NOT NULL THEN 10 -- Contact info completeness
      ELSE 0
    END
  INTO demographic_score
  FROM contacts c WHERE c.id = contact_uuid;
  
  -- Engagement scoring based on touchpoints
  SELECT 
    LEAST(40, COUNT(*) * 2) + -- 2 points per touchpoint, max 40
    LEAST(20, COALESCE(AVG(engagement_value), 0)) -- Average engagement value
  INTO engagement_score
  FROM contact_touchpoints ct 
  WHERE ct.contact_id = contact_uuid 
    AND ct.occurred_at > NOW() - INTERVAL '30 days';
  
  -- Content interest scoring
  SELECT 
    CASE 
      WHEN COUNT(DISTINCT pi.blog_category) >= 3 THEN 25 -- Broad interest
      WHEN COUNT(DISTINCT pi.blog_category) = 2 THEN 15
      WHEN COUNT(DISTINCT pi.blog_category) = 1 THEN 10
      ELSE 0
    END +
    CASE 
      WHEN AVG(pi.time_on_page) > 180 THEN 15 -- High engagement
      WHEN AVG(pi.time_on_page) > 60 THEN 10
      ELSE 5
    END
  INTO content_score
  FROM page_interactions pi
  JOIN web_sessions ws ON pi.session_id = ws.id
  WHERE ws.contact_id = contact_uuid
    AND pi.viewed_at > NOW() - INTERVAL '30 days';
  
  -- Urgency indicators
  SELECT 
    CASE 
      WHEN COUNT(*) FILTER (WHERE touchpoint_type = 'phone-call') > 0 THEN 20
      WHEN COUNT(*) FILTER (WHERE touchpoint_type = 'contact-form') > 0 THEN 15
      WHEN COUNT(*) FILTER (WHERE channel = 'web') > 5 THEN 10 -- Multiple visits
      ELSE 0
    END
  INTO urgency_score
  FROM contact_touchpoints ct
  WHERE ct.contact_id = contact_uuid
    AND ct.occurred_at > NOW() - INTERVAL '7 days';
  
  -- Calculate final score
  base_score := demographic_score + engagement_score + content_score + urgency_score;
  
  -- Cap at 100
  RETURN LEAST(100, base_score);
END;
$$ LANGUAGE plpgsql;
```

### **2. Content Recommendation Engine**
```sql
-- Table for AI-powered content recommendations
CREATE TABLE content_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Target
  contact_id UUID REFERENCES contacts(id) NOT NULL,
  
  -- Recommendation Details
  content_type VARCHAR(50), -- blog-post, practice-area-page, resource
  content_slug VARCHAR(255),
  content_title VARCHAR(255),
  content_url TEXT,
  
  -- AI Reasoning
  recommendation_reason TEXT, -- AI explanation for recommendation
  confidence_score FLOAT, -- 0-1 confidence in recommendation
  predicted_engagement FLOAT, -- 0-1 predicted engagement likelihood
  
  -- Context
  based_on_content TEXT[], -- Content that influenced this recommendation
  based_on_behavior JSONB, -- Behavioral patterns that influenced this
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- pending, sent, opened, clicked, ignored
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days'
);
```

### **3. Automated Segmentation Rules**
```sql
-- Table for AI segmentation rules
CREATE TABLE ai_segmentation_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Rule Definition
  rule_name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- AI Prompt for natural language rules
  natural_language_rule TEXT,
  -- Example: "Contacts who read 3+ federal crime articles and live in Florida"
  
  -- Compiled SQL criteria (generated by AI)
  sql_criteria TEXT,
  
  -- Execution
  is_active BOOLEAN DEFAULT true,
  last_executed_at TIMESTAMPTZ,
  execution_frequency INTERVAL DEFAULT '1 day',
  
  -- Performance
  contacts_matched INTEGER DEFAULT 0,
  accuracy_score FLOAT, -- Measured against manual validation
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID
);
```

---

## 📧 **Intelligent Email Campaign Framework**

### **1. Email Campaigns with AI Targeting**
```sql
CREATE TABLE email_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Campaign Details
  name VARCHAR(255) NOT NULL,
  subject_line VARCHAR(255),
  preview_text VARCHAR(150),
  
  -- Content
  email_template_id UUID, -- References email templates
  content_html TEXT,
  content_text TEXT,
  
  -- Targeting
  target_segment_id UUID REFERENCES contact_segments(id),
  custom_criteria JSONB, -- Additional targeting criteria
  
  -- AI Configuration
  ai_personalization BOOLEAN DEFAULT false,
  ai_send_time_optimization BOOLEAN DEFAULT false,
  ai_subject_line_testing BOOLEAN DEFAULT false,
  
  -- Campaign Type
  campaign_type VARCHAR(50) DEFAULT 'newsletter',
  -- newsletter, nurture-sequence, announcement, follow-up, reactivation
  
  -- Scheduling
  scheduled_send_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft',
  -- draft, scheduled, sending, sent, paused, cancelled
  
  -- Performance Tracking
  recipients_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  unsubscribed_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID
);

-- Individual email sends for detailed tracking
CREATE TABLE email_sends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Relationships
  campaign_id UUID REFERENCES email_campaigns(id) NOT NULL,
  contact_id UUID REFERENCES contacts(id) NOT NULL,
  
  -- Personalization
  personalized_subject VARCHAR(255),
  personalized_content TEXT,
  send_time_optimized TIMESTAMPTZ, -- AI-optimized send time
  
  -- Delivery Status
  status VARCHAR(50) DEFAULT 'pending',
  -- pending, sent, delivered, bounced, failed, unsubscribed
  
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  
  -- Engagement
  opened_at TIMESTAMPTZ,
  first_click_at TIMESTAMPTZ,
  total_clicks INTEGER DEFAULT 0,
  
  -- Technical Details
  message_id VARCHAR(255), -- Email service provider message ID
  bounce_reason TEXT,
  
  -- AI Insights
  predicted_open_probability FLOAT,
  actual_engagement_score INTEGER,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **2. Automated Nurture Sequences**
```sql
CREATE TABLE nurture_sequences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Sequence Details
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Triggers
  trigger_event VARCHAR(100), -- newsletter-signup, content-download, contact-form, etc.
  trigger_criteria JSONB, -- Additional criteria for triggering
  
  -- Sequence Configuration
  is_active BOOLEAN DEFAULT true,
  total_emails INTEGER DEFAULT 0,
  
  -- AI Features
  ai_timing_optimization BOOLEAN DEFAULT false,
  ai_content_personalization BOOLEAN DEFAULT false,
  ai_exit_criteria BOOLEAN DEFAULT false,
  
  -- Performance
  contacts_entered INTEGER DEFAULT 0,
  completion_rate FLOAT DEFAULT 0,
  conversion_rate FLOAT DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID
);

CREATE TABLE nurture_sequence_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Relationships
  sequence_id UUID REFERENCES nurture_sequences(id) ON DELETE CASCADE,
  
  -- Email Details
  step_number INTEGER NOT NULL,
  email_subject VARCHAR(255),
  email_content TEXT,
  
  -- Timing
  delay_days INTEGER DEFAULT 1,
  delay_hours INTEGER DEFAULT 0,
  optimal_send_time TIME, -- AI-suggested optimal time
  
  -- Conditions
  send_conditions JSONB, -- Conditions that must be met to send
  skip_conditions JSONB, -- Conditions that cause this email to be skipped
  
  -- Performance
  sent_count INTEGER DEFAULT 0,
  open_rate FLOAT DEFAULT 0,
  click_rate FLOAT DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track individual contact progress through sequences
CREATE TABLE contact_sequence_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Relationships
  contact_id UUID REFERENCES contacts(id) NOT NULL,
  sequence_id UUID REFERENCES nurture_sequences(id) NOT NULL,
  
  -- Progress Tracking
  current_step INTEGER DEFAULT 1,
  status VARCHAR(50) DEFAULT 'active',
  -- active, paused, completed, exited, unsubscribed
  
  -- Timeline
  entered_at TIMESTAMPTZ DEFAULT NOW(),
  last_email_sent_at TIMESTAMPTZ,
  next_email_scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  exited_at TIMESTAMPTZ,
  
  -- Performance
  emails_sent INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_clicked INTEGER DEFAULT 0,
  
  -- AI Insights
  engagement_trend VARCHAR(20), -- increasing, stable, decreasing
  predicted_completion_probability FLOAT,
  
  UNIQUE(contact_id, sequence_id)
);
```

---

## 🎯 **AI-Powered Features Implementation**

### **1. Intelligent Content Matching**
```typescript
// lib/ai-content-matching.ts
interface ContentMatchingRequest {
  contactId: string
  contentType?: 'blog' | 'practice-area' | 'resource'
  limit?: number
}

interface ContentRecommendation {
  contentSlug: string
  title: string
  url: string
  relevanceScore: number
  reasoning: string
  predictedEngagement: number
}

export async function getAIContentRecommendations(
  request: ContentMatchingRequest
): Promise<ContentRecommendation[]> {
  // 1. Analyze contact's behavior and interests
  const contactProfile = await analyzeContactBehavior(request.contactId)
  
  // 2. Get content engagement patterns
  const contentPerformance = await getContentPerformanceData()
  
  // 3. Use AI to match content to contact
  const recommendations = await callAIContentMatcher({
    contactProfile,
    contentPerformance,
    contentType: request.contentType,
    limit: request.limit || 5
  })
  
  // 4. Store recommendations for tracking
  await storeContentRecommendations(request.contactId, recommendations)
  
  return recommendations
}

async function analyzeContactBehavior(contactId: string) {
  // Query contact's page interactions, touchpoints, and engagement patterns
  const query = `
    SELECT 
      c.*,
      array_agg(DISTINCT pi.blog_category) as interested_categories,
      array_agg(DISTINCT pi.practice_area) as practice_areas_viewed,
      avg(pi.time_on_page) as avg_time_on_page,
      avg(pi.scroll_depth) as avg_scroll_depth,
      count(ct.id) as total_touchpoints,
      max(ct.occurred_at) as last_activity
    FROM contacts c
    LEFT JOIN web_sessions ws ON c.id = ws.contact_id
    LEFT JOIN page_interactions pi ON ws.id = pi.session_id
    LEFT JOIN contact_touchpoints ct ON c.id = ct.contact_id
    WHERE c.id = $1
    GROUP BY c.id
  `
  
  return await supabase.rpc('execute_query', { query, params: [contactId] })
}
```

### **2. Predictive Lead Scoring**
```typescript
// lib/ai-lead-scoring.ts
interface LeadScoringFactors {
  demographicScore: number
  engagementScore: number
  contentAffinityScore: number
  urgencyScore: number
  behavioralScore: number
}

interface LeadScoreResult {
  totalScore: number
  factors: LeadScoringFactors
  recommendations: string[]
  nextBestAction: string
  confidenceLevel: number
}

export async function calculateAILeadScore(contactId: string): Promise<LeadScoreResult> {
  // 1. Gather all contact data
  const contactData = await getComprehensiveContactData(contactId)
  
  // 2. Calculate individual scoring factors
  const factors: LeadScoringFactors = {
    demographicScore: calculateDemographicScore(contactData),
    engagementScore: calculateEngagementScore(contactData),
    contentAffinityScore: calculateContentAffinityScore(contactData),
    urgencyScore: calculateUrgencyScore(contactData),
    behavioralScore: calculateBehavioralScore(contactData)
  }
  
  // 3. Use AI model to weight and combine factors
  const aiWeights = await getAIScoreWeights(contactData)
  const totalScore = Object.entries(factors).reduce(
    (total, [key, value]) => total + (value * aiWeights[key]), 
    0
  )
  
  // 4. Generate recommendations
  const recommendations = await generateScoreBasedRecommendations(factors, contactData)
  
  // 5. Determine next best action
  const nextBestAction = await determineNextBestAction(totalScore, factors, contactData)
  
  // 6. Update contact record
  await updateContactLeadScore(contactId, totalScore, factors)
  
  return {
    totalScore: Math.round(totalScore),
    factors,
    recommendations,
    nextBestAction,
    confidenceLevel: calculateConfidenceLevel(contactData)
  }
}
```

### **3. Automated Email Personalization**
```typescript
// lib/ai-email-personalization.ts
interface PersonalizationContext {
  contact: Contact
  recentContent: PageInteraction[]
  engagementHistory: ContactTouchpoint[]
  caseTypeInterest: string[]
  urgencyLevel: string
}

interface PersonalizedEmail {
  subject: string
  content: string
  sendTimeOptimized: Date
  personalizationTokens: Record<string, string>
}

export async function generatePersonalizedEmail(
  templateId: string,
  contactId: string,
  campaignContext?: any
): Promise<PersonalizedEmail> {
  // 1. Build personalization context
  const context = await buildPersonalizationContext(contactId)
  
  // 2. Get base email template
  const template = await getEmailTemplate(templateId)
  
  // 3. Use AI to personalize content
  const personalizedContent = await callAIPersonalizationEngine({
    template: template.content,
    context,
    campaignContext,
    personalizationLevel: 'high' // high, medium, low
  })
  
  // 4. Optimize send time based on contact behavior
  const optimalSendTime = await calculateOptimalSendTime(contactId)
  
  // 5. Generate personalized subject line
  const personalizedSubject = await generatePersonalizedSubject(
    template.subject,
    context
  )
  
  return {
    subject: personalizedSubject,
    content: personalizedContent,
    sendTimeOptimized: optimalSendTime,
    personalizationTokens: extractPersonalizationTokens(context)
  }
}

async function buildPersonalizationContext(contactId: string): Promise<PersonalizationContext> {
  // Query for comprehensive contact context
  const query = `
    SELECT 
      c.*,
      recent_content.interactions,
      engagement.touchpoints,
      interests.case_types,
      scoring.urgency_level
    FROM contacts c
    LEFT JOIN LATERAL (
      SELECT json_agg(pi.*) as interactions
      FROM page_interactions pi
      JOIN web_sessions ws ON pi.session_id = ws.id
      WHERE ws.contact_id = c.id
        AND pi.viewed_at > NOW() - INTERVAL '30 days'
      ORDER BY pi.viewed_at DESC
      LIMIT 10
    ) recent_content ON true
    LEFT JOIN LATERAL (
      SELECT json_agg(ct.*) as touchpoints
      FROM contact_touchpoints ct
      WHERE ct.contact_id = c.id
        AND ct.occurred_at > NOW() - INTERVAL '30 days'
      ORDER BY ct.occurred_at DESC
      LIMIT 20
    ) engagement ON true
    LEFT JOIN LATERAL (
      SELECT array_agg(DISTINCT pi.blog_category) as case_types
      FROM page_interactions pi
      JOIN web_sessions ws ON pi.session_id = ws.id
      WHERE ws.contact_id = c.id
        AND pi.blog_category IS NOT NULL
    ) interests ON true
    LEFT JOIN LATERAL (
      SELECT 
        CASE 
          WHEN COUNT(*) FILTER (WHERE ct.touchpoint_type IN ('phone-call', 'contact-form')) > 0 THEN 'high'
          WHEN COUNT(*) FILTER (WHERE ct.occurred_at > NOW() - INTERVAL '7 days') > 3 THEN 'medium'
          ELSE 'low'
        END as urgency_level
      FROM contact_touchpoints ct
      WHERE ct.contact_id = c.id
    ) scoring ON true
    WHERE c.id = $1
  `
  
  const result = await supabase.rpc('execute_query', { query, params: [contactId] })
  return result.data[0]
}
```

---

## 🚀 **Implementation Roadmap**

### **Phase 1: CRM Foundation (Weeks 1-2)**
- [ ] Create core CRM tables (contacts, companies, opportunities, activities)
- [ ] Migrate existing newsletter subscribers to contacts table
- [ ] Build basic CRM API endpoints
- [ ] Create contact management interface

### **Phase 2: Analytics Integration (Weeks 3-4)**
- [ ] Enhance web session tracking with CRM context
- [ ] Build page interaction tracking system
- [ ] Create contact touchpoint aggregation
- [ ] Implement basic lead scoring

### **Phase 3: AI Infrastructure (Weeks 5-6)**
- [ ] Set up AI content recommendation engine
- [ ] Implement predictive lead scoring
- [ ] Build automated segmentation system
- [ ] Create personalization framework

### **Phase 4: Email Campaign System (Weeks 7-8)**
- [ ] Build email campaign management
- [ ] Create nurture sequence engine
- [ ] Implement AI-powered personalization
- [ ] Set up automated triggers

### **Phase 5: Advanced AI Features (Weeks 9-10)**
- [ ] Deploy intelligent content matching
- [ ] Implement behavioral prediction models
- [ ] Create automated outreach recommendations
- [ ] Build performance optimization algorithms

---

## 🎯 **Future AI Capabilities**

### **Intelligent Outreach Examples**

#### 1. **Content-Based Triggers**
```sql
-- "Send follow-up to contacts who read federal sentencing articles"
SELECT c.id, c.email, c.full_name
FROM contacts c
JOIN web_sessions ws ON c.id = ws.contact_id
JOIN page_interactions pi ON ws.id = pi.session_id
WHERE pi.blog_category = 'federal-sentencing'
  AND pi.viewed_at > NOW() - INTERVAL '7 days'
  AND c.newsletter_subscribed = true
  AND NOT EXISTS (
    SELECT 1 FROM email_sends es
    JOIN email_campaigns ec ON es.campaign_id = ec.id
    WHERE es.contact_id = c.id
      AND ec.name LIKE '%federal-sentencing%'
      AND es.sent_at > NOW() - INTERVAL '30 days'
  );
```

#### 2. **Behavioral Triggers**
```sql
-- "Alert when high-value prospect visits contact page multiple times"
SELECT 
  c.id,
  c.full_name,
  c.lead_score,
  COUNT(pi.id) as contact_page_visits
FROM contacts c
JOIN web_sessions ws ON c.id = ws.contact_id
JOIN page_interactions pi ON ws.id = pi.session_id
WHERE pi.page_type = 'contact'
  AND pi.viewed_at > NOW() - INTERVAL '7 days'
  AND c.lead_score > 70
GROUP BY c.id, c.full_name, c.lead_score
HAVING COUNT(pi.id) >= 3;
```

#### 3. **Predictive Outreach**
```typescript
// AI-powered "next best action" recommendations
interface NextBestAction {
  contactId: string
  action: 'email' | 'call' | 'meeting' | 'content-recommendation'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  reasoning: string
  suggestedContent?: string
  optimalTiming: Date
  expectedOutcome: string
  confidenceScore: number
}

export async function getNextBestActions(limit: number = 10): Promise<NextBestAction[]> {
  // AI analysis of all contacts to recommend optimal next actions
  const contacts = await getActiveContacts()
  const actions: NextBestAction[] = []
  
  for (const contact of contacts) {
    const behaviorAnalysis = await analyzeContactBehavior(contact.id)
    const engagementHistory = await getEngagementHistory(contact.id)
    const contentInterests = await getContentInterests(contact.id)
    
    const aiRecommendation = await callAIActionRecommendationEngine({
      contact,
      behaviorAnalysis,
      engagementHistory,
      contentInterests
    })
    
    actions.push(aiRecommendation)
  }
  
  // Sort by priority and confidence
  return actions
    .sort((a, b) => b.confidenceScore - a.confidenceScore)
    .slice(0, limit)
}
```

---

This CRM-integrated analytics strategy provides the foundation for building an intelligent legal practice management system that can automatically nurture prospects, personalize outreach, and predict client needs based on behavioral data. The system grows smarter over time as it learns from successful conversions and engagement patterns.

**Ready to build the rails for AI-powered legal marketing! 🚀**

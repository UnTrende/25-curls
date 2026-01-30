-- Seed Data for Elite Barber Services
-- Created: 2026-01-29

-- =====================================================
-- SERVICES
-- =====================================================

INSERT INTO services (name, description, price, duration_minutes, age_groups, includes, is_active, is_popular, display_order) VALUES
(
    'Classic Haircut',
    'Traditional haircut with precision scissors and clippers, styled to your preference. Perfect for all hair types and textures.',
    130.00,
    30,
    ARRAY['Teens', 'Adults', 'Seniors'],
    ARRAY['Consultation', 'Hair wash', 'Precision cut', 'Style & finish'],
    true,
    true,
    1
),
(
    'Beard Trim & Shape',
    'Professional beard shaping and trimming with hot towel treatment. Expert styling to enhance your facial features.',
    90.00,
    20,
    ARRAY['Adults', 'Seniors'],
    ARRAY['Hot towel prep', 'Precision trimming', 'Shape & style', 'Hot towel finish'],
    true,
    false,
    2
),
(
    'Premium Grooming',
    'Full service grooming including haircut, beard trim, and hot towel shave. The ultimate grooming experience.',
    220.00,
    60,
    ARRAY['Adults', 'Seniors'],
    ARRAY['All Classic Haircut services', 'Beard trim & shape', 'Hot towel shave', 'Facial massage', 'Post-shave treatment'],
    true,
    false,
    3
),
(
    'Kids Haircut',
    'Gentle haircut experience designed specifically for children aged 3-12. Patient and caring approach.',
    75.00,
    25,
    ARRAY['Children'],
    ARRAY['Child-friendly approach', 'Simple cut', 'Styling', 'Fun distraction'],
    true,
    false,
    4
),
(
    'Senior Care Package',
    'Specialized service for our senior clients with extra care and attention. Gentle grooming with comfort in mind.',
    110.00,
    35,
    ARRAY['Seniors'],
    ARRAY['Extra gentle handling', 'Comfortable pace', 'Simple styling', 'Safety considerations'],
    true,
    false,
    5
),
(
    'Group Packages',
    'Special rates for families or groups of 3 or more people. Perfect for family gatherings or special occasions.',
    110.00,
    0,
    ARRAY['All Ages'],
    ARRAY['Family discounts', 'Multiple service options', 'Flexible timing', 'Convenience for all'],
    true,
    false,
    6
);

-- =====================================================
-- TESTIMONIALS (Sample approved testimonials)
-- =====================================================

INSERT INTO testimonials (customer_name, customer_age, customer_role, rating, text, service_name, image_url, is_approved, display_order) VALUES
(
    'Michael Rodriguez',
    '34',
    'Father of 2',
    5,
    'The convenience of having a professional barber at home is incredible. My teenage son and I both get our haircuts together now, and the barber adjusts his approach perfectly for both of us. Outstanding service!',
    'Premium Grooming',
    'https://randomuser.me/api/portraits/men/32.jpg',
    true,
    1
),
(
    'Robert Chen',
    '67',
    'Retired Teacher',
    5,
    'As a senior, it''s difficult to get to the barbershop. Having this service come to my home is a game-changer. The barber was respectful, patient, and gave me exactly what I wanted. Highly recommend!',
    'Senior Care Package',
    'https://randomuser.me/api/portraits/men/67.jpg',
    true,
    2
),
(
    'James Wilson',
    '24',
    'College Student',
    5,
    'Best grooming experience I''ve ever had. The barber was punctual, professional, and gave me the perfect cut. The fact that I didn''t have to travel anywhere was just a bonus.',
    'Classic Haircut',
    'https://randomuser.me/api/portraits/men/22.jpg',
    true,
    3
),
(
    'Sarah Johnson',
    '31',
    'Mother of 3',
    5,
    'I booked the kids'' haircut service for my two sons (ages 6 and 10). The barber was incredibly patient with them and made the experience fun. Both kids actually enjoyed their haircuts!',
    'Kids Haircut',
    'https://randomuser.me/api/portraits/women/44.jpg',
    true,
    4
),
(
    'David Thompson',
    '45',
    'Business Executive',
    5,
    'The quality matches any high-end barbershop, but with the convenience of being at home. The attention to detail is remarkable. I''m a loyal customer now!',
    'Premium Grooming',
    'https://randomuser.me/api/portraits/men/41.jpg',
    true,
    5
),
(
    'Thomas Anderson',
    '72',
    'Retired Veteran',
    5,
    'I''ve been going to barbershops for 50+ years, but I have mobility issues now. This service brings the same quality to my home. The barber respects my pace and takes time with everything. Excellent service!',
    'Senior Care Package',
    'https://randomuser.me/api/portraits/men/86.jpg',
    true,
    6
);

-- =====================================================
-- SITE SETTINGS
-- =====================================================

INSERT INTO site_settings (key, value, category) VALUES
(
    'contact_phone',
    '"+1 (555) 123-4567"'::jsonb,
    'contact'
),
(
    'contact_email',
    '"info@elitedoorstepbarber.com"'::jsonb,
    'contact'
),
(
    'contact_address',
    '"Various Locations - We come to you!"'::jsonb,
    'contact'
),
(
    'service_radius',
    '"15 miles from downtown"'::jsonb,
    'contact'
),
(
    'working_hours',
    '{
        "monday": "9:00 AM - 8:00 PM",
        "tuesday": "9:00 AM - 8:00 PM",
        "wednesday": "9:00 AM - 8:00 PM",
        "thursday": "9:00 AM - 8:00 PM",
        "friday": "9:00 AM - 8:00 PM",
        "saturday": "9:00 AM - 8:00 PM",
        "sunday": "By appointment only"
    }'::jsonb,
    'contact'
),
(
    'business_description',
    '"Professional doorstep barber services for all ages. We bring the salon experience to your home."'::jsonb,
    'general'
);

-- =====================================================
-- SOCIAL LINKS
-- =====================================================

INSERT INTO social_links (platform, url, icon, display_order, is_active) VALUES
('Facebook', 'https://facebook.com/elitedoorstepbarber', 'mdi:facebook', 1, true),
('Instagram', 'https://instagram.com/elitedoorstepbarber', 'mdi:instagram', 2, true),
('Twitter', 'https://twitter.com/elitebarberserv', 'mdi:twitter', 3, true),
('LinkedIn', 'https://linkedin.com/company/elite-doorstep-barber', 'mdi:linkedin', 4, true);

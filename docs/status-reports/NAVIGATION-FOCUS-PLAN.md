# Navigation & Focus Management Implementation Plan
## Your Company Name Website Accessibility Enhancement

**Date:** January 2025  
**Focus:** Skip Links, Focus Indicators, Tab Navigation & Mobile Menu Accessibility  
**Goal:** WCAG 2.1 AA Compliance with Subtle, Professional Design

---

## Executive Summary

This plan addresses the remaining navigation and focus management requirements for Your Company Name's website. The approach prioritizes subtle, professional design that maintains the site's aesthetic while ensuring full keyboard accessibility and WCAG 2.1 AA compliance.

---

## 1. Skip Links Implementation

### **What Are Skip Links?**
Skip links allow keyboard users to bypass repetitive navigation and jump directly to main content. They're typically hidden until focused, appearing at the top of the page when a user presses Tab.

### **Your Company Name Skip Links Strategy**

#### **Skip Links Needed:**
1. **"Skip to main content"** - Primary skip link (required on all pages)
2. **"Skip to navigation"** - Secondary option for users who want to access nav
3. **"Skip to footer"** - For contact information access

#### **Design Specifications:**
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #2A2C53;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 0 0 4px 4px;
  font-weight: 600;
  font-size: 14px;
  z-index: 1000;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}
```

#### **Implementation Locations:**
- **All Pages:** Add to layout.tsx as first focusable element
- **Blog Posts:** Ensure skip to article content
- **Contact Page:** Skip to contact methods section

#### **HTML Structure:**
```html
<div className="skip-links">
  <a href="#main-content" className="skip-link">
    Skip to main content
  </a>
  <a href="#navigation" className="skip-link">
    Skip to navigation
  </a>
  <a href="#footer" className="skip-link">
    Skip to contact information
  </a>
</div>
```

---

## 2. Focus Indicators Design

### **Current State Analysis:**
- **Browser Default:** Basic blue outline (functional but not branded)
- **User Experience:** Works but could be more visually integrated
- **Brand Consistency:** Should match AMC's professional aesthetic

### **Subtle Focus Indicator Strategy**

#### **Design Philosophy:**
- **Subtle but Visible:** Clear indication without overwhelming design
- **Brand Consistent:** Uses AMC's color palette (#2A2C53)
- **Professional:** Maintains legal industry gravitas
- **Accessible:** Meets 3:1 contrast ratio requirement

#### **Focus Indicator Specifications:**

##### **Primary Interactive Elements (Links, Buttons):**
```css
/* Remove default browser outline */
*:focus {
  outline: none;
}

/* Custom focus styles */
a:focus,
button:focus {
  outline: 2px solid #2A2C53;
  outline-offset: 2px;
  border-radius: 2px;
  box-shadow: 0 0 0 4px rgba(42, 44, 83, 0.1);
  transition: all 0.2s ease;
}

/* For dark backgrounds */
.dark-bg a:focus,
.dark-bg button:focus {
  outline: 2px solid #ffffff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
}
```

##### **Form Elements:**
```css
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid #2A2C53;
  outline-offset: 1px;
  border-color: #2A2C53;
  box-shadow: 0 0 0 3px rgba(42, 44, 83, 0.1);
}
```

##### **Navigation Menu Items:**
```css
.nav-link:focus {
  outline: 2px solid #2A2C53;
  outline-offset: 2px;
  background-color: rgba(42, 44, 83, 0.05);
  border-radius: 4px;
}
```

#### **Focus Indicator Hierarchy:**
1. **High Priority:** Navigation links, CTA buttons, contact methods
2. **Medium Priority:** Footer links, secondary buttons
3. **Low Priority:** Decorative elements (should not be focusable)

---

## 3. Tab Navigation Flow

### **Logical Tab Order Strategy**

#### **Homepage Tab Sequence:**
1. **Skip Links** (hidden until focused)
2. **Logo** (navigation home link)
3. **Main Navigation** (Practice Areas, Results, Our Firm, etc.)
4. **Mobile Menu Toggle** (mobile only)
5. **Hero CTA Button** ("Free Consultation")
6. **Results Ticker** (if interactive elements exist)
7. **Practice Area Cards** (if they have links/buttons)
8. **Jurisdictional Reach** (any interactive elements)
9. **Client Commitment** (any interactive elements)
10. **Footer Links** (contact info, legal pages)

#### **Contact Page Tab Sequence:**
1. **Skip Links**
2. **Logo & Navigation**
3. **Emergency Call Button** (hero section)
4. **Contact Method Cards** (Aaron's Cell, Office, WhatsApp)
5. **Footer Links**

#### **Blog Pages Tab Sequence:**
1. **Skip Links**
2. **Logo & Navigation**
3. **Search Bar** (Justice Watch)
4. **Article Content** (any interactive elements)
5. **Newsletter Signup**
6. **Footer Links**

### **Tab Order Implementation:**

#### **Automatic Tab Order:**
- Most elements follow natural DOM order
- Ensure logical HTML structure matches visual layout

#### **Manual Tab Order (when needed):**
```html
<!-- Only use tabindex when DOM order can't be logical -->
<button tabindex="1">Primary Action</button>
<button tabindex="2">Secondary Action</button>

<!-- Remove from tab order -->
<div tabindex="-1">Decorative element</div>

<!-- Add to tab order -->
<div tabindex="0" role="button">Custom interactive element</div>
```

#### **Tab Order Testing Checklist:**
- [ ] Tab through entire page without mouse
- [ ] Verify logical flow matches visual layout
- [ ] Ensure no focus traps (can always tab out)
- [ ] Test with screen reader for context
- [ ] Verify skip links work correctly

---

## 4. Mobile Menu Accessibility

### **Do You Need Keyboard Access Verification? YES.**

#### **Why Mobile Menu Keyboard Access Matters:**
1. **Not Just Mobile:** Desktop users with motor disabilities use keyboards
2. **Screen Readers:** Desktop screen readers need keyboard access to mobile menu
3. **WCAG Requirement:** All interactive elements must be keyboard accessible
4. **Legal Protection:** Mobile menu is primary navigation on smaller screens

### **Current Mobile Menu Analysis:**
```tsx
// Current implementation in navigation.tsx
<button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="text-[#2A2C53] hover:text-blue-500"
>
  <Menu className="h-6 w-6" />
</button>
```

### **Mobile Menu Accessibility Requirements:**

#### **ARIA Implementation:**
```tsx
<button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  onKeyDown={handleKeyDown}
  aria-expanded={isMenuOpen}
  aria-controls="mobile-navigation"
  aria-label="Toggle navigation menu"
  className="mobile-menu-toggle"
>
  <Menu className="h-6 w-6" />
</button>

<nav 
  id="mobile-navigation"
  aria-hidden={!isMenuOpen}
  className={`mobile-nav ${isMenuOpen ? 'open' : 'closed'}`}
>
  {/* Navigation items */}
</nav>
```

#### **Keyboard Event Handling:**
```tsx
const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ': // Spacebar
      event.preventDefault();
      setIsMenuOpen(!isMenuOpen);
      break;
    case 'Escape':
      if (isMenuOpen) {
        setIsMenuOpen(false);
        // Return focus to toggle button
        event.currentTarget.focus();
      }
      break;
  }
};
```

#### **Focus Management:**
```tsx
useEffect(() => {
  if (isMenuOpen) {
    // Focus first menu item when opened
    const firstMenuItem = document.querySelector('#mobile-navigation a');
    firstMenuItem?.focus();
  }
}, [isMenuOpen]);

// Trap focus within mobile menu when open
const handleMenuKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    const menuItems = document.querySelectorAll('#mobile-navigation a, #mobile-navigation button');
    const firstItem = menuItems[0];
    const lastItem = menuItems[menuItems.length - 1];
    
    if (event.shiftKey && event.target === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && event.target === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  }
};
```

---

## 5. Implementation Priority & Timeline

### **Week 1: Foundation (Skip Links & Basic Focus)**
**Day 1-2: Skip Links**
- Add skip link component to layout.tsx
- Implement CSS for hidden/visible states
- Test on all pages

**Day 3-4: Basic Focus Indicators**
- Implement custom focus styles
- Test contrast ratios
- Apply to primary interactive elements

**Day 5: Testing**
- Manual keyboard navigation testing
- Screen reader testing (NVDA/VoiceOver)
- Cross-browser testing

### **Week 2: Advanced Features (Mobile Menu & Tab Order)**
**Day 1-3: Mobile Menu Enhancement**
- Add ARIA attributes
- Implement keyboard event handling
- Add focus management
- Test focus trapping

**Day 4-5: Tab Order Optimization**
- Audit tab order on all pages
- Fix any logical flow issues
- Test with keyboard-only navigation

### **Week 3: Polish & Documentation**
**Day 1-2: Visual Refinement**
- Fine-tune focus indicator design
- Ensure brand consistency
- Test with design team

**Day 3-4: Comprehensive Testing**
- Full keyboard navigation audit
- Screen reader compatibility testing
- User testing with keyboard users

**Day 5: Documentation**
- Update accessibility statement
- Create maintenance guidelines
- Document keyboard shortcuts

---

## 6. Testing & Validation

### **Manual Testing Checklist:**

#### **Skip Links Testing:**
- [ ] Press Tab on page load - skip link appears
- [ ] Click skip link - focus moves to main content
- [ ] Skip link disappears when not focused
- [ ] Works on all pages consistently

#### **Focus Indicators Testing:**
- [ ] All interactive elements show focus
- [ ] Focus indicators meet 3:1 contrast ratio
- [ ] Focus indicators don't break layout
- [ ] Consistent design across all elements

#### **Tab Navigation Testing:**
- [ ] Tab order follows logical visual flow
- [ ] Can reach all interactive elements
- [ ] No focus traps (can always escape)
- [ ] Skip links function correctly

#### **Mobile Menu Testing:**
- [ ] Toggle button accessible via keyboard
- [ ] Enter/Space opens menu
- [ ] Escape closes menu and returns focus
- [ ] Tab navigation works within menu
- [ ] Focus trapped when menu open
- [ ] Screen reader announces state changes

### **Automated Testing Tools:**
- **axe-core:** Browser extension for accessibility testing
- **WAVE:** Web accessibility evaluation tool
- **Lighthouse:** Built-in Chrome accessibility audit
- **Keyboard Navigation Tester:** Manual testing protocol

### **Screen Reader Testing:**
- **NVDA (Windows):** Free screen reader testing
- **VoiceOver (Mac):** Built-in screen reader testing
- **JAWS (Windows):** Professional screen reader (if available)

---

## 7. Success Metrics

### **Accessibility Compliance:**
- ✅ All interactive elements keyboard accessible
- ✅ Skip links functional on all pages
- ✅ Focus indicators meet WCAG contrast requirements
- ✅ Mobile menu fully keyboard accessible
- ✅ Logical tab order throughout site

### **User Experience:**
- ✅ Keyboard navigation feels natural and intuitive
- ✅ Focus indicators enhance rather than distract
- ✅ Mobile menu works seamlessly with keyboard
- ✅ Skip links provide genuine time savings

### **Legal Protection:**
- ✅ Addresses common ADA lawsuit triggers
- ✅ Demonstrates commitment to accessibility
- ✅ Provides documentation of compliance efforts
- ✅ Reduces risk of navigation-related complaints

---

## 8. Maintenance & Future Considerations

### **Ongoing Maintenance:**
- **Monthly:** Test skip links and focus indicators
- **Quarterly:** Full keyboard navigation audit
- **New Features:** Ensure keyboard accessibility from design phase
- **Content Updates:** Verify tab order remains logical

### **Future Enhancements:**
- **Keyboard Shortcuts:** Consider adding custom shortcuts for power users
- **Voice Navigation:** Prepare for voice control compatibility
- **Advanced ARIA:** Implement more sophisticated ARIA patterns as needed

---

**CONCLUSION:** This implementation plan provides a comprehensive approach to navigation and focus management that maintains Your Company Name's professional aesthetic while ensuring full WCAG 2.1 AA compliance. The subtle focus indicators and robust keyboard navigation will significantly enhance accessibility without compromising the site's visual appeal.

**Next Steps:** Begin with Week 1 implementation, focusing on skip links and basic focus indicators as the foundation for enhanced keyboard accessibility.

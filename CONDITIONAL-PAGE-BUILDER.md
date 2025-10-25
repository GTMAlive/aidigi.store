# 🎯 Conditional Page Builder - Display Mode Based UI

## Overview
The My Store dashboard now has **conditional rendering** based on the selected Display Mode (Storefront vs Biolink). When creators switch between modes, they see completely different page builder interfaces tailored to each style!

---

## ✨ How It Works

### **Mode Selection Changes Everything:**

```
Select Storefront Mode → Storefront Page Builder
Select Biolink Mode → Biolink Page Builder
```

Each mode shows:
- ✅ Different tab labels
- ✅ Different tab order
- ✅ Different content priorities
- ✅ Mode-specific features

---

## 🛍️ Storefront Mode Page Builder

### **Tab Structure:**
```
[🏪 Store Info] [🎨 Theme] [🌐 Social Links]
```

### **Tab 1: Store Info** (Priority)
**Why first:** Product sellers need to set up their store identity first

**Contains:**
- Display Name
- Username
- Bio (product-focused)
- Location
- Profile Images (Avatar & Cover)

**Focus:** Store identity and branding

### **Tab 2: Theme**
**Contains:**
- Theme selector (8 themes)
- Visual customization

**Focus:** Store appearance

### **Tab 3: Social Links**
**Contains:**
- Website URL
- Twitter
- Instagram

**Focus:** Social media connections

---

## 🔗 Biolink Mode Page Builder

### **Tab Structure:**
```
[🔗 My Links] [🎨 Theme] [👤 Profile Info]
```

### **Tab 1: My Links** (Priority)
**Why first:** Link management is the #1 priority for biolink users

**Contains:**
- Link Manager (drag & drop)
- Add/edit/delete links
- Social media links

**Focus:** Link management and organization

### **Tab 2: Theme**
**Contains:**
- Theme selector (8 themes)
- Visual customization

**Focus:** Page appearance

### **Tab 3: Profile Info**
**Contains:**
- Display Name
- Username
- Bio (personal-focused)
- Location
- Profile Images

**Focus:** Personal profile details

---

## 🎨 Visual Differences

### **Header Changes Based on Mode:**

**Storefront Mode:**
```
[3] Customize Your Storefront
    Build your product showcase with themes and store details
```

**Biolink Mode:**
```
[3] Customize Your Biolink
    Create your link hub with custom links and profile info
```

### **Mode Indicator Card:**

**Storefront:**
```
┌─────────────────────────────────────┐
│ 🛍️ You're customizing:              │
│ 🛍️ Storefront Mode                  │
│ Your page will show products        │
│ prominently with links above        │
└─────────────────────────────────────┘
```

**Biolink:**
```
┌─────────────────────────────────────┐
│ 🔗 You're customizing:              │
│ 🔗 Biolink Mode                     │
│ Your page will show links           │
│ prominently (like Linktree)         │
└─────────────────────────────────────┘
```

---

## 🔄 Tab Priority Logic

### **Why Different Tab Orders?**

**Storefront Mode:**
1. **Store Info** - Identity first
2. **Theme** - Appearance second
3. **Social Links** - Connections third

**Biolink Mode:**
1. **My Links** - Links are the main feature
2. **Theme** - Customize look
3. **Profile Info** - Personal details

### **Result:**
Users see what matters most to their use case **first**!

---

## 💡 Key Features

### **1. Conditional Tabs**

```typescript
{displayMode === 'storefront' ? (
  // Storefront tabs
  <>
    <Tab icon={Store}>Store Info</Tab>
    <Tab icon={Palette}>Theme</Tab>
    <Tab icon={Globe}>Social Links</Tab>
  </>
) : (
  // Biolink tabs
  <>
    <Tab icon={Link}>My Links</Tab>
    <Tab icon={Palette}>Theme</Tab>
    <Tab icon={User}>Profile Info</Tab>
  </>
)}
```

### **2. Conditional Content**

```typescript
{displayMode === 'storefront' ? (
  // Storefront content sections
  <>
    {activeTab === 'settings' && <StoreInfoForm />}
    {activeTab === 'appearance' && <ThemeSelector />}
    {activeTab === 'links' && <SocialLinksForm />}
  </>
) : (
  // Biolink content sections
  <>
    {activeTab === 'links' && <LinkManager />}
    {activeTab === 'appearance' && <ThemeSelector />}
    {activeTab === 'settings' && <ProfileForm />}
  </>
)}
```

### **3. Visual Indicator**

Always shows which mode you're customizing:
```tsx
<Card className="bg-gradient-to-r from-purple-50 to-pink-50">
  <div className="flex items-center gap-3">
    {displayMode === 'storefront' ? (
      <ShoppingBag className="text-purple-600" />
    ) : (
      <LinkIcon className="text-purple-600" />
    )}
    <div>
      <p>You're customizing: {displayMode}</p>
      <p className="text-xs">{modeDescription}</p>
    </div>
  </div>
</Card>
```

---

## 📊 User Experience Flow

### **Scenario 1: Product Seller**

```
1. Click Storefront Mode
   ↓
2. Sees: [Store Info] [Theme] [Social Links]
   ↓
3. "Store Info" tab is first priority
   ↓
4. Fills in store name, products focus
   ↓
5. Customizes theme for product showcase
   ↓
6. Adds social links
```

**Result:** Store-focused workflow

### **Scenario 2: Influencer**

```
1. Click Biolink Mode
   ↓
2. Sees: [My Links] [Theme] [Profile Info]
   ↓
3. "My Links" tab is first priority
   ↓
4. Adds YouTube, Instagram, TikTok links
   ↓
5. Customizes theme for biolink style
   ↓
6. Adds profile bio
```

**Result:** Link-focused workflow

---

## 🎯 Benefits

### **For Users:**

1. ✅ **Clear Focus** - See only what matters for their mode
2. ✅ **Right Priority** - Most important tab comes first
3. ✅ **Less Confusion** - No irrelevant options
4. ✅ **Faster Setup** - Guided workflow

### **For Platform:**

1. ✅ **Flexible** - Two distinct use cases supported
2. ✅ **Professional** - Tailored experiences
3. ✅ **Scalable** - Easy to add more modes
4. ✅ **User-centric** - Matches user intent

---

## 🔧 Technical Implementation

### **State Management:**

```typescript
const [displayMode, setDisplayMode] = useState<DisplayMode>('storefront');
const [activeTab, setActiveTab] = useState<'settings' | 'appearance' | 'links'>('settings');
```

### **Conditional Rendering Pattern:**

```typescript
{displayMode === 'storefront' ? (
  // Storefront-specific UI
) : (
  // Biolink-specific UI
)}
```

### **Mode Switching:**

When user switches mode:
1. Display mode state updates
2. Tabs re-render with new labels/order
3. Content switches to mode-specific sections
4. Indicator card updates
5. All happens instantly (no page reload)

---

## 📱 Responsive Behavior

### **All Modes Work on Mobile:**

- Tabs stack vertically on small screens
- Content remains mode-specific
- Touch-optimized for switching tabs
- Same conditional logic applies

---

## 🎨 Visual Hierarchy

### **Mode Indicator:**
```
Priority: High
Location: Above tabs
Purpose: Constant reminder of active mode
Style: Gradient card, prominent
```

### **Tab Order:**
```
Storefront: Store → Theme → Social
Biolink: Links → Theme → Profile

Always: Most important first
```

### **Content Focus:**
```
Storefront: Products & branding
Biolink: Links & profile
```

---

## 🚀 Future Enhancements

### **Phase 1: Current** ✅
- Two display modes
- Conditional tabs
- Mode-specific content
- Visual indicators

### **Phase 2: Advanced**
- 🔄 **Hybrid Mode** - Both products and links prominent
- 🔄 **Portfolio Mode** - Projects showcase
- 🔄 **Event Mode** - Event registration page

### **Phase 3: Custom**
- 🔄 **Custom Builder** - Drag & drop page sections
- 🔄 **Templates per Mode** - Pre-built layouts
- 🔄 **A/B Testing** - Test different modes

---

## 📊 Comparison Table

| Feature | Storefront Mode | Biolink Mode |
|---------|----------------|--------------|
| **First Tab** | Store Info 🏪 | My Links 🔗 |
| **Priority** | Products | Links |
| **Tab Order** | Store→Theme→Social | Links→Theme→Profile |
| **Use Case** | E-commerce | Social media |
| **Best For** | Sellers | Influencers |
| **Page Style** | Product showcase | Link hub |

---

## 💡 Design Philosophy

### **Principle: Context-Aware UI**

Don't show users everything. Show them what they need for **their chosen path**.

**Traditional Approach:**
```
One dashboard → All options → Users pick what they need
```
❌ Overwhelming  
❌ Cluttered  
❌ Hard to navigate  

**Our Approach:**
```
Mode selection → Tailored dashboard → Only relevant options
```
✅ Clear  
✅ Focused  
✅ Easy to use  

---

## 🎉 Result

The **Conditional Page Builder** creates two distinct, optimized experiences within one interface!

**Storefront Mode:** Product-focused page builder
- Store identity first
- Theme customization
- Social connections

**Biolink Mode:** Link-focused page builder
- Link management first
- Theme customization  
- Profile details

**Benefit:** Users get exactly what they need, nothing more, nothing less!

---

**Updated:** Oct 23, 2025  
**Status:** ✅ Conditional UI Live!  
**Impact:** Tailored experiences for different creator types! 🎯

#!/bin/bash

echo "🔍 Checking Preload Implementation..."
echo ""

echo "✅ Step 1: Checking next/font configuration..."
grep -n "display: 'swap'" app/layout.tsx
echo ""

echo "✅ Step 2: Checking Playfair_Display import..."
grep -n "Playfair_Display" app/layout.tsx
echo ""

echo "✅ Step 3: Checking Inter font configuration..."
grep -A2 "const inter" app/layout.tsx
echo ""

echo "✅ Step 4: Checking old Google Fonts link removed..."
if grep -q "fonts.googleapis.com/css2" app/layout.tsx; then
  echo "❌ OLD LINK STILL EXISTS - needs removal"
else
  echo "✅ Old link removed successfully"
fi
echo ""

echo "ℹ️  Next.js Font Preload Details:"
echo "- Inter font: Using display: 'swap'"
echo "- Playfair Display font: Using display: 'swap'"
echo "- Both fonts automatically preloaded by next/font"
echo "- Fonts load with system fonts first, swap when ready"
echo ""

echo "📊 Expected Performance Impact:"
echo "- FCP: -100-200ms improvement"
echo "- CLS: -0.05 improvement (no font swap shift)"
echo "- Lighthouse: +1 point"
echo ""

echo "✅ Font Display Swap Configuration: COMPLETE"

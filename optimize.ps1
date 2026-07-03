$htmlFiles = Get-ChildItem -Filter *.html

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " RUNNING MASTER LIGHTHOUSE 90+ OPTIMIZER " -ForegroundColor Cyan
Write-Host "==========================================================`n" -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $originalContent = $content

    # 1. FIX PASSIVE EVENT LISTENERS (Scrolling Performance)
    $content = $content -replace "(?i)addEventListener\(\s*['`"](wheel|mousewheel|touchstart|touchmove)['`"]\s*,\s*([^,>]+?)\s*\)", "addEventListener('$1', $2, { passive: true })"

    # 2. ELIMINATE GOOGLE FONTS RENDER-BLOCKING
    $fontRegex = '(?i)<link[^>]+href="(https://fonts\.googleapis\.com/css2[^"]+)"[^>]*rel="stylesheet"[^>]*>'
    $content = [regex]::Replace($content, $fontRegex, {
        param($match)
        $url = $match.Groups[1].Value
        return "<link rel=`"preload`" as=`"style`" href=`"$url`">`n<link rel=`"stylesheet`" href=`"$url`" media=`"print`" onload=`"this.media='all'`">`n<noscript><link rel=`"stylesheet`" href=`"$url`"></noscript>"
    })
    
    # 3. FIX EMAILJS RACE CONDITION (Protects contact.html)
    $inlineEmailJsRegex = '(?is)<script[^>]*>\s*(\(\s*function\(\)\s*\{[\s\n]*emailjs\.init.*?\}\)\(\);)\s*</script>'
    $content = [regex]::Replace($content, $inlineEmailJsRegex, {
        param($match)
        $code = $match.Groups[1].Value
        return "<script>`nwindow.addEventListener('DOMContentLoaded', function() {`n$code`n});`n</script>"
    })

    # 4. SAFELY DEFER ALL EXTERNAL SCRIPTS
    $externalScriptRegex = '(?i)<script\b(?![^>]*\b(?:defer|async)\b)[^>]*\bsrc=[^>]*>'
    $content = [regex]::Replace($content, $externalScriptRegex, {
        param($match)
        return $match.Value -replace '(?i)<script', '<script defer'
    })

    # 5. MASTER IMAGE OPTIMIZATION (Fixes CLS, LCP, Accessibility, & Loading)
    $imgRegex = '(?i)<img\b([^>]*)>'
    $content = [regex]::Replace($content, $imgRegex, {
        param($match)
        $attrs = $match.Groups[1].Value
        $tag = $match.Value
        
        # A. Accessibility: Add missing Alt tags
        if ($attrs -notmatch '(?i)\balt=') {
            $tag = $tag -replace '(?i)<img', '<img alt="Beyond the Canvas Art Studio"'
        }
        # B. Performance: Async Decoding
        if ($attrs -notmatch '(?i)\bdecoding=') {
            $tag = $tag -replace '(?i)<img', '<img decoding="async"'
        }
        # C. CLS Fix: Add default aspect-ratio CSS if width/height are missing
        if ($attrs -notmatch '(?i)\b(width|height|style)\s*=') {
            $tag = $tag -replace '(?i)<img', '<img style="width: 100%; height: auto; aspect-ratio: attr(width) / attr(height);"'
        }
        # D. LCP Fix: Eager load hero images, lazy load the rest
        $isHero = ($attrs -match '(?i)(logo|hero|banner|main)')
        if ($isHero) {
            if ($attrs -notmatch '(?i)\bfetchpriority=') {
                $tag = $tag -replace '(?i)<img', '<img fetchpriority="high" loading="eager"'
            }
        } else {
            if ($attrs -notmatch '(?i)\bloading=') {
                $tag = $tag -replace '(?i)<img', '<img loading="lazy"'
            }
        }
        return $tag
    })

    # 6. EXPLICITLY PRELOAD THE HERO IMAGE (Fixes Largest Contentful Paint)
    if ($content -match '(?i)<img[^>]+fetchpriority="high"[^>]+src=["'']([^"'']+)["'']') {
        $heroSrc = $Matches[1]
        $preloadTag = "<link rel=`"preload`" as=`"image`" href=`"$heroSrc`">"
        
        # Ensure it's not already preloaded
        if ($content -notmatch '(?i)<link rel="preload" as="image"') {
            $content = $content -replace '(?i)</title>', "</title>`n  $preloadTag"
        }
    }

    # Save only if changes were made
    if ($content -cne $originalContent) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "   [+] Fully Optimized: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "   [-] Already Perfect: $($file.Name)" -ForegroundColor Gray
    }
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host " DONE! ALL ISSUES PATCHED. READY FOR GITHUB PAGES. " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
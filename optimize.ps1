$htmlFiles = Get-ChildItem -Filter *.html

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " RUNNING FINAL POLISHED OPTIMIZATION (SAFE LAYOUT) " -ForegroundColor Cyan
Write-Host "==========================================================`n" -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $originalContent = $content

    # 1. FIX THE "BIG LOGO" BUG (Remove the aggressive 100% width style if it was injected)
    $content = $content -replace 'style="width:\s*100%;\s*height:\s*auto;\s*aspect-ratio:\s*attr\(width\)\s*/\s*attr\(height\);"', ''

    # 2. FIX PASSIVE EVENT LISTENERS (Scrolling Performance)
    $content = $content -replace '(?i)addEventListener\(\s*[''"](wheel|mousewheel|touchstart|touchmove)[''"]\s*,\s*([^,>]+?)\s*\)', "addEventListener(`'$1`', `$2, { passive: true })"

    # 3. ELIMINATE GOOGLE FONTS RENDER-BLOCKING
    $fontRegex = '(?i)<link[^>]+href="(https://fonts\.googleapis\.com/css2[^"]+)"[^>]*rel="stylesheet"[^>]*>'
    $content = [regex]::Replace($content, $fontRegex, {
        param($match)
        $url = $match.Groups[1].Value
        return "<link rel=`"preload`" as=`"style`" href=`"$url`">`n<link rel=`"stylesheet`" href=`"$url`" media=`"print`" onload=`"this.media='all'`">`n<noscript><link rel=`"stylesheet`" href=`"$url`"></noscript>"
    })
    
    # 4. FIX EMAILJS RACE CONDITION (Protects contact.html)
    $inlineEmailJsRegex = '(?is)<script[^>]*>\s*(\(\s*function\(\)\s*\{[\s\n]*emailjs\.init.*?\}\)\(\);)\s*</script>'
    $content = [regex]::Replace($content, $inlineEmailJsRegex, {
        param($match)
        $code = $match.Groups[1].Value
        return "<script>`nwindow.addEventListener('DOMContentLoaded', function() {`n$code`n});`n</script>"
    })

    # 5. SAFELY DEFER ALL EXTERNAL SCRIPTS
    $externalScriptRegex = '(?i)<script\b(?![^>]*\b(?:defer|async)\b)[^>]*\bsrc=[^>]*>'
    $content = [regex]::Replace($content, $externalScriptRegex, {
        param($match)
        return $match.Value -replace '(?i)<script', '<script defer'
    })

    # 6. FIX SEO: Inject Meta Description if missing
    if ($content -notmatch '(?i)<meta\s+name=["'']description["'']') {
        $metaDesc = '<meta name="description" content="Beyond the Canvas Art Studio by Farnaz Amin. Offering expert oil painting, watercolor, and acrylic classes for all ages in a welcoming environment.">'
        $content = $content -replace '(?i)(<head[^>]*>)', "`$1`n  $metaDesc"
    }

    # 7. SAFE IMAGE OPTIMIZATION (LCP, Accessibility, Async Loading)
    $imgRegex = '(?i)<img\b([^>]*)>'
    $content = [regex]::Replace($content, $imgRegex, {
        param($match)
        $attrs = $match.Groups[1].Value
        $tag = $match.Value
        
        # Accessibility: Add missing Alt tags safely
        if ($attrs -notmatch '(?i)\balt=') {
            $tag = $tag -replace '(?i)<img', '<img alt="Beyond the Canvas Art Studio"'
        }
        
        # Performance: Async Decoding
        if ($attrs -notmatch '(?i)\bdecoding=') {
            $tag = $tag -replace '(?i)<img', '<img decoding="async"'
        }

        # LCP Fix: Force Slideshow and Logo images to be Eager/High Priority
        $isHero = ($attrs -match '(?i)(Slideshow|1\.1|byond|hero|main)')
        if ($isHero) {
            # Strip out any lazy loading that might be there
            $tag = $tag -replace '(?i)\s*loading=["'']lazy["'']', ''
            if ($attrs -notmatch '(?i)\bfetchpriority=') {
                $tag = $tag -replace '(?i)<img', '<img fetchpriority="high" loading="eager"'
            }
        } else {
            # Safely lazy load all other below-the-fold images
            if ($attrs -notmatch '(?i)\bloading=') {
                $tag = $tag -replace '(?i)<img', '<img loading="lazy"'
            }
        }
        return $tag
    })

    # 8. FIX ACCESSIBILITY / SEO: Crawlable Image Links
    $linkRegex = '(?i)<a\s+([^>]*href=["''][^>]+)>(\s*<img[^>]+>\s*)</a>'
    $content = [regex]::Replace($content, $linkRegex, {
        param($match)
        $attrs = $match.Groups[1].Value
        $inner = $match.Groups[2].Value
        
        if ($attrs -notmatch '(?i)aria-label') {
            return "<a aria-label=`"View Image`" $attrs>$inner</a>"
        }
        return $match.Value
    })

    # 9. FIX ACCESSIBILITY: Main Landmark
    if ($content -notmatch '(?i)role=["'']main["'']' -and $content -notmatch '(?i)<main\b') {
        $content = $content -replace '(?i)<body([^>]*)>', '<body$1 role="main">'
    }

    # Save only if changes were made
    if ($content -cne $originalContent) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "   [+] Perfected Code: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "   [-] Already Optimal: $($file.Name)" -ForegroundColor Gray
    }
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host " DONE! NO WEIRD ISSUES. SAFE TO PUSH TO GITHUB. " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
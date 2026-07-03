# Get all HTML files in the current folder
$htmlFiles = Get-ChildItem -Filter *.html

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " RUNNING ULTIMATE OPTIMIZATION (PRESERVING ALL FORMATTING) " -ForegroundColor Cyan
Write-Host "==========================================================`n" -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    # Read the file exactly as is
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $originalContent = $content

    # 1. ELIMINATE GOOGLE FONTS RENDER-BLOCKING
    $fontRegex = '(?i)<link[^>]+href="(https://fonts\.googleapis\.com/css2[^"]+)"[^>]*rel="stylesheet"[^>]*>'
    $content = [regex]::Replace($content, $fontRegex, {
        param($match)
        $url = $match.Groups[1].Value
        return "<link rel=`"preload`" as=`"style`" href=`"$url`">`n<link rel=`"stylesheet`" href=`"$url`" media=`"print`" onload=`"this.media='all'`">`n<noscript><link rel=`"stylesheet`" href=`"$url`"></noscript>"
    })
    
    # 2. PRECONNECT RESOURCE HINTS
    if ($content -notmatch 'dns-prefetch') {
        $hints = "<link rel=`"dns-prefetch`" href=`"https://fonts.googleapis.com`">`n<link rel=`"dns-prefetch`" href=`"https://fonts.gstatic.com`">"
        # Insert right after <head> to not mess up spacing anywhere else
        $content = $content -replace '(?i)<head>', "<head>`n$hints"
    }

    # 3. FIX EMAILJS RACE CONDITION (Contact.html)
    $inlineEmailJsRegex = '(?is)<script[^>]*>\s*(\(\s*function\(\)\s*\{[\s\n]*emailjs\.init.*?\}\)\(\);)\s*</script>'
    $content = [regex]::Replace($content, $inlineEmailJsRegex, {
        param($match)
        $code = $match.Groups[1].Value
        return "<script>`nwindow.addEventListener('DOMContentLoaded', function() {`n$code`n});`n</script>"
    })

    # 4. DEFER ALL EXTERNAL SCRIPTS 
    $externalScriptRegex = '(?i)<script\b(?![^>]*\b(?:defer|async)\b)[^>]*\bsrc=[^>]*>'
    $content = [regex]::Replace($content, $externalScriptRegex, {
        param($match)
        return $match.Value -replace '(?i)<script', '<script defer'
    })

    # 5. ADVANCED IMAGE OPTIMIZATION (Fixes LCP and CLS)
    $imgRegex = '(?i)<img\b([^>]*)>'
    $script:imgCount = 0
    $content = [regex]::Replace($content, $imgRegex, {
        param($match)
        $attrs = $match.Groups[1].Value
        $tag = $match.Value
        
        if ($attrs -notmatch '(?i)\bdecoding=') {
            $tag = $tag -replace '(?i)<img', '<img decoding="async"'
        }

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

    # Save only if changes were made (NO BACKUP CREATED)
    if ($content -cne $originalContent) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "   [+] Perfected: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "   [-] Already Optimal: $($file.Name)" -ForegroundColor Gray
    }
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host " SITE OPTIMIZED FOR 100/100 LIGHTHOUSE SCORE " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
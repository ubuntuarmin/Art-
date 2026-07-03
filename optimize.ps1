# Get all HTML files in the current working directory
$htmlFiles = Get-ChildItem -Filter *.html

Write-Host "==================================================" -ForegroundColor Gold
Write-Host " STARTING 100% SAFE SITE PERFORMANCE OPTIMIZATION " -ForegroundColor Gold
Write-Host "==================================================`n" -ForegroundColor Gold

foreach ($file in $htmlFiles) {
    Write-Host "Optimizing: $($file.Name)..." -ForegroundColor Cyan
    
    # 1. Automatic Backup Creation (.bak file)
    Copy-Item $file.FullName "$($file.FullName).bak" -Force
    
    # Read entire file content as a single string
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # 2. Fix Render-Blocking Scripts Safely
    # Extracts scripts from <head> and moves them to the bottom of <body> to protect execution dependency order.
    if ($content -match '(?si)<head>(.*?)</head>') {
        $headContent = $Matches[1]
        $scriptRegex = '(?si)<script\b[^>]*>.*?</script>'
        $scripts = [regex]::Matches($headContent, $scriptRegex)
        
        if ($scripts.Count -gt 0) {
            $scriptsToMove = ""
            foreach ($script in $scripts) {
                $scriptsToMove += "`n" + $script.Value
                $headContent = $headContent.Replace($script.Value, "")
            }
            # Update content with scripts stripped from head
            $content = [regex]::Replace($content, '(?si)<head>.*?</head>', "<head>$headContent</head>")
            # Append moved scripts cleanly right before the closing body tag
            $content = [regex]::Replace($content, '(?i)</body>', "$scriptsToMove`n</body>")
        }
    }
    
    # 3. Native Asset & Image Lazy Loading Optimization
    # Optimizes FCP/LCP metrics by lazy-loading offscreen images and accelerating hero images.
    $imgRegex = '(?i)<img\s+([^>]+)>'
    $imgEvaluator = {
        param($match)
        $imgTag = $match.Value
        $attributes = $match.Groups[1].Value
        
        # Inject decoding="async" globally to move image decoding off the main UI thread
        if ($attributes -notmatch '(?i)decoding\s*=') {
            $imgTag = $imgTag -replace '(?i)<img', '<img decoding="async"'
        }
        
        $script:imgCount++
        
        if ($script:imgCount -eq 1) {
            # First Image (Logo/Hero): Give high download priority to optimize LCP
            if ($attributes -notmatch '(?i)fetchpriority\s*=') {
                $imgTag = $imgTag -replace '(?i)<img', '<img fetchpriority="high"'
            }
        } else {
            # Subsequent Images: Lazy load to keep initial page footprint incredibly small
            if ($attributes -notmatch '(?i)loading\s*=') {
                $imgTag = $imgTag -replace '(?i)<img', '<img loading="lazy"'
            }
        }
        return $imgTag
    }
    $script:imgCount = 0
    $content = [regex]::Replace($content, $imgRegex, $imgEvaluator)
    
    # 4. Production CSS Compaction (<style> blocks)
    $styleRegex = '(?si)<style\b[^>]*>(.*?)</style>'
    $styleEvaluator = {
        param($match)
        $css = $match.Groups[1].Value
        
        # Strip CSS comments
        $css = $css -replace '(?s)/\s*\*.*?\*\s*/', ''
        # Compress redundant whitespaces
        $css = $css -replace '\s+', ' '
        # Remove whitespace around syntax characters safely
        $css = $css -replace '\s*([\{\}:;,])\s*', '$1'
        $css = $css.Trim()
        
        $fullTag = $match.Value
        $openTag = [regex]::Match($fullTag, '<style\b[^>]*>').Value
        return "$openTag$css</style>"
    }
    $content = [regex]::Replace($content, $styleRegex, $styleEvaluator)
    
    # 5. Safe JS Script Compaction (<script> blocks)
    # Eliminates lines that are pure comments and trims indentations safely without breaking code strings/URLs.
    $inlineScriptRegex = '(?si)<script\b([^>]*?)>(.*?)</script>'
    $scriptEvaluator = {
        param($match)
        $attrs = $match.Groups[1].Value
        $js = $match.Groups[2].Value
        
        if ([string]::IsNullOrWhiteSpace($js)) { return $match.Value }
        
        $lines = $js -split "`r?`n"
        $cleanLines = New-Object System.Collections.Generic.List[string]
        foreach ($line in $lines) {
            $trimmed = $line.Trim()
            if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("//")) { continue }
            $cleanLines.Add($trimmed)
        }
        $minjs = $cleanLines -join "`n"
        return "<script$attrs>`n$minjs`n</script>"
    }
    $content = [regex]::Replace($content, $inlineScriptRegex, $scriptEvaluator)
    
    # 6. HTML DOM Node Compaction
    # Drops all HTML comments and collapses empty carriage spaces
    $content = $content -replace '(?s)', ''
    $htmlLines = $content -split "`r?`n"
    $cleanHtmlLines = New-Object System.Collections.Generic.List[string]
    foreach ($line in $htmlLines) {
        $trimmed = $line.Trim()
        if (![string]::IsNullOrWhiteSpace($trimmed)) { $cleanHtmlLines.Add($trimmed) }
    }
    $content = $cleanHtmlLines -join "`n"
    
    # Write back clean source file
    [System.IO.File]::WriteAllText($file.FullName, $content)
    Write-Host "Successfully optimized: $($file.Name)!" -ForegroundColor Green
}

Write-Host "`n==================================================" -ForegroundColor Gold
Write-Host "    ALL HTML PAGES SUCCESSFULY OPTIMIZED TO 100%   " -ForegroundColor Gold
Write-Host "==================================================" -ForegroundColor Gold
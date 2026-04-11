$replacements = [ordered]@{
    "prompt-engineering-01.html" = "lessons/what-is-prompt-engineering.html"
    "prompt-engineering-02.html" = "lessons/building-the-production-system-prompt.html"
    "prompt-engineering-03.html" = "lessons/chain-of-thought-and-self-consistency.html"
    "prompt-engineering-04.html" = "lessons/prompt-chaining-and-pipeline-design.html"
    "prompt-engineering-05.html" = "lessons/rag-and-context-injection.html"
    "prompt-engineering-06.html" = "lessons/evaluation-and-testing.html"
}

# 1. Update global files
foreach ($file in @("index.html", "lessons.html", "llms.txt", "sitemap.xml")) {
    $content = Get-Content $file -Raw
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    Set-Content $file $content
}

# 2. Update files inside lessons/
$lessonReplacements = [ordered]@{
    "prompt-engineering-01.html" = "what-is-prompt-engineering.html"
    "prompt-engineering-02.html" = "building-the-production-system-prompt.html"
    "prompt-engineering-03.html" = "chain-of-thought-and-self-consistency.html"
    "prompt-engineering-04.html" = "prompt-chaining-and-pipeline-design.html"
    "prompt-engineering-05.html" = "rag-and-context-injection.html"
    "prompt-engineering-06.html" = "evaluation-and-testing.html"
}

$lessonFiles = Get-ChildItem "lessons/*.html"
foreach ($file in $lessonFiles) {
    if ($file -match "what-is|building|chain|rag|pipeline|evaluation") {
        $content = Get-Content $file.FullName -Raw
        
        # Absolute URL replacements (metadata, canonicals)
        foreach ($key in $replacements.Keys) {
            $absKey = "https://hedimanai-pro.github.io/$key"
            $absVal = "https://hedimanai-pro.github.io/" + $replacements[$key]
            $content = $content.Replace($absKey, $absVal)
        }

        # Relative internal links (prev/next lesson nav)
        foreach ($key in $lessonReplacements.Keys) {
            $content = $content.Replace("href=""$key""", "href=""" + $lessonReplacements[$key] + """")
        }

        # Relative assets/index 
        $content = $content.Replace("href=""assets/", "href=""../assets/")
        $content = $content.Replace("src=""assets/", "src=""../assets/")
        $content = $content.Replace("href=""index.html", "href=""../index.html")
        
        Set-Content $file.FullName $content
    }
}

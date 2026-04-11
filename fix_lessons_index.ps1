# 1. Move lessons.html to lessons/index.html
Move-Item "lessons.html" "lessons/index.html"

# 2. Update the new lessons/index.html
$content = Get-Content "lessons/index.html" -Raw

# Update relative links outwards
$content = $content.Replace('href="assets/', 'href="../assets/')
$content = $content.Replace('src="assets/', 'src="../assets/')
$content = $content.Replace('href="index.html', 'href="../index.html')

# Update canonical and OG URLs
$content = $content.Replace('https://hedimanai-pro.github.io/lessons.html', 'https://hedimanai-pro.github.io/lessons/')

# Update sibling links in the JavaScript array
$content = $content.Replace("href: 'lessons/", "href: '")

Set-Content "lessons/index.html" $content

# 3. Update root index.html link to lessons.html (if any exist, though currently None but we do it just in case)
$indexContent = Get-Content "index.html" -Raw
$indexContent = $indexContent.Replace('href="lessons.html"', 'href="lessons/"')
Set-Content "index.html" $indexContent

# 4. Update JS logic in root if there are other occurrences
# Wait, no other occurrences of lessons.html exist because the root lessons file was an independent page 
# We should also grep across any other files that might still have lessons.html.
$files = Get-ChildItem -File -Recurse -Include *.html,*.txt,*.xml
foreach ($file in $files) {
    if ($file.Name -ne "index.html" -and $file.Directory.Name -ne "lessons") {
        $text = Get-Content $file.FullName -Raw
        if ($text -match 'lessons.html') {
            $text = $text -replace 'lessons\.html', 'lessons/'
            Set-Content $file.FullName $text
        }
    }
}

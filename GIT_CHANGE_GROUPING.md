# Git Change Grouping

## Steps

1. Scan
   git status
   git diff

2. Classify
   feature | fix | refactor | chore | docs | test

3. Group
   - Group by intent (NOT files)
   - Each group = ONE purpose

4. Validate
   - clear
   - isolated
   - reviewable
   → else split

5. Separate
   - no mixed changes
   - no multiple fixes
   - no hidden refactors
   - no "misc"

6. Commit
   git add <files>
   git commit -m "<type>(scope): message"

7. Comment
   what + why + scope

8. Risk
   low | medium | high

9. Repeat per group

## Rule

Small, isolated commits > large mixed commits
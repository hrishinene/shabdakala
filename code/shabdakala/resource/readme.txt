### 02 Dec 2024 - 18:13:03
# Making combos
# --------------
source ~/.bashrc
source ~/github/scripts/gc_devdashboard/dashboard.sh
cd /Users/hrishinene/shabdak_github/sbbd/shabdakala/code/shabdakala/resource/.

# open in excel and load and check
open sbwords.xlsx
# open marathi words transliteration
open https://www.google.com/intl/mr/inputtools/try/

# After modifying sbwords.xlsx without

# if not exists create work dir
mkdir work
cd work
rm -rf ./*

# copy files
cp ../sbwords.xlsx .
cp ../tpls_tmpl.ts tuples.ts
cp /Users/hrishinene/shabdak_github/sbbd/shabdakala/code/shabdakala/src/constants/tuples.ts ./tuples_orig.ts

### Install Python stuff
# if pandas error
python3 -m venv path/to/venv
source path/to/venv/bin/activate
python3 -m pip install pandas

# if openxyl error
pip install openpyxl

# finally make tuples
python /Users/hrishinene/shabdak_github/sbbd/shabdakala/code/shabdakala/scripts/python/csv2combo.py sbwords.xlsx ./tuples.ts

# Compare tuples files
diff tuples.ts tuples_orig.ts

# Once convinced, copy on to the src
cp tuples.ts /Users/hrishinene/shabdak_github/sbbd/shabdakala/code/shabdakala/src/constants/tuples.ts

********* Python errors **********



import argparse
import os
import random
import pandas as pd
import json
import re

def contains_english(word):
    return False
    # return bool(re.search(r'[a-zA-Z]', word))

def update_final_tuples_list(excel_file_path: str, ts_file_path: str, ind: int = None):
    """
    Process a EXCEL file to extract tuples, mark its statys, and update the Tuples in a TypeScript file.

    Args:
        excel_file_path (str): Path to the .excel file containing tuple data.
        ts_file_path (str): Path to the .ts file containing the Tuples.
        index (int, optional): Position to insert new tuples. If None, append to the end of the list.

    Raises:
        FileNotFoundError: If the specified files are not found.
        ValueError: If the .ts file does not contain the expected structure.
    """
    #Step-1 : load .excel file into DataFrame
    # Check if the EXCEL file exists
    if not os.path.exists(excel_file_path):
        raise FileNotFoundError(f"EXCEL file not found: {excel_file_path}")

    # Load the EXCEL file into a DataFrame
    df = pd.read_excel(excel_file_path)

    #Step-2 : load .ts file
    # Check if the TypeScript file exists
    if not os.path.exists(ts_file_path):
        raise FileNotFoundError(f"TypeScript file not found: {ts_file_path}")

    # Read and parse the TypeScript file
    with open(ts_file_path, 'r', encoding='utf-8') as file:
        content = file.read()

        # Ensure it contains the 'Tuples' assignment
        if "export const Tuples = " not in content:
            raise ValueError("The file does not contain the expected 'Tuples' definition.")

        # Extract JSON data from the file
        json_data = content.replace("export const Tuples = ", "").rstrip(";")

        # Parse the JSON data
        try:
            final_tuples_list = json.loads(json_data)
        except json.JSONDecodeError as e:
            raise ValueError(f"Error decoding JSON from TypeScript file: {e}")
        
    # Extract tuples from the EXCEL
    result = []
    processed = 0;
    rowIndex = 0;
    for index, row in df.iterrows():
        # print(f"Processing row: {row}") 
        words = row[["word0", "word1", "word2", "word3"]].dropna().tolist()
        theme = row["theme"]
        sharedBy = row["from"]

        # Check if no word contains English alphabets
        if all(not contains_english(word) for word in words):
            processed += 1
        else:
            print(f"English words found in row {index + 2} of the EXCEL file: {words}") 
            continue
        
        if len(words) != 4 or pd.isna(theme[0]):
            print(f"Number of words is not 4 or theme is missing in row {index + 2} of the EXCEL file: {words}") 
            continue

        # print(f"Processing words: {words}") 

        if pd.isna(sharedBy[0]):
            sharedBy = "शब्दबंध टीम"

        entry = {
            "words": words,
            "theme": theme,
            "sharedBy": sharedBy,
            "difficulty" : rowIndex % 3
        }
            
        # print(f"Adding entry: {entry}")
        result.append(entry)
        rowIndex += 1

    #Step-3 : update status in .excel file
    # df.to_excel(excel_file_path, index=False)   


    # Step-4 : update .ts file with Tuples - in groups of 3
    for i in range(0, len(result), 3):
        group = result[i:i+3]
        if len(group) == 3:
            # Process the group of 3 elements
            t1, t2, t3 = group
            # Your processing logic here
            if ind is not None and ind >= 0:
                final_tuples_list.insert(ind, [t1, t2, t3])
            else:
                final_tuples_list.append([t1, t2, t3])
        else:
            # Handle the case where the group has fewer than 3 elements
            print(f"Group with fewer than 3 elements: {group}")

    # Save the updated Tuples back to the TypeScript file
    typescript_content = "export const Tuples = " + json.dumps(final_tuples_list, ensure_ascii=False, indent=4) + ";"

    with open(ts_file_path, "w", encoding="utf-8") as file:
        file.write(typescript_content)

    print(f"Updated TypeScript file saved at: {ts_file_path}, processed {processed} rows.")


# Add this section for command-line usage
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Update Tuples.ts with data from a EXCEL file.")
    parser.add_argument("excel_path", help="Path to the EXCEL file")
    parser.add_argument("ts_path", help="Path to the TypeScript file")
    parser.add_argument("--index", type=int, help="Index to insert tuples at. Defaults to appending at the end.", default=None)
    args = parser.parse_args()

    # Call the function with command-line arguments
    update_final_tuples_list(args.excel_path, args.ts_path, args.index)

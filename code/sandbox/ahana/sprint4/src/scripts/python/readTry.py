import argparse
import os
import pandas as pd
import json


def update_final_tuples_list(csv_file_path: str, ts_file_path: str):
    """
    Process a CSV file to extract tuples, clear its contents, and update the FinalTuplesList in a TypeScript file.

    Args:
        csv_file_path (str): Path to the .csv file containing tuple data.
        ts_file_path (str): Path to the .ts file containing the FinalTuplesList.

    Raises:
        FileNotFoundError: If the specified files are not found.
        ValueError: If the .ts file does not contain the expected structure.
    """
    # Check if the CSV file exists
    if not os.path.exists(csv_file_path):
        raise FileNotFoundError(f"CSV file not found: {csv_file_path}")

    # Load the CSV file into a DataFrame
    df = pd.read_csv(csv_file_path)

    # Extract tuples from the CSV
    result = []
    for index, row in df.iterrows():
        words = row[["शब्द१", "शब्द२", "शब्द३", "शब्द४"]].dropna().tolist()
        entry = {
            "words": words,
            "theme": row["विषय(थीम)"],
            "sharedBy": row["from"],
            "difficulty": int(row["difficulty (1/2/3)"])  # Convert difficulty to integer
        }
        result.append(entry)

    # Clear the contents of the DataFrame (retain the header)
    df.iloc[0:0].to_csv(csv_file_path, index=False)

    # Check if the TypeScript file exists
    if not os.path.exists(ts_file_path):
        raise FileNotFoundError(f"TypeScript file not found: {ts_file_path}")

    # Read and parse the TypeScript file
    with open(ts_file_path, 'r', encoding='utf-8') as file:
        content = file.read()

        # Ensure it contains the 'FinalTuplesList' assignment
        if "export const FinalTuplesList = " not in content:
            raise ValueError("The file does not contain the expected 'FinalTuplesList' definition.")

        # Extract JSON data from the file
        json_data = content.replace("export const FinalTuplesList = ", "").rstrip(";")

        # Parse the JSON data
        try:
            final_tuples_list = json.loads(json_data)
        except json.JSONDecodeError as e:
            raise ValueError(f"Error decoding JSON from TypeScript file: {e}")

    # Update the FinalTuplesList
    for new_tuple in result:
        difficulty = new_tuple["difficulty"]

        # Ensure the difficulty level exists in FinalTuplesList
        while difficulty >= len(final_tuples_list):
            final_tuples_list.append([])

        # Append the new tuple
        final_tuples_list[difficulty].append(new_tuple)

    # Save the updated FinalTuplesList back to the TypeScript file
    typescript_content = "export const FinalTuplesList = " + json.dumps(final_tuples_list, ensure_ascii=False, indent=4) + ";"

    with open(ts_file_path, "w", encoding="utf-8") as file:
        file.write(typescript_content)

    print(f"Updated TypeScript file saved at: {ts_file_path}")


# Add this section for command-line usage
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Update FinalTuplesList.ts with data from a CSV file.")
    parser.add_argument("csv_path", help="Path to the CSV file")
    parser.add_argument("ts_path", help="Path to the TypeScript file")
    args = parser.parse_args()

    # Call the function with command-line arguments
    update_final_tuples_list(args.csv_path, args.ts_path)

#----------------------------------------------code that works-------------------------------------------------------------
# import os
# import pandas as pd
# import json
# #<AGA> : after running this script, all data from .csv file, line-2 onwards, is cleared. **line-1 is kept intact**
# #<AGA> : this script fetches the tuples from .csv into temporary Python list "result"

# # Define the file path
# script_dir = os.path.dirname(os.path.abspath(__file__))  # Current script's directory
# resources_dir = os.path.join(script_dir, "../../resources")  # Relative path to 'resources'
# csv_file_name = "Shabdabandha Tuples - Tuples.csv"
# csv_file_path = os.path.join(resources_dir, csv_file_name)

# # Check if the file exists
# if os.path.exists(csv_file_path):
#     print(f"CSV file found at: {csv_file_path}")
    
#     # Load the CSV file into a DataFrame
#     df = pd.read_csv(csv_file_path)
#     # print("Columns in CSV:", df.columns.tolist())
#     result = []
#     for index, row in df.iterrows():
#         # Extract words from specific columns
#         words = row[["शब्द१", "शब्द२", "शब्द३", "शब्द४"]].dropna().tolist()
        
#         # Create the entry dictionary in the desired format
#         entry = {
#             "words": words,
#             "theme": row["विषय(थीम)"],
#             "sharedBy": row["from"],
#             "difficulty": int(row["difficulty (1/2/3)"])  # Convert difficulty to integer
#         }
        
#         result.append(entry)
        
#         # Remove the processed row from the DataFrame (clear the entry)
#         df.drop(index, inplace=True)

#     # Save the updated DataFrame back to the CSV file
#     df.to_csv(csv_file_path, index=False)

#     # # Output the processed result
#     # print("Processed Tuples:")
#     # for item in result:
#     #     print(item)
# else:
#     print(f"File '{csv_file_name}' not found in the resources directory: {resources_dir}")

# #-------------------------------------------------------------------------------------------------------------------
# #<AGA> : this script intelligently passes the tuples loaded from .csv file to FinalTuplesList.ts 

# # Define the project root directory and target file name
# script_dir = os.path.dirname(os.path.abspath(__file__))  # Current script's directory
# project_root = os.path.join(script_dir, "../../")  # Assuming project root is two levels up
# target_file_name = "FinalTuplesList.ts"

# # Step 1: Search for the FinalTuplesList.ts file
# target_file_path = None
# for root, dirs, files in os.walk(project_root):
#     if target_file_name in files:
#         target_file_path = os.path.join(root, target_file_name)
#         break

# if not target_file_path:
#     raise FileNotFoundError(f"'{target_file_name}' not found in the project directory: {project_root}")

# print(f"Target file found at: {target_file_path}")

# # Step 2: Read and parse the existing file
# with open(target_file_path, 'r', encoding='utf-8') as file:
#     content = file.read()

#     # Step 2.1: Check the content to inspect for any issues
#     # print("File content preview (first 500 characters):", content[:500])  # Print first 500 chars for debugging

#     # Ensure it contains the 'FinalTuplesList' assignment
#     if "export const FinalTuplesList = " not in content:
#         raise ValueError("The file does not contain the expected 'FinalTuplesList' definition.")

#     # Step 2.2: Strip TypeScript-specific syntax
#     json_data = content.replace("export const FinalTuplesList = ", "").rstrip(";")

#     # Step 3: Attempt to load the JSON data
#     try:
#         final_tuples_list = json.loads(json_data)
#     except json.JSONDecodeError as e:
#         print("Error while decoding JSON:", e)
#         print("Problematic JSON data:", json_data)  # Print problematic JSON for debugging
#         raise

# for difficulty in [0, 1, 2]:  # You can extend this list to include more levels if needed
#     # Check if the difficulty level is represented in the corresponding sublist
#     difficulty_exists = any(tuple["difficulty"] == difficulty for tuple in final_tuples_list[difficulty])
    
#     if not difficulty_exists:
#         print(f"Difficulty {difficulty} not there apparently.")
#         # final_tuples_list[difficulty] = []  # Create an empty list for the difficulty level if missing

# # Step 4: Append the new tuples to the appropriate sublist based on their difficulty
# for new_tuple in result:
#     difficulty = new_tuple["difficulty"]

#     # Check if the difficulty level is valid and exists in final_tuples_list
#     if difficulty >= len(final_tuples_list):  # If difficulty level exceeds available lists
#         print(f"Difficulty level {difficulty} not found in FinalTuplesList; skipping tuple.")
#         continue
    
#     # Append the new_tuple to the corresponding sublist
#     final_tuples_list[difficulty].append(new_tuple)

# # Step 5: Save the updated data back to a TypeScript file
# typescript_content = "export const FinalTuplesList = " + json.dumps(final_tuples_list, ensure_ascii=False, indent=4) + ";"

# with open(target_file_path, "w", encoding="utf-8") as file:
#     file.write(typescript_content)

# print(f"Updated file saved at: {target_file_path}")



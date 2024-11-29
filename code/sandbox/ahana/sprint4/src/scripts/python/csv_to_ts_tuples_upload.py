import argparse
import os
import random
import pandas as pd
import json
import enchant
import re

def contains_english(word):
    return bool(re.search(r'[a-zA-Z]', word))

def update_final_tuples_list(csv_file_path: str, ts_file_path: str, ind: int = None):
    """
    Process a CSV file to extract tuples, clear its contents, and update the FinalTuplesList in a TypeScript file.

    Args:
        csv_file_path (str): Path to the .csv file containing tuple data.
        ts_file_path (str): Path to the .ts file containing the FinalTuplesList.
        index (int, optional): Position to insert new tuples. If None, append to the end of the list.

    Raises:
        FileNotFoundError: If the specified files are not found.
        ValueError: If the .ts file does not contain the expected structure.
    """
    # Check if the CSV file exists
    if not os.path.exists(csv_file_path):
        raise FileNotFoundError(f"CSV file not found: {csv_file_path}")

    # Load the CSV file into a DataFrame
    df = pd.read_csv(csv_file_path)

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
        
    # Extract tuples from the CSV
    result = []

    for index, row in df.iterrows():
        words = row[["शब्द१", "शब्द२", "शब्द३", "शब्द४"]].dropna().tolist()
        theme = row["विषय(थीम)"],
        sharedBy = row["from"],
        difficulty = row["difficulty (1/2/3)"]

        flag = True
        # Check if no word contains English alphabets
        if all(not contains_english(word) for word in words):
            flag = True
        else:
            flag = False
        
        if not pd.isna(row["status"]):
            continue
        elif len(words) != 4 or pd.isna(theme[0]) or flag == False:
            print("theme detected as null or words are invalid.")
            df.at[index, 'status'] = "failure"
            continue
        else:
            if pd.isna(difficulty) or difficulty not in [0, 1, 2]:
                print("difficulty detected as null")
                difficulty = random.choice([0, 1, 2]) 
                df.at[index, 'difficulty (1/2/3)'] = difficulty

            if pd.isna(sharedBy[0]):
                print("sharedBy detected as null.")
                df.at[index, 'from'] = "Shabdabandha Team"
                sharedBy = "Shabdabandha Team"

            if ind is not None and len(final_tuples_list[int(difficulty)]) < ind:    
                print("index out of range.")
                df.at[index, 'status'] = "failure"
                continue

            entry = {
                "words": words,
                "theme": theme,
                "sharedBy": sharedBy,
                "difficulty": int(difficulty)  # Convert difficulty to integer
            }
            df.at[index, 'status'] = "success"
            result.append(entry)

    df.to_csv(csv_file_path, index=False)   

    # # Check if the TypeScript file exists
    # if not os.path.exists(ts_file_path):
    #     raise FileNotFoundError(f"TypeScript file not found: {ts_file_path}")

    # # Read and parse the TypeScript file
    # with open(ts_file_path, 'r', encoding='utf-8') as file:
    #     content = file.read()

    #     # Ensure it contains the 'FinalTuplesList' assignment
    #     if "export const FinalTuplesList = " not in content:
    #         raise ValueError("The file does not contain the expected 'FinalTuplesList' definition.")

    #     # Extract JSON data from the file
    #     json_data = content.replace("export const FinalTuplesList = ", "").rstrip(";")

    #     # Parse the JSON data
    #     try:
    #         final_tuples_list = json.loads(json_data)
    #     except json.JSONDecodeError as e:
    #         raise ValueError(f"Error decoding JSON from TypeScript file: {e}")

    # Update the FinalTuplesList
    for new_tuple in result:
        difficulty = new_tuple["difficulty"]

        # Ensure the difficulty level exists in FinalTuplesList
        while difficulty >= len(final_tuples_list):
            final_tuples_list.append([])

        # Insert or append the new tuple
        if ind is not None:
            final_tuples_list[difficulty].insert(ind, new_tuple)
        else:
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
    parser.add_argument("--index", type=int, help="Index to insert tuples at. Defaults to appending at the end.", default=None)
    args = parser.parse_args()

    # Call the function with command-line arguments
    update_final_tuples_list(args.csv_path, args.ts_path, args.index)


#---------------------------code that works---------------------------------
# import argparse
# import os
# import random
# import pandas as pd
# import json


# def update_final_tuples_list(csv_file_path: str, ts_file_path: str):
#     """
#     Process a CSV file to extract tuples, clear its contents, and update the FinalTuplesList in a TypeScript file.

#     Args:
#         csv_file_path (str): Path to the .csv file containing tuple data.
#         ts_file_path (str): Path to the .ts file containing the FinalTuplesList.

#     Raises:
#         FileNotFoundError: If the specified files are not found.
#         ValueError: If the .ts file does not contain the expected structure.
#     """
#     # Check if the CSV file exists
#     if not os.path.exists(csv_file_path):
#         raise FileNotFoundError(f"CSV file not found: {csv_file_path}")

#     # Load the CSV file into a DataFrame
#     df = pd.read_csv(csv_file_path)

#     # Extract tuples from the CSV
#     result = []
#     for index, row in df.iterrows():
#         words = row[["शब्द१", "शब्द२", "शब्द३", "शब्द४"]].dropna().tolist()
#         theme = row["विषय(थीम)"],
#         sharedBy = row["from"],
#         difficulty =  row["difficulty (1/2/3)"]
#         # print("this is outside check, sharedBy: ",sharedBy)

#         if not pd.isna(row["status"]):
#             continue
#         elif(len(words) != 4 or pd.isna(theme[0])):
#             print("theme detected as null")
#             df.at[index, 'status'] = "failure"
#             continue
#         else:
#             if(pd.isna(sharedBy[0])):
#                 print("sharedBy detected as null.")
#                 df.at[index, 'from'] = "Shabdabandha Team"
#                 sharedBy = "Shabdabandha Team"

#             if pd.isna(difficulty) or difficulty not in [0, 1, 2]:
#                 print("difficulty is detected as null")
#                 difficulty = random.choice([0, 1, 2]) 
#                 df.at[index, 'difficulty (1/2/3)'] = difficulty

#             entry = {
#                 "words": words,
#                 "theme": theme,
#                 "sharedBy": sharedBy,
#                 "difficulty": int(difficulty)  # Convert difficulty to integer
#             }
#             df.at[index, 'status'] = "success"
#             result.append(entry)

#     df.to_csv(csv_file_path, index=False)
#     print("this is df: ",df)

#     # Check if the TypeScript file exists
#     if not os.path.exists(ts_file_path):
#         raise FileNotFoundError(f"TypeScript file not found: {ts_file_path}")

#     # Read and parse the TypeScript file
#     with open(ts_file_path, 'r', encoding='utf-8') as file:
#         content = file.read()

#         # Ensure it contains the 'FinalTuplesList' assignment
#         if "export const FinalTuplesList = " not in content:
#             raise ValueError("The file does not contain the expected 'FinalTuplesList' definition.")

#         # Extract JSON data from the file
#         json_data = content.replace("export const FinalTuplesList = ", "").rstrip(";")

#         # Parse the JSON data
#         try:
#             final_tuples_list = json.loads(json_data)
#         except json.JSONDecodeError as e:
#             raise ValueError(f"Error decoding JSON from TypeScript file: {e}")

#     # Update the FinalTuplesList
#     for new_tuple in result:
#         difficulty = new_tuple["difficulty"]

#         # Ensure the difficulty level exists in FinalTuplesList
#         while difficulty >= len(final_tuples_list):
#             final_tuples_list.append([])

#         # Append the new tuple
#         final_tuples_list[difficulty].append(new_tuple)

#     # Save the updated FinalTuplesList back to the TypeScript file
#     typescript_content = "export const FinalTuplesList = " + json.dumps(final_tuples_list, ensure_ascii=False, indent=4) + ";"

#     with open(ts_file_path, "w", encoding="utf-8") as file:
#         file.write(typescript_content)

#     print(f"Updated TypeScript file saved at: {ts_file_path}")


# # Add this section for command-line usage
# if __name__ == "__main__":
#     parser = argparse.ArgumentParser(description="Update FinalTuplesList.ts with data from a CSV file.")
#     parser.add_argument("csv_path", help="Path to the CSV file")
#     parser.add_argument("ts_path", help="Path to the TypeScript file")
#     args = parser.parse_args()

#     # Call the function with command-line arguments
#     update_final_tuples_list(args.csv_path, args.ts_path)

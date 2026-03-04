from pathlib import Path
import os
from datetime import datetime


def show_file(path: Path, title: str) -> None:
    print(f"\n--- {title}: {path} ---")
    if not path.exists():
        print("(file does not exist)")
        return
    print(path.read_text(encoding="utf-8"))
def safe_edit_streaming(src: Path, transform_line_fn) -> None:
    """
    Safely edits a file by writing to a temp file and atomically replacing the original.
    This is the robust pattern for large files or “don’t risk corruption” scenarios.
    """
    tmp = src.with_suffix(src.suffix + ".tmp")

    with src.open("r", encoding="utf-8") as fin, tmp.open("w", encoding="utf-8") as fout:
        for line in fin:
            new_line = transform_line_fn(line)
            if new_line is None:
                continue  # drop line
            fout.write(new_line)

    os.replace(tmp, src)  # atomic on most platforms
def main():
    base_dir = Path("demo_files")
    base_dir.mkdir(exist_ok=True)

    notes_path = base_dir / "project_notes.txt"

    # 1) Create a real file (overwrite if it already exists)
    initial_text = (
        "Project: Apollo\n"
        "Owner: Meddy\n"
        "Status: DRAFT\n"
        "\n"
        "TODO:\n"
        "- Finish requirements\n"
        "- Send to reviewers\n"
        "- DELETE_ME: temporary placeholder line\n"
    )
    notes_path.write_text(initial_text, encoding="utf-8")

    show_file(notes_path, "INITIAL FILE CONTENTS")
# 2) Read the file (entire file)
    text = notes_path.read_text(encoding="utf-8")

    # 3) Edit #1: replace a value (Status: DRAFT -> Status: FINAL)
    text = text.replace("Status: DRAFT", "Status: FINAL")

    # 4) Edit #2: insert a line after a marker (after "Owner: ...")
    lines = text.splitlines(True)  # keep line endings
    updated_lines = []
    for line in lines:
        updated_lines.append(line)
        if line.startswith("Owner:"):
            updated_lines.append(f"Last-Updated: {datetime.now().isoformat(timespec='seconds')}\n")

    # Write back the edited content
    notes_path.write_text("".join(updated_lines), encoding="utf-8")

    show_file(notes_path, "AFTER REPLACE + INSERT")

    # 5) Append a new note (adds to end)
    with notes_path.open("a", encoding="utf-8") as f:
        f.write("\nNOTE: Kickoff meeting scheduled next week.\n")

    show_file(notes_path, "AFTER APPEND")

    # 6) Safe edit (streaming): delete lines containing "DELETE_ME"
    def transform(line: str):
        if "DELETE_ME" in line:
            return None  # drop line
        return line

    safe_edit_streaming(notes_path, transform)

    show_file(notes_path, "AFTER SAFE STREAMING EDIT (DELETE LINE)")

    print("\nDone. Files created in:", base_dir.resolve())
if __name__ == "__main__":
    main()

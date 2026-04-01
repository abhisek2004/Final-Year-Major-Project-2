import streamlit as st
import pandas as pd
import numpy as np
from PyPDF2 import PdfReader
import re
import nltk
from pathlib import Path
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
from nltk.corpus import stopwords
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from bs4 import BeautifulSoup
from io import BytesIO

# POS TAG AND Word Lemmatizer

# { Part-of-speech constants
ADJ, ADJ_SAT, ADV, NOUN, VERB = 'a', 's', 'r', 'n', 'v'
# }
POS_LIST = [NOUN, VERB, ADJ, ADV]

NUM_POSTING = 50

TOP_N_KEYWORDS = 5


@st.cache_resource(show_spinner=False)
def _ensure_nltk_resources():
    nltk.download('punkt', quiet=True)
    # Newer NLTK versions may require `punkt_tab` for word tokenization.
    nltk.download('punkt_tab', quiet=True)
    nltk.download('averaged_perceptron_tagger', quiet=True)
    nltk.download('wordnet', quiet=True)
    nltk.download('stopwords', quiet=True)


def _inject_css():
    try:
        with open('style.css', encoding="utf-8") as f:
            st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)
    except FileNotFoundError:
        return


def page_main():
    # ---------- CUSTOM HEADER ----------
    st.markdown("""
<style>
.main-title {
    text-align: center;
    font-size: 42px;
    font-weight: bold;
    color: #0f62fe;
}
.sub-title {
    text-align: center;
    font-size: 18px;
    color: #555;
}
.card {
    padding: 15px;
    border-radius: 10px;
    background: #f5f7fa;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
    text-align: center;
}
</style>
""", unsafe_allow_html=True)

    # ---------- HERO SECTION ----------
    st.markdown("""
<div class="main-title">🚀 AI-Based Internship Recommendation System</div>
<div class="sub-title">
Find the best internship for your skills using smart matching techniques
</div>
""", unsafe_allow_html=True)

    st.markdown("---")

    # ---------- WHY THIS SYSTEM ----------
    st.markdown("## 🎯 Why This System is Needed")

    st.markdown("""
- Students face confusion due to a large number of internship options  
- No proper system to match skills with internship roles  
- Many applications are mismatched  
- Manual searching is time-consuming  

👉 This system solves these problems by providing **automatic and relevant recommendations**
""")

    # ---------- STATS SECTION ----------
    st.markdown("## 📊 Project Overview")

    col1, col2, col3, col4 = st.columns(4)

    col1.metric("Total Data Collected", "1898")
    col2.metric("Valid Internships", "657")
    col3.metric("Data Science Accuracy", "70%")
    col4.metric("Web Dev Accuracy", "80%")

    # ---------- SYSTEM WORKFLOW ----------
    st.markdown("## ⚡ System Workflow")

    st.markdown("""
1. User uploads resume (PDF / TXT / DOCX)  
2. Resume text is extracted  
3. Text is cleaned and processed  
4. Important keywords are identified  
5. TF-IDF converts text into numerical form  
6. Cosine similarity compares resume with internships  
7. Top matching internships are selected  
""")

    # ---------- TECHNICAL WORKING ----------
    st.markdown("## 🧠 Technical Working")

    st.markdown("""
- Resume and internship data are converted into vectors  
- TF-IDF identifies important words  
- Cosine similarity calculates matching score  

**Formula Used:**

Cosine Similarity = (A · B) / (||A|| × ||B||)

Where:
- A = Resume vector  
- B = Internship vector  
""")

    # ---------- DATASET DETAILS ----------
    st.markdown("## 📂 Dataset Details")

    st.markdown("""
- Data collected using Selenium and Beautiful Soup  
- Initial records: 1898  
- After cleaning: 657 valid internships  
- Removed inactive and incomplete entries  
- Dataset mainly contains software-related roles  
""")

    # ---------- KEY FEATURES ----------
    st.markdown("## 🔥 Key Features")

    col1, col2 = st.columns(2)

    with col1:
        st.markdown("""
- ✔ Resume-based matching  
- ✔ Automatic recommendation  
- ✔ Clean dataset usage  
- ✔ No manual filtering required  
""")

    with col2:
        st.markdown("""
- ✔ Fast processing  
- ✔ Supports multiple file formats  
- ✔ Simple user interface  
- ✔ Reliable output  
""")

    # ---------- SAMPLE OUTPUT ----------
    st.markdown("## 💡 Sample Recommendation Output")

    st.markdown("""
**Internship Title:** Web Developer Intern  
**Company:** Example Tech  
**Location:** Remote  
**Apply Link:** Available  
""")

    # ---------- PERFORMANCE ----------
    st.markdown("## 📈 Performance Analysis")

    st.markdown("""
- Data Science Testing:
  - Total: 40  
  - Correct: 28  
  - Accuracy: 70%  

- Web Development Testing:
  - Total: 40  
  - Correct: 32  
  - Accuracy: 80%  

👉 The system performs better when resumes contain clear keywords
""")

    # ---------- ADVANTAGES ----------
    st.markdown("## ✅ Advantages")

    st.markdown("""
- Reduces time for searching internships  
- Provides relevant recommendations  
- Works on real dataset  
- Easy to use for students  
""")

    # ---------- LIMITATIONS ----------
    st.markdown("## ⚠️ Limitations")

    st.markdown("""
- Depends on quality of resume  
- Works mainly for text-based matching  
- Dataset size is limited  
""")

    # ---------- FUTURE IMPROVEMENTS ----------
    st.markdown("## 🔮 Future Enhancements")

    st.markdown("""
- Increase dataset size  
- Add more domains  
- Improve matching techniques  
- Add real-time data updates  
""")

    # ---------- IMAGE SECTION ----------
    st.markdown("## 📸 Visual Overview")

    col1, col2, col3 = st.columns(3)

    with col1:
        st.image("https://images.unsplash.com/photo-1521737604893-d14cc237f11d")

    with col2:
        st.image("https://images.unsplash.com/photo-1551288049-bebda4e38f71")

    with col3:
        st.image("https://images.unsplash.com/photo-1519389950473-47ba0277781c")

    # ---------- FINAL CTA ----------
    st.markdown("---")
    st.markdown("## 🚀 Start Exploring Our Project")

    st.markdown("Explore how our system works and discover internship recommendations based on your resume.")

    st.button("🔍 Explore Now")


def page_dataset():
    st.title("Dataset")
    st.markdown("This page shows the datasets available in the `Testing` folder.")

    base_dir = Path(__file__).resolve().parent
    testing_dir = base_dir / "Testing"

    datasets = [
        ("Job Posting (job_posting.csv)", testing_dir / "job_posting.csv"),
        ("Data Science Roles (data_science_roles_testing.csv)", testing_dir / "data_science_roles_testing.csv"),
        ("Web Dev Roles (web_dev_roles_testing.csv)", testing_dir / "web_dev_roles_testing.csv"),
    ]

    missing = [str(p) for _, p in datasets if not p.exists()]
    if missing:
        st.error("Some dataset files are missing from the `Testing` folder.")
        st.code("\n".join(missing))
        return

    tabs = st.tabs([name for name, _ in datasets])
    for (name, path), tab in zip(datasets, tabs):
        with tab:
            st.subheader(name)
            df = pd.read_csv(path)

            if "Application/Link" in df.columns:
                st.markdown("Preview (links are clickable):")
                st.write(df.head(50).to_html(escape=False), unsafe_allow_html=True)
            else:
                st.dataframe(df.head(200), use_container_width=True, height=450)

            st.markdown("Download")
            st.download_button(
                label="Download CSV",
                data=path.read_bytes(),
                file_name=path.name,
                mime="text/csv",
            )


def page_analysis():
    st.title("Analysis")
    st.markdown("This page will contain charts and analysis of the dataset.")
    st.markdown("---")
    st.subheader("Project Diagrams")

    images_dir = Path(__file__).resolve().parent / "images"
    diagram_files = [
        ("SYSTEM ARCHITECTURE DIAGRAM.jpeg", "System Architecture Diagram"),
        ("Use case diagram.jpeg", "Use Case Diagram"),
        ("flow chat.jpeg", "Flow Chart"),
        ("Dfd level 0.jpeg", "DFD Level 0"),
        ("Dfd level 1.jpeg", "DFD Level 1"),
    ]

    existing = [(images_dir / f, title) for (f, title) in diagram_files if (images_dir / f).exists()]
    if not existing:
        st.warning("No images found in the local `images` folder.")
        return

    def _diagram_note(t: str) -> str:
        if "Architecture" in t:
            return "Shows the overall structure of the system, key modules, and how the components connect."
        if "Use Case" in t:
            return "Highlights the main user actions and system interactions for the internship recommendation workflow."
        if "Flow" in t:
            return "Illustrates the end-to-end process from resume upload to final recommendations."
        if "DFD Level 0" in t:
            return "Provides a high-level view of inputs, processing, and outputs in the system."
        if "DFD Level 1" in t:
            return "Expands the internal processes in more detail, showing how data moves between steps."
        return ""

    cols = st.columns(2)
    for i, (path, title) in enumerate(existing):
        with cols[i % 2]:
            st.image(str(path), caption=title, use_column_width=True)
            note = _diagram_note(title)
            if note:
                st.caption(note)


def page_model_prediction():
    st.title("Our Model Prediction")
    st.markdown(
        """
This page generates internship recommendations from your resume using **TF‑IDF + cosine similarity**.

It reads your resume text, cleans it (removes stopwords, lemmatizes words, keeps only meaningful terms), and then compares it with internship roles from the dataset. The output is a ranked list of internships that are most similar to your resume.

## How to use this page

1. Upload your resume in **PDF**, **TXT**, or **DOCX**
2. Wait for the resume to be processed
3. Review:
   - the **Top Keywords** extracted from your resume
   - the **recommended internships table** (higher rows are more relevant)
4. Download the results using the **Download CSV / Download Excel** buttons

## Tips for better recommendations

- Include clear skills and tools in your resume (for example: Python, SQL, HTML, React, Machine Learning)
- Add a short summary section and project descriptions (keywords improve matching)
- If your resume is mostly images or scanned, use a text-based PDF or TXT for best results

## What the results mean

- Recommendations are based on text similarity, not on interview selection
- The system performs best when your resume contains clear domain keywords
"""
    )

    uploaded_file = st.file_uploader(
        "Upload a PDF, TXT or DOCX file", type=["txt", "pdf", "docx"]
    )

    if uploaded_file is None:
        st.info("Upload a resume file to get recommendations.")
        return

    st.success(f"Uploaded: {uploaded_file.name}")
    st.info(f"File size: {uploaded_file.size} bytes")

    try:
        resume = read_uploaded_resume(uploaded_file)
    except Exception as e:
        st.error("Could not read the uploaded resume file.")
        st.code(str(e))
        return
    resume = pre_process_resume(resume)

    try:
        job_df = get_job_df()
    except Exception as e:
        st.error(
            "Job dataset could not be loaded. Make sure `WebCrawler/table.html` exists and is readable."
        )
        st.code(str(e))
        return

    df_resume_sorted = post_process_table(resume, job_df)
    display_features_slider(resume, job_df)
    download_csv(df_resume_sorted)
    st.write(df_resume_sorted.to_html(escape=False), unsafe_allow_html=True)


def page_about():
    st.title("About the Project")
    st.image("https://images.unsplash.com/photo-1521737604893-d14cc237f11d")
    st.markdown(
        """
## Project Title
AI-Based Internship Recommendation Engine for PM Internship Scheme

---

## Project Overview

This project is developed to help students find suitable internship opportunities based on their skills and resume content. Many students face difficulty in selecting internships due to a large number of options and lack of proper guidance. This system solves that problem by automatically recommending internships using text-based matching techniques.

The system takes a resume as input, processes the text, and compares it with internship descriptions to generate relevant recommendations. The goal is to reduce confusion and help students focus only on suitable opportunities.

---

## Problem Statement

Students often apply for internships without understanding whether their skills match the requirements. This leads to:

- Mismatched applications  
- Wasted time  
- Missed opportunities  

Also, many students do not have proper tools to analyze their resume and compare it with available internships. This creates a need for a system that can automatically match skills with internship roles.

---

## Proposed Solution

This system provides a simple and effective solution where:

- Users upload their resume  
- The system extracts and processes the text  
- Matching is done using TF-IDF and cosine similarity  
- Top internships are recommended based on similarity  

The system focuses on providing only the most relevant internships instead of showing a large list.

---

## Technical Approach

The project uses a structured approach for matching:

1. Resume text extraction  
2. Text preprocessing (cleaning, lemmatization, stop word removal)  
3. Conversion of text into vectors using TF-IDF  
4. Calculation of similarity using cosine similarity  
5. Ranking and selection of top internships  

---

## Dataset Information

- Data collected using Selenium and Beautiful Soup  
- Total records collected: 1898  
- After cleaning: 657 valid internship records  
- Removed inactive and incomplete entries  
- Dataset mainly contains software-related roles  

---

## System Workflow

- Resume upload  
- Text extraction  
- Data preprocessing  
- Feature extraction (TF-IDF)  
- Similarity calculation  
- Recommendation generation  

---

## Performance Results

The system was tested using domain-specific data:

- Data Science Domain:
  - Total: 40  
  - Correct: 28  
  - Accuracy: 70%  

- Web Development Domain:
  - Total: 40  
  - Correct: 32  
  - Accuracy: 80%  

The system performs better when resumes contain clear and relevant keywords.

---

## Key Features

- Resume-based internship recommendation  
- Uses TF-IDF and cosine similarity  
- Clean and filtered dataset  
- Fast and automatic processing  
- Simple and easy-to-use interface  
- Supports PDF, TXT, DOCX formats  

---

## Objectives of the Project

- To help students find relevant internships  
- To reduce mismatched applications  
- To automate the internship search process  
- To improve decision-making using data  

---

## Scope of the System

The system can be used by students to:

- Upload their resume  
- Get internship recommendations  
- Understand their key skills  

The system can be extended to include more domains and larger datasets.

---

## Technologies Used

- Python  
- Streamlit  
- Selenium  
- Beautiful Soup  
- NLTK  
- Scikit-learn  

---

## Advantages

- Saves time for students  
- Provides relevant results  
- Easy to use  
- Works with real data  
- No manual filtering required  

---

## Limitations

- Depends on resume quality  
- Limited dataset size  
- Text-based matching only  
- Does not include real-time updates  

---

## Future Enhancements

- Add more internship data  
- Improve matching techniques  
- Support more domains  
- Add real-time data updates  
- Improve user interface  

---

## Final Note

This project demonstrates how text processing and similarity techniques can be used to solve real-world problems. It provides a practical solution for internship recommendation and helps students make better career decisions.

---
"""
    )


def page_feedback():
    st.title("Feedback")
    st.markdown("This page will collect feedback from users.")
    st.text_input("Your name (optional)")
    st.text_input("Email (optional)")
    rating = st.slider("Rating", min_value=1, max_value=5, value=5)
    message = st.text_area("Your feedback")
    if st.button("Submit feedback"):
        st.success("Thanks! (Saving feedback will be added next.)")
        st.write({"rating": rating, "message": message})


def page_team():
    st.title("Discover Our Team")
    st.write(""" 
**As a team of passionate individuals**, we embarked on a journey to create a user-friendly and efficient application to predict diseases, such as **Predictive Modeling for Heart Failure**.
""")

    col1, col2, col3 = st.columns(3)

    with col1:
        st.image("https://github.com/abhisek2004.png")
        st.subheader("ABHISEK PANDA (Lead)")
        st.subheader("Front End Developer")
        st.markdown(
            """- **`Github`**: https://github.com/abhisek2004  
- **`Portfolio`**: https://abhisekpanda.vercel.app/"""
        )

    with col2:
        st.image("https://media.licdn.com/dms/image/v2/D4D03AQFeBeDFqdnmFw/profile-displayphoto-scale_200_200/B4DZf1jkQVHMAc-/0/1752171437624?e=1776902400&v=beta&t=upEcRF4Nqw8ljbrS4v2-sL2DmewMkYYgiqy_3zux7vw")
        st.subheader("Debabrata Mishra (Member 1)")
        st.subheader("Data analytics")
        st.markdown("""- **`Github`**: https://github.com/debaraja-394""")

    with col3:
        st.image("https://media.licdn.com/dms/image/v2/D5603AQEB5MffPph1Uw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1715881326469?e=1776902400&v=beta&t=HXBGvBZsDKI8bMzJbgE8tI5zUJApK3iTVnrhWQ5TIrg")
        st.subheader("Diptesh Narendra (Member 2)")
        st.subheader("Data Science")
        st.markdown(
            """- **`Github`**: https://github.com/DipteshNarendra """
        )

    st.markdown(
        """
<div style="border: 2px solid #4CAF50; padding: 15px; border-radius: 5px; background-color: #ADD8E6; color: #333;">
    <h2 style="color: #4CAF50;">Thank you for choosing our Predictive Modeling for Heart Failure!</h2>
    <p>We are dedicated to providing a powerful tool that enhances understanding and awareness of heart health. Our predictive model leverages diverse data and insights to help individuals assess their risk of heart failure effectively.</p>
    <p>We hope this resource proves invaluable to you and others in promoting a healthier future.</p>
</div>
""",
        unsafe_allow_html=True,
    )


def main():
    """
    Streamlit entrypoint.
    Sets up global resources and renders a multi-page UI via sidebar navigation.
    """
    st.set_page_config(page_title="Internship Scheme", layout="wide")
    _ensure_nltk_resources()
    _inject_css()

    st.sidebar.title("Navigation")
    page = st.sidebar.radio(
        "Go to",
        [
            "Main Page",
            "Dataset",
            "Analysis",
            "Our Model Prediction",
            "About",
            "Feedback",
            "Team",
        ],
    )

    if page == "Main Page":
        page_main()
    elif page == "Dataset":
        page_dataset()
    elif page == "Analysis":
        page_analysis()
    elif page == "Our Model Prediction":
        page_model_prediction()
    elif page == "About":
        page_about()
    elif page == "Feedback":
        page_feedback()
    elif page == "Team":
        page_team()


def download_csv(df):
    st.markdown("**Download the internship postings as CSV File**")
    filename_csv = "internship_posting.csv"
    filename_excel = "internship_posting.xlsx"
    # Create a BytesIO buffer for storing the CSV data
    csv_buffer = BytesIO()

    # Export the DataFrame to CSV and save it to the BytesIO buffer
    df.to_csv(csv_buffer, index=False)

    # Create download buttons for CSV and Excel files
    csv_button = st.download_button(
        label="Download CSV",
        data=csv_buffer.getvalue(),
        file_name=filename_csv,
        mime="text/csv",
    )
    excel_button = False
    try:
        import openpyxl  # noqa: F401

        excel_buffer = BytesIO()
        df.to_excel(excel_buffer, index=False)
        excel_button = st.download_button(
            label="Download Excel",
            data=excel_buffer.getvalue(),
            file_name=filename_excel,
            mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
    except Exception:
        st.caption("Excel download requires `openpyxl` to be installed.")

    if csv_button or excel_button:
        st.success(
            f"Data exported to {filename_csv if csv_button else filename_excel}")


def display_features_slider(resume, job_df):

    selected_features = st.slider(
        f"Select keywords extracted from your resume:", min_value=1, max_value=100, value=5)
    top_features = get_top_features(resume, job_df)
    st.markdown(f"**Selected {selected_features} keywords:**")
    data = pd.DataFrame({"Top Keywords": top_features[:selected_features]})
    # Display the DataFrame with a maximum of 10 rows
    st.table(data)


def get_top_features(resume_text, job_df):

    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(job_df['data'])

    # Calculate the TF-IDF vector for the input word
    resume_text_vector = tfidf_vectorizer.transform([resume_text])

    # Get feature names from the TF-IDF vectorizer
    feature_names = np.array(tfidf_vectorizer.get_feature_names_out())

    # Get the indices of features sorted by TF-IDF scores
    feature_indices = np.argsort(resume_text_vector.toarray()[0])[::-1]

    # Extract the top N features (keywords and skills)
    top_features = feature_names[feature_indices]

    return top_features


def get_job_df():
    """
    Pre-processes the job database

    Returns:
    job_df: DataFrame after pre-processing
    """

    job_data_list = return_data_list()
    job_df = pd.DataFrame(job_data_list, columns=[
                          'Company', 'Role', 'Location', 'Application/Link', 'Date Posted'])
    job_df = pre_process_data_job(job_df)
    return job_df


def post_process_table(uploaded_file, job_df):
    """
    Post-processes the job recommendations table after uploading a resume.

    Parameters:
    uploaded_file (str): The uploaded resume file.

    Returns:
    str: HTML-formatted table of job recommendations.
    """

    df_resume = return_table_job(str(uploaded_file), job_df)
    df_resume_sorted = df_resume.head(NUM_POSTING).sort_index(ascending=True)
    df_resume_sorted['Application/Link'] = df_resume_sorted['Application/Link'].apply(
        make_clickable)

    df_resume_sorted = df_resume_sorted.reset_index(drop=True).iloc[:, 0:-1]
    df_resume_sorted.index = df_resume_sorted.index + 1
    return df_resume_sorted


def make_clickable(link):
    """
    Create a clickable HTML link.

    Parameters:
    str: link - The URL for the hyperlink.

    Returns:
    str: An HTML-formatted string containing a clickable link.
    """
    text = "Apply Link"
    return f'<a href="{link}">{text}</a>'


def read_pdf(pdf_file):
    """
    Read text content from a PDF file.

    Parameters:
    str: pdf_file - The path to the PDF file.

    Returns:
    str: Text content extracted from the PDF file.
    """
    # Get pdf file
    # Return text of the resume
    reader = PdfReader(pdf_file)
    # number_of_pages = len(reader.pages)
    page = reader.pages[0]
    resume = page.extract_text()
    return resume


def read_uploaded_resume(uploaded_file):
    name = (uploaded_file.name or "").lower()
    if name.endswith(".pdf"):
        return read_pdf(uploaded_file)
    if name.endswith(".txt"):
        return uploaded_file.getvalue().decode("utf-8", errors="ignore")
    if name.endswith(".docx"):
        try:
            import docx  # python-docx
        except Exception as e:
            raise RuntimeError(
                "Reading DOCX requires `python-docx` (pip install python-docx)."
            ) from e
        doc = docx.Document(BytesIO(uploaded_file.getvalue()))
        return "\n".join(p.text for p in doc.paragraphs)
    raise ValueError("Unsupported file type. Please upload PDF, TXT, or DOCX.")


def return_data_list():
    """
    Extract job data from an HTML file containing a table.

    Reads the content of the HTML file, parses it with BeautifulSoup,
    and extracts job data from the table.

    Returns:
    list: A list of lists containing job data, where each inner list
          represents a row in the table with job information.
    """
    job_data_list = []

    # Read the content of the HTML file
    with open('WebCrawler/table.html', 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Parse the HTML content with BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the table element (adjust 'table' if you have a different tag)
    table = soup.find('table')

    # Find all <tr> elements within the <tbody>
    tr_elements = table.find_all('tr')

    # Iterate through the <tr> elements and extract the second <td>
    for i in range(len(tr_elements)):
        tr = tr_elements[i]
        td_ele = tr.find_all('td')
        td_list = [td.text.strip() if td.text.strip() else td.find(
            'a').get('href') for td in td_ele]
        job_data_list.append(td_list)

    return job_data_list


def keep_alpha_char(text):
    """
    Remove non-alphabetic characters from the input text, keeping only alphabetical characters.

    Parameters:
    - text (str): The input text containing alphanumeric and non-alphanumeric characters.

    Returns:
    str: A cleaned string containing only alphabetical characters.
    """
    alpha_only_string = re.sub(r'[^a-zA-Z]', ' ', text)
    cleaned_string = re.sub(r'\s+', ' ', alpha_only_string)
    return cleaned_string


def nltk_pos_tagger(nltk_tag):
    """
    Map NLTK POS tags to WordNet POS tags.

    Parameters:
    - nltk_tag (str): The POS tag assigned by NLTK.

    Returns:
    int or None: WordNet POS tag corresponding to the input NLTK POS tag, or None if not recognized.
    """
    if nltk_tag.startswith('J'):
        return wordnet.ADJ
    elif nltk_tag.startswith('V'):
        return wordnet.VERB
    elif nltk_tag.startswith('N'):
        return wordnet.NOUN
    elif nltk_tag.startswith('R'):
        return wordnet.ADV
    else:
        return None


def lemmatize_sentence(sentence):
    """
    Lemmatize the words in the input sentence.

    Parameters:
    - sentence (str): The input sentence to be lemmatized.

    Returns:
    str: The lemmatized sentence.
    """
    lemmatizer = WordNetLemmatizer()

    # Part-of-speech tagging using NLTK
    nltk_tagged = nltk.pos_tag(nltk.word_tokenize(sentence))

    # Map NLTK POS tags to WordNet POS tags
    wordnet_tagged = map(lambda x: (x[0], nltk_pos_tagger(x[1])), nltk_tagged)

    lemmatized_sentence = []

    # Lemmatize each word based on its POS tag
    for word, tag in wordnet_tagged:
        if tag is not None:
            lemmatized_sentence.append(lemmatizer.lemmatize(word, tag))

    # Join the lemmatized words back into a sentence
    return " ".join(lemmatized_sentence)


def remove_stop_words(text):
    """
    Remove English stop words from the input text.

    Parameters:
    - text (str): The input text from which stop words will be removed.

    Returns:
    str: The input text with English stop words removed.
    """
    # Tokenize the text
    words = nltk.word_tokenize(str(text))

    # Get the list of English stop words
    stop_words = set(stopwords.words('english'))

    # Remove stop words from the list of words
    filtered_words = [word for word in words if word.lower() not in stop_words]

    # Join the filtered words back into a text
    filtered_text = ' '.join(filtered_words)

    return filtered_text


def recommend_job(resume_text, tfidf_matrix, tfidf_vectorizer, df):
    """
    Recommends jobs based on an input word using TF-IDF and cosine similarity.

    Parameters:
    - resume_text (str): The input word or text for which job recommendations are sought.
    - tfidf_matrix (scipy.sparse.csr_matrix): The TF-IDF matrix representing job descriptions.
    - tfidf_vectorizer (TfidfVectorizer): The TF-IDF vectorizer used for vectorizing input words.
    - df (pd.DataFrame): The DataFrame containing job information.

    Returns:
    pd.DataFrame: A table of recommended jobs sorted by similarity to the input word.
    """
    # Calculate the TF-IDF vector for the input word
    resume_text_vector = tfidf_vectorizer.transform([resume_text])

    # Calculate cosine similarities between the input word vector and job vectors
    cosine_similarities = cosine_similarity(resume_text_vector, tfidf_matrix)

    # Get indices of jobs sorted by similarity (highest to lowest)
    job_indices = cosine_similarities.argsort()[0][::-1]

    # Extract the jobs corresponding to the top recommendations
    top_recommendations_full = [df.iloc[index] for index in job_indices]

    return pd.DataFrame(top_recommendations_full)


def pre_process_resume(resume_text):
    """
    Preprocesses a resume text by removing stop words, lemmatizing, and keeping only alphabet characters.

    Parameters:
    - resume_text (str): The text content of the resume.

    Returns:
    str: The preprocessed resume text.
    """
    # Remove non-alphabetic characters and keep only alphabet characters
    resume_text = keep_alpha_char(resume_text)

    # Lemmatize the words in the resume text
    resume_text = lemmatize_sentence(resume_text)

    # Remove stop words from the resume text
    resume_text = remove_stop_words(resume_text)

    # Convert the resume text to lowercase
    resume_text = resume_text.lower()

    return resume_text


def pre_process_data_job(job_df):
    """
    Preprocess the job_df database by removing stop words, returning the words to their base form,
    and keeping only alphabet characters.

    Parameters:
    - job_df (pd.DataFrame): The job database containing job descriptions.
      job_df["Role"] is the column that contains the title and the role of the internship.

    Returns:
    pd.DataFrame: A table of recommended jobs that has the pre-processed data for the column "Role".
    """
    # Drop rows with missing values in the "Role" column
    job_df.dropna(subset=['Role'], inplace=True)

    # Apply preprocessing steps directly to the original DataFrame
    job_df['data'] = job_df['Role'].apply(keep_alpha_char)
    job_df['data'] = job_df['data'].apply(lemmatize_sentence)
    job_df['data'] = job_df['data'].apply(remove_stop_words)
    job_df['data'] = job_df['data'].str.lower()

    # Removing string that has 🔒 (which means no longer active) in application/link
    # job_df["Application/Link"].replace('🔒', pd.NA, inplace=True)
    # job_df.dropna(inplace = True)

    return job_df


def return_table_job(resume_text, job_df):
    """
    Generates a table of recommended jobs based on the provided resume text and a job database.

    Parameters:
    - text (str): The resume text or content of the uploaded resume file.
    - job_df (pd.DataFrame): The job database containing job descriptions.

    Returns:
    pd.DataFrame: A table of recommended jobs sorted by relevance to the provided resume.
    The table includes columns for job titles, locations, dates, and links to job postings.
    """

    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(job_df['data'])

    # Recommend jobs using cosine similarity
    recommended_jobs = recommend_job(
        resume_text, tfidf_matrix, tfidf_vectorizer, job_df)

    # Drop the first column, which is the similarity score
    recommended_jobs = recommended_jobs.drop(
        columns=recommended_jobs.columns[0])

    return recommended_jobs


if __name__ == "__main__":
    main()

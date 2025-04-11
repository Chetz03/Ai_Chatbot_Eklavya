import streamlit as st
import json
import random
from groq import Groq

# API Setup
API_KEY = "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"
client = Groq(api_key=API_KEY)

# List of topics
TOPICS = [
    "Mathematics",
    "Science",
    "History",
    "Programming",
    "English Grammar",
    "Physics",
    "Chemistry",
    "Biology"
]

def get_response_from_groq(chat_history):
    """
    Query the Groq API and return the chatbot's response. 
    """
    try:
        completion = client.chat.completions.create(
            model="deepseek-r1-distill-llama-70b",
            messages=chat_history,
            temperature=1.0,
            max_tokens=1024,
            top_p=1.0,
            stream=False,
            stop=None,
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Error querying the API: {e}"

def extract_json_from_response(response_content):
    try:
        json_start = response_content.find("[")
        json_end = response_content.rfind("]") + 1
        if json_start == -1 or json_end == -1:
            raise ValueError("JSON block not found in the response.")
        json_data = response_content[json_start:json_end]
        return json.loads(json_data)
    except json.JSONDecodeError as e:
        raise ValueError(f"Error parsing JSON: {e}\nExtracted data: {response_content[json_start:json_end]}")

def generate_mcqs_with_groq(question, num_questions=5):
    prompt = f"""
    Generate {num_questions} multiple-choice questions based on the following question: "{question}". 
    Each question should include:
    - A question string.
    - Four options in a list.
    - A string indicating the correct answer.
    Provide the output in valid JSON format as:
    [
        {{
            "question": "Sample question?",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "correct_option": "Option 1"
        }},
        ...
    ]
    """
    try:
        completion = client.chat.completions.create(
            model="deepseek-r1-distill-llama-70b",
            messages=[
                {"role": "system", "content": "You are an expert at creating MCQs."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1024,
        )
        response_content = completion.choices[0].message.content.strip()
        if not response_content:
            raise ValueError("API returned an empty response.")
        return extract_json_from_response(response_content)
    except Exception as e:
        raise ValueError(f"Unexpected error: {e}")

def main():
    st.set_page_config(page_title="Tutoring Chatbot", page_icon="🎓", layout="wide")
    st.title("📚 Tutoring Chatbot")
    st.write("Select a topic, ask a question, and generate MCQs based on it!")
    
    topic = st.selectbox("Choose a topic:", TOPICS)
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = [{"role": "system", "content": f"You are an educational expert helping users with {topic}."}]
    
    user_input = st.text_input("Ask a question about " + topic, placeholder="Type your question here...")
    
    if st.button("Ask"):
        if user_input.strip():
            st.session_state.chat_history.append({"role": "user", "content": user_input})
            with st.spinner("Thinking..."):
                bot_response = get_response_from_groq(st.session_state.chat_history)
            st.session_state.chat_history.append({"role": "assistant", "content": bot_response})
            st.success(f"**Bot:** {bot_response}")
        else:
            st.warning("Please enter a valid question!")
    
    st.subheader("Generate MCQs from your Question")
    num_questions = st.slider("Number of questions:", min_value=1, max_value=10, value=5)
    
    if st.button("Generate MCQs"):
        if user_input.strip():
            with st.spinner("Generating MCQs..."):
                try:
                    mcqs = generate_mcqs_with_groq(user_input, num_questions)
                    for mcq in mcqs:
                        random.shuffle(mcq['options'])
                    st.session_state['mcqs'] = mcqs
                    st.session_state['answers'] = {}
                    st.success(f"Generated {len(mcqs)} MCQs based on your question!")
                except Exception as e:
                    st.error(f"Error generating MCQs: {str(e)}")
        else:
            st.warning("Please ask a question first before generating MCQs.")
    
    if 'mcqs' in st.session_state:
        st.markdown("## Solve the MCQs")
        for i, mcq in enumerate(st.session_state['mcqs'], 1):
            question_key = f"q{i}"
            st.markdown(f"**Q{i}:** {mcq['question']}")
            st.radio(f"Select your answer for Q{i}:", options=mcq['options'], key=question_key, index=None)
            st.markdown("---")

        if st.button("Submit Answers"):
            st.session_state['answers'] = {
                f"q{i}": st.session_state.get(f"q{i}")
                for i in range(1, len(st.session_state['mcqs']) + 1)
            }
            st.session_state['show_answers'] = True
    
    if st.session_state.get('show_answers'):
        st.markdown("## Correct Answers and Feedback")
        correct_count = 0
        for i, mcq in enumerate(st.session_state['mcqs'], 1):
            user_answer = st.session_state['answers'].get(f"q{i}")
            correct_answer = mcq['correct_option']
            st.markdown(f"**Q{i}:** {mcq['question']}")
            st.write(f"**Your Answer:** {user_answer}")
            st.write(f"**Correct Answer:** {correct_answer}")
            if user_answer == correct_answer:
                st.success("✅ Correct!")
                correct_count += 1
            else:
                st.error("❌ Incorrect.")
            st.markdown("---")
        st.write(f"**You got {correct_count}/{len(st.session_state['mcqs'])} correct!**")

if __name__ == "__main__":
    main()

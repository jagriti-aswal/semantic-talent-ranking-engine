# AI Candidate Discovery & Ranking System

## Problem Statement

Rank the top 100 candidates from a pool of 100,000 profiles for a Senior AI Engineer role.

---

## Approach

The ranking system combines:

1. Experience Fit
2. Career Relevance
3. Behavioral Signals
4. Logistics Constraints
5. Explainable Reasoning

---

## Features Used

### Experience
- Preferred range: 5–9 years

### Career Relevance
- Retrieval
- Ranking
- Recommendation Systems
- Embeddings
- Vector Search
- A/B Testing
- Production ML

### Behavioral Signals
- Open to work
- Recruiter response rate
- Interview completion rate
- GitHub activity

### Logistics
- Notice period
- Relocation willingness

---

## False Positive Handling

Profiles such as:
- Marketing Manager
- HR Manager
- Sales Executive
- Accountant

were down-weighted to avoid keyword-stuffing traps.

---

## Output

Top 100 ranked candidates with:
- Rank
- Score
- Explainable reasoning
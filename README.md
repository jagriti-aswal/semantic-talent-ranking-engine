---
title: Semantic Talent Ranking Engine
emoji: 🚀
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# Semantic Talent Ranking Engine

# AI Candidate Discovery & Ranking System

## Overview

An intelligent candidate-ranking system built for the Redrob AI Candidate Discovery Challenge.

The system ranks the top candidates from a dataset of 100,000 candidate profiles for a Senior AI Engineer role by combining:

- Experience Fit
- Career Relevance
- Behavioral Signals
- Logistics Constraints
- Explainable Reasoning

---

## Problem Statement

Traditional keyword-based candidate matching often surfaces irrelevant profiles.

This project aims to identify candidates who genuinely match the intent of a job description rather than simply containing matching keywords.

---

## Dataset

- 100,000 candidate profiles
- Structured JSONL format
- Career history
- Skills
- Education
- Behavioral signals

---

## Features Used

### Experience Fit
Preferred range:
- 5–9 years

### Career Relevance
Signals extracted from:
- Retrieval Systems
- Ranking Systems
- Recommendation Engines
- Embeddings
- Vector Search
- A/B Testing
- Production ML

### Behavioral Signals
- Open to Work
- Recruiter Response Rate
- Interview Completion Rate
- GitHub Activity

### Logistics
- Notice Period
- Relocation Willingness

---

## False Positive Handling

The system explicitly penalizes profiles such as:

- Marketing Manager
- HR Manager
- Sales Executive
- Accountant
- Customer Support

This helps avoid keyword-stuffing traps.

---

## Explainability

Each ranked candidate receives a human-readable explanation.

Example:

> Strong fit due to retrieval experience, ranking-system exposure, vector-search infrastructure, and preferred experience range.

---

## Pipeline

```text
100K Candidates
        ↓
Feature Extraction
        ↓
Candidate Scoring
        ↓
Ranking
        ↓
Top 100 Selection
        ↓
Explainable Output
```

## Tech Stack

- Python
- Pandas
- JSONL Processing
- Sentence Transformers
- Feature Engineering
- Information Retrieval Concepts

## Results

- Ranked Top 100 candidates from a pool of 100,000 profiles
- Generated explainable candidate recommendations
- Reduced false positives through domain-specific scoring rules
- Produced validated submission files
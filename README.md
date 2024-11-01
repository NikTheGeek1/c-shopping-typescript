# C-Shopping TypeScript Fork

<p align="center">
  <img alt="logo" src="https://www.cheerspublishing.com/uploads/article/3ce26e55-1e14-4e51-aec1-1c18533f953c.png" width="300">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">C-Shopping TypeScript Fork (v1.0.0)</h1>

## Overview

This is a fork of the original [C-Shopping](https://github.com/huanghanzhilian/c-shopping) project created by Ji Xiaopeng. The C-Shopping project is an open-source e-commerce platform based on modern technologies, including Next.js, Tailwind CSS, and Docker. 

This fork focuses on two primary objectives:
1. **Conversion to TypeScript** - to provide better type safety, improved developer experience, and enhanced code maintainability.
2. **Adding a Language Switcher** - the current project has hardcoded Simplified Chinese text (zh_CN), which limits accessibility for non-Chinese speakers. This fork aims to provide a language-switching option for a more global audience.

> **Note:** This is a work in progress. Contributions are highly welcome to help with TypeScript conversion and language support enhancements.

---

## Credit

This fork is based on the original C-Shopping project by Ji Xiaopeng. You can check out the original project [here](https://github.com/huanghanzhilian/c-shopping). This fork builds upon Ji's foundational work by addressing a few limitations in the original version.

---

## Limitations in the Original Project

### 1. Lack of Type Safety
The original codebase is written in JavaScript. While this is flexible, it lacks static type checking, which can lead to runtime errors and makes it harder to maintain and scale the project as it grows.

### 2. Hardcoded Language (Simplified Chinese)
The original project is only available in Simplified Chinese, making it challenging for international developers and users to navigate the interface. By introducing a language switcher, we aim to make C-Shopping accessible to a global audience, promoting inclusivity and enhancing usability.

---

## Technology Stack

In addition to the technologies in the original project, this fork includes:

- **TypeScript**: For type safety and code quality.
- **i18n (Internationalization)**: To enable language support for a global user base, beginning with English and Simplified Chinese.

---

## Project Goals

The goal of this fork is to provide an e-commerce platform with:
- Type-safe code through TypeScript integration.
- Multilingual support with a language switcher.

---

## How to Contribute

This project is open to contributions! Here are some ways you can help:

1. **Convert Components to TypeScript**: If you are familiar with React and TypeScript, consider helping with the migration of components to TypeScript.
2. **Improve Language Support**: Help add translations or implement the language switcher.
3. **Bug Fixes and Optimizations**: If you notice any bugs or areas for optimization, feel free to contribute.

### Getting Started

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
    npm run dev
    ```

Please refer to the original project’s README for additional setup details, as most configurations will remain the same.
/* ==========================================================================
   TrackMyApplication — Shared Behaviour (js/main.js)
   Mobile nav toggle, application lookup, status rendering, contact validation
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Utility: Safe HTML escaping
     ------------------------------------------------------------------------ */
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function findApplicationByRef(ref) {
    if (!ref || typeof APPLICATIONS_DATA === "undefined") return null;
    const normalizedRef = ref.trim().toUpperCase();
    return (
      APPLICATIONS_DATA.find(
        (item) => item.ref.toUpperCase() === normalizedRef
      ) || null
    );
  }

  /* ------------------------------------------------------------------------
     1. Mobile Navigation Toggle
     ------------------------------------------------------------------------ */
  function initMobileNav() {
    const toggleBtn = document.querySelector(".nav-toggle");
    const nav = document.getElementById("primary-navigation");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", () => {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      const nextState = !isExpanded;
      toggleBtn.setAttribute("aria-expanded", String(nextState));
      nav.classList.toggle("is-open", nextState);
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        toggleBtn.getAttribute("aria-expanded") === "true"
      ) {
        toggleBtn.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggleBtn.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. Home Page: Lookup Form & Demo References (index.html)
     ------------------------------------------------------------------------ */
  function initLookupPage() {
    const form = document.getElementById("lookup-form");
    if (!form) return;

    const refInput = document.getElementById("app-ref");
    const emailInput = document.getElementById("app-email");
    const refError = document.getElementById("app-ref-error");
    const emailError = document.getElementById("app-email-error");
    const formAlert = document.getElementById("lookup-form-alert");
    const fillButtons = document.querySelectorAll("[data-fill-ref]");

    function clearFieldError(inputEl, errorEl) {
      inputEl.setAttribute("aria-invalid", "false");
      errorEl.textContent = "";
      errorEl.hidden = true;
    }

    function setFieldError(inputEl, errorEl, message) {
      inputEl.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
      errorEl.hidden = false;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      clearFieldError(refInput, refError);
      clearFieldError(emailInput, emailError);
      formAlert.hidden = true;
      formAlert.innerHTML = "";

      const rawRef = refInput.value.trim();
      const rawEmail = emailInput.value.trim();

      let firstInvalidInput = null;

      if (!rawRef) {
        setFieldError(
          refInput,
          refError,
          "Enter your application reference (for example, APP-1042)."
        );
        firstInvalidInput = firstInvalidInput || refInput;
      }

      if (!rawEmail) {
        setFieldError(
          emailInput,
          emailError,
          "Enter the email address you used when applying."
        );
        firstInvalidInput = firstInvalidInput || emailInput;
      } else if (!isValidEmail(rawEmail)) {
        setFieldError(
          emailInput,
          emailError,
          "Enter a valid email address Including an '@' symbol (for example, alex.rivera@example.com)."
        );
        firstInvalidInput = firstInvalidInput || emailInput;
      }

      if (firstInvalidInput) {
        firstInvalidInput.focus();
        return;
      }

      const matchedByRef = findApplicationByRef(rawRef);
      const emailMatches =
        matchedByRef &&
        matchedByRef.email.toLowerCase() === rawEmail.toLowerCase();

      if (!matchedByRef || !emailMatches) {
        refInput.setAttribute("aria-invalid", "true");
        emailInput.setAttribute("aria-invalid", "true");

        let specificHint =
          "Check that your reference starts with APP- followed by 4 digits (such as APP-1042) and that your email address is spelled the same way as on your application.";
        if (matchedByRef && !emailMatches) {
          specificHint = `We found reference ${escapeHtml(
            matchedByRef.ref
          )}, but the email address did not match the one on file for that application. Please check the email address you used when applying.`;
        }

        formAlert.hidden = false;
        formAlert.innerHTML = `
          <h2 style="font-size: 1.1rem; margin-bottom: 0.35rem;">We could not find an application matching those details</h2>
          <p style="margin-bottom: 0.5rem;">${specificHint}</p>
          <p style="margin-bottom: 0;">You can also pick one of the demo applications below to test the tracker, or <a href="contact.html">contact the hiring team</a> if you need help.</p>
        `;
        refInput.focus();
        return;
      }

      // Navigate to status.html?ref=APP-XXXX (keepingfields intact if user goes back)
      window.location.href = `status.html?ref=${encodeURIComponent(
        matchedByRef.ref
      )}`;
    });

    // Demo reference quick-fill buttons
    fillButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const demoRef = btn.getAttribute("data-fill-ref") || "";
        const demoEmail = btn.getAttribute("data-fill-email") || "";
        refInput.value = demoRef;
        emailInput.value = demoEmail;
        clearFieldError(refInput, refError);
        clearFieldError(emailInput, emailError);
        formAlert.hidden = true;
        refInput.focus();
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Status Page: Render Application Stage & Next Step (status.html)
     ------------------------------------------------------------------------ */
  function initStatusPage() {
    const container = document.getElementById("status-page-container");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const refParam = params.get("ref");
    const app = findApplicationByRef(refParam);

    if (!refParam || !app) {
      const searchedText = refParam
        ? `We could not find an application with reference <strong>${escapeHtml(
            refParam.trim().toUpperCase()
          )}</strong>.`
        : "No application reference was provided in the page address.";

      container.innerHTML = `
        <div class="alert-box alert-warning" role="region" aria-labelledby="missing-ref-heading">
          <h2 id="missing-ref-heading">Application reference not found</h2>
          <p>${searchedText}</p>
          <p>Please check your reference code on the lookup page, or select one of our demo references below.</p>
          <p style="margin-top: 1rem;">
            <a href="index.html" class="btn btn-primary">Go to application lookup</a>
          </p>
        </div>

        <section class="panel-subtle" aria-labelledby="quick-demo-heading">
          <h2 id="quick-demo-heading">Try a demo application</h2>
          <p>Choose any sample candidate below to see how different stages look:</p>
          <ul class="demo-list">
            <li><a href="status.html?ref=APP-1015"><strong>APP-1015</strong> — Received (no action needed)</a></li>
            <li><a href="status.html?ref=APP-1029"><strong>APP-1029</strong> — Under review (no action needed)</a></li>
            <li><a href="status.html?ref=APP-1042"><strong>APP-1042</strong> — Interview (action needed by deadline)</a></li>
            <li><a href="status.html?ref=APP-1064"><strong>APP-1064</strong> — Decision (panel reviewing)</a></li>
            <li><a href="status.html?ref=APP-1088"><strong>APP-1088</strong> — Outcome (application closed)</a></li>
          </ul>
        </section>
      `;
      return;
    }

    // Update page title with the reference
    document.title = `Status for ${app.ref} (${app.jobTitle}) | TrackMyApplication`;

    const currentStageIndex = APPLICATION_STAGES.indexOf(app.currentStage);

    // Build ordered list (<ol>) of 5 stages with text + icon (not colour alone)
    const stageItemsHtml = APPLICATION_STAGES.map((stageName, index) => {
      let stateClass = "is-upcoming";
      let iconSymbol = "○";
      let statusText = "Upcoming";
      let ariaCurrentAttr = "";

      if (index < currentStageIndex) {
        stateClass = "is-done";
        iconSymbol = "✓";
        statusText = "Done";
      } else if (index === currentStageIndex) {
        stateClass = "is-current";
        iconSymbol = "●";
        statusText = "Current stage";
        ariaCurrentAttr = ' aria-current="step"';
      }

      return `
        <li class="stage-step ${stateClass}"${ariaCurrentAttr}>
          <div class="stage-step-left">
            <span class="stage-icon" aria-hidden="true">${iconSymbol}</span>
            <span class="stage-name">${index + 1}. ${escapeHtml(stageName)}</span>
          </div>
          <span class="stage-status-pill">
            <span aria-hidden="true">${iconSymbol} </span>${statusText}
          </span>
        </li>
      `;
    }).join("");

    // Build "What happens next" answers
    const needsAction = Boolean(app.actionRequired);
    const panelClass = needsAction
      ? "next-step-panel needs-action"
      : "next-step-panel";

    const doINeedToDoAnythingHtml = needsAction
      ? `<span class="action-badge action-badge-yes">Yes</span> Action is needed from you.`
      : `<span class="action-badge action-badge-no">No</span> You do not need to do anything right now.`;

    const timingLabel = needsAction
      ? "What you need to do and by when:"
      : "What the hiring team is doing and when you will hear back:";

    const timingDateLine = needsAction
      ? `<p style="margin-top: 0.5rem;"><strong>Deadline for your reply:</strong> ${escapeHtml(
          app.deadline || app.expectedBy
        )}</p>`
      : `<p style="margin-top: 0.5rem;"><strong>When you can expect to hear back:</strong> By ${escapeHtml(
          app.expectedBy
        )}</p>`;

    // Build activity history items
    const historyHtml = app.history
      .map(
        (entry) => `
        <li class="history-item">
          <span class="history-date">${escapeHtml(entry.date)}</span>
          <span class="history-event">${escapeHtml(entry.event)}</span>
        </li>
      `
      )
      .join("");

    container.innerHTML = `
      <!-- Application Received Confirmation -->
      <div class="received-banner" role="status">
        <span class="received-banner-icon" aria-hidden="true">✓</span>
        <div>
          <strong>Application received:</strong> We received your application on <strong>${escapeHtml(
            app.receivedDate
          )}</strong> and sent a confirmation to <strong>${escapeHtml(
      app.email
    )}</strong>.
        </div>
      </div>

      <!-- Summary Card -->
      <section class="card" aria-labelledby="summary-heading">
        <h2 id="summary-heading">${escapeHtml(app.jobTitle)}</h2>
        <p style="margin-bottom: 0;">Candidate: <strong>${escapeHtml(
          app.candidateName
        )}</strong></p>

        <dl class="summary-grid">
          <div class="summary-item">
            <dt>Company</dt>
            <dd>${escapeHtml(app.company)}</dd>
          </div>
          <div class="summary-item">
            <dt>Application reference</dt>
            <dd><span class="demo-code">${escapeHtml(app.ref)}</span></dd>
          </div>
          <div class="summary-item">
            <dt>Date applied</dt>
            <dd>${escapeHtml(app.appliedDate)}</dd>
          </div>
          <div class="summary-item">
            <dt>Last updated</dt>
            <dd>${escapeHtml(app.lastUpdated)}</dd>
          </div>
        </dl>
      </section>

      <!-- Prominent "What happens next" Panel -->
      <section class="${panelClass}" aria-labelledby="next-step-heading">
        <h2 id="next-step-heading">What happens next</h2>
        <dl class="next-qa-list">
          <div class="next-qa-item">
            <dt>Do I need to do anything?</dt>
            <dd>${doINeedToDoAnythingHtml}</dd>
          </div>
          <div class="next-qa-item">
            <dt>${timingLabel}</dt>
            <dd>
              <p style="margin-bottom: 0;">${escapeHtml(app.nextStep)}</p>
              ${timingDateLine}
            </dd>
          </div>
        </dl>
      </section>

      <!-- 5-Stage Progress Tracker (<ol>) -->
      <section class="card" aria-labelledby="tracker-heading">
        <h2 id="tracker-heading">Application stage</h2>
        <p>Current stage: <strong>${escapeHtml(
          app.currentStage
        )}</strong> (Stage ${currentStageIndex + 1} of ${
      APPLICATION_STAGES.length
    })</p>

        <ol class="stage-tracker" aria-label="Application progress stages">
          ${stageItemsHtml}
        </ol>

        <p style="margin-top: 1rem; font-size: 0.95rem;">
          Not sure what a stage means? <a href="help.html">Read our plain-language guide to each stage</a>.
        </p>
      </section>

      <!-- Activity History -->
      <section class="card" aria-labelledby="history-heading">
        <h2 id="history-heading">Activity history</h2>
        <p>Last updated on <strong>${escapeHtml(app.lastUpdated)}</strong></p>
        <ol class="history-list" aria-label="Timeline of updates">
          ${historyHtml}
        </ol>
      </section>

      <!-- Helpful Links Footer Panel -->
      <section class="panel-subtle" aria-labelledby="questions-heading">
        <h2 id="questions-heading">Need more information?</h2>
        <p>
          Learn <a href="help.html">what each stage means and how long it takes</a>, or <a href="contact.html?ref=${encodeURIComponent(
      app.ref
    )}">contact the hiring team</a> if your details have changed or you have a question.
        </p>
        <p style="margin-top: 0.75rem;">
          <a href="index.html" class="btn btn-secondary">Check another application</a>
        </p>
      </section>
    `;
  }

  /* ------------------------------------------------------------------------
     4. Contact Page: Client-Side Validation & Confirmation Focus (contact.html)
     ------------------------------------------------------------------------ */
  function initContactPage() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const refInput = document.getElementById("contact-ref");
    const messageInput = document.getElementById("contact-message");

    const nameError = document.getElementById("contact-name-error");
    const emailError = document.getElementById("contact-email-error");
    const refError = document.getElementById("contact-ref-error");
    const messageError = document.getElementById("contact-message-error");

    const confirmationBox = document.getElementById("contact-confirmation");

    // Pre-fill reference if ?ref= is in URL
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get("ref");
    if (refParam && refInput && !refInput.value) {
      refInput.value = refParam.trim().toUpperCase();
    }

    function clearError(inputEl, errorEl) {
      inputEl.setAttribute("aria-invalid", "false");
      errorEl.textContent = "";
      errorEl.hidden = true;
    }

    function showError(inputEl, errorEl, message) {
      inputEl.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
      errorEl.hidden = false;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      clearError(nameInput, nameError);
      clearError(emailInput, emailError);
      clearError(refInput, refError);
      clearError(messageInput, messageError);

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const refVal = refInput.value.trim().toUpperCase();
      const messageVal = messageInput.value.trim();

      let firstInvalid = null;

      if (!nameVal) {
        showError(nameInput, nameError, "Enter your full name.");
        firstInvalid = firstInvalid || nameInput;
      }

      if (!emailVal) {
        showError(
          emailInput,
          emailError,
          "Enter your email address so we can reply to you."
        );
        firstInvalid = firstInvalid || emailInput;
      } else if (!isValidEmail(emailVal)) {
        showError(
          emailInput,
          emailError,
          "Enter a valid email address Including an '@' symbol (for example, name@example.com)."
        );
        firstInvalid = firstInvalid || emailInput;
      }

      if (refVal && !/^APP-\d{4}$/i.test(refVal)) {
        showError(
          refInput,
          refError,
          "Application references start with APP- followed by 4 digits (for example, APP-1042), or leave this blank."
        );
        firstInvalid = firstInvalid || refInput;
      }

      if (!messageVal) {
        showError(
          messageInput,
          messageError,
          "Enter your question or message for the hiring team."
        );
        firstInvalid = firstInvalid || messageInput;
      } else if (messageVal.length < 10) {
        showError(
          messageInput,
          messageError,
          "Please write at least a short sentence (10 characters or more) so we know how to help."
        );
        firstInvalid = firstInvalid || messageInput;
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const refSummary = refVal
        ? ` regarding application <strong>${escapeHtml(refVal)}</strong>`
        : "";

      confirmationBox.hidden = false;
      confirmationBox.innerHTML = `
        <h2 id="confirmation-heading">Message sent to the hiring team</h2>
        <p>Thank you, <strong>${escapeHtml(
          nameVal
        )}</strong>. We have received your message${refSummary}.</p>
        <p>We have sent a copy to <strong>${escapeHtml(
          emailVal
        )}</strong> and a member of our recruitment team will reply within <strong>2 working days</strong>.</p>
      `;

      form.reset();
      // Move focus to the confirmation message as required
      confirmationBox.focus();
    });
  }

  /* ------------------------------------------------------------------------
     Bootstrap on DOMContentLoaded
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initLookupPage();
    initStatusPage();
    initContactPage();
  });
})();

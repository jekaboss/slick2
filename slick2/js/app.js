/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        s = t.dataset.da.trim().split(","),
        i = {};
      (i.element = t),
        (i.parent = t.parentNode),
        (i.destination = document.querySelector(s[0].trim())),
        (i.breakpoint = s[1] ? s[1].trim() : "767"),
        (i.place = s[2] ? s[2].trim() : "last"),
        (i.index = this.indexInParent(i.parent, i.element)),
        this.оbjects.push(i);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, s) {
          return Array.prototype.indexOf.call(s, e) === t;
        }
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const s = this.mediaQueries[t],
        i = String.prototype.split.call(s, ","),
        n = window.matchMedia(i[0]),
        l = i[1],
        o = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === l;
        });
      n.addListener(function () {
        e.mediaHandler(n, o);
      }),
        this.mediaHandler(n, o);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const s = t[e];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const s = t[e];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, s) {
      t.classList.add(this.daClassname),
        "last" === e || e >= s.children.length
          ? s.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? s.children[e].insertAdjacentElement("beforebegin", t)
          : s.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, s) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[s]
          ? e.children[s].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const s = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(s, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  class t {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        nofadeAttribute: "data-nofade",
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this)
        ),
        document.querySelector("form[data-ajax],form[data-dev]") &&
          document.addEventListener(
            "formSent",
            function (e) {
              const t = e.detail.form.dataset.popupMessage;
              t && this.open(t);
            }.bind(this)
          ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${s}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          this.targetOpen.element.hasAttribute(this.options.nofadeAttribute) ||
            document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : o(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          l &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            o(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        i = s.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && d(`[Попапос]: ${e}`);
    }
  }
  let s = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    i = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t);
      }
    },
    n = (e, t = 500) => (e.hidden ? i(e, t) : s(e, t)),
    l = !0,
    o = (e = 500) => {
      document.documentElement.classList.contains("lock") ? a(e) : r(e);
    },
    a = (e = 500) => {
      let t = document.querySelector("body");
      if (l) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (l = !1),
          setTimeout(function () {
            l = !0;
          }, e);
      }
    },
    r = (e = 500) => {
      let t = document.querySelector("body");
      if (l) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (l = !1),
          setTimeout(function () {
            l = !0;
          }, e);
      }
    };
  function d(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function c(e, t) {
    const s = Array.from(e).filter(function (e, s, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (s.length) {
      const e = [];
      s.forEach((s) => {
        const i = {},
          n = s.dataset[t].split(",");
        (i.value = n[0]),
          (i.type = n[1] ? n[1].trim() : "max"),
          (i.item = s),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = (function (e) {
        return e.filter(function (e, t, s) {
          return s.indexOf(e) === t;
        });
      })(i);
      const n = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const s = t.split(","),
              i = s[1],
              l = s[2],
              o = window.matchMedia(s[0]),
              a = e.filter(function (e) {
                if (e.value === i && e.type === l) return !0;
              });
            n.push({ itemsArray: a, matchMedia: o });
          }),
          n
        );
    }
  }
  class h {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        (this.selectClasses = {
          classSelect: "select",
          classSelectBody: "select__body",
          classSelectTitle: "select__title",
          classSelectValue: "select__value",
          classSelectLabel: "select__label",
          classSelectInput: "select__input",
          classSelectText: "select__text",
          classSelectLink: "select__link",
          classSelectOptions: "select__options",
          classSelectOptionsScroll: "select__scroll",
          classSelectOption: "select__option",
          classSelectContent: "select__content",
          classSelectRow: "select__row",
          classSelectData: "select__asset",
          classSelectDisabled: "_select-disabled",
          classSelectTag: "_select-tag",
          classSelectOpen: "_select-open",
          classSelectActive: "_select-active",
          classSelectFocus: "_select-focus",
          classSelectMultiple: "_select-multiple",
          classSelectCheckBox: "_select-checkbox",
          classSelectOptionSelected: "_select-selected",
        }),
        (this._this = this),
        this.config.init)
      ) {
        const e = t
          ? document.querySelectorAll(t)
          : document.querySelectorAll("select");
        e.length
          ? (this.selectsInit(e),
            this.setLogging(`Проснулся, построил селектов: (${e.length})`))
          : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
      }
    }
    getSelectClass(e) {
      return `.${e}`;
    }
    getSelectElement(e, t) {
      return {
        originalSelect: e.querySelector("select"),
        selectElement: e.querySelector(this.getSelectClass(t)),
      };
    }
    selectsInit(e) {
      e.forEach((e, t) => {
        this.selectInit(e, t + 1);
      }),
        document.addEventListener(
          "click",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "keydown",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "focusin",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "focusout",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        );
    }
    selectInit(e, t) {
      const s = this;
      let i = document.createElement("div");
      if (
        (i.classList.add(this.selectClasses.classSelect),
        e.parentNode.insertBefore(i, e),
        i.appendChild(e),
        (e.hidden = !0),
        t && (e.dataset.id = t),
        i.insertAdjacentHTML(
          "beforeend",
          `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
        ),
        this.selectBuild(e),
        this.getSelectPlaceholder(e) &&
          ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
          this.getSelectPlaceholder(e).label.show))
      ) {
        this.getSelectElement(
          i,
          this.selectClasses.classSelectTitle
        ).selectElement.insertAdjacentHTML(
          "afterbegin",
          `<span class="${this.selectClasses.classSelectLabel}">${
            this.getSelectPlaceholder(e).label.text
              ? this.getSelectPlaceholder(e).label.text
              : this.getSelectPlaceholder(e).value
          }</span>`
        );
      }
      (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
        e.addEventListener("change", function (e) {
          s.selectChange(e);
        });
    }
    selectBuild(e) {
      const t = e.parentElement;
      (t.dataset.id = e.dataset.id),
        t.classList.add(
          e.getAttribute("class") ? `select_${e.getAttribute("class")}` : ""
        ),
        e.multiple
          ? t.classList.add(this.selectClasses.classSelectMultiple)
          : t.classList.remove(this.selectClasses.classSelectMultiple),
        e.hasAttribute("data-checkbox") && e.multiple
          ? t.classList.add(this.selectClasses.classSelectCheckBox)
          : t.classList.remove(this.selectClasses.classSelectCheckBox),
        this.setSelectTitleValue(t, e),
        this.setOptions(t, e),
        e.hasAttribute("data-search") && this.searchActions(t),
        e.hasAttribute("data-open") && this.selectAction(t),
        this.selectDisabled(t, e);
    }
    selectsActions(e) {
      const t = e.target,
        s = e.type;
      if (
        t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
        t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
      ) {
        const i = t.closest(".select")
            ? t.closest(".select")
            : document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag)
                  ).dataset.selectId
                }"]`
              ),
          n = this.getSelectElement(i).originalSelect;
        if ("click" === s) {
          if (!n.disabled)
            if (
              t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
            ) {
              const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag)
                ),
                s = document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`
                );
              this.optionAction(i, n, s);
            } else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectTitle)
              )
            )
              this.selectAction(i);
            else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              )
            ) {
              const e = t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              );
              this.optionAction(i, n, e);
            }
        } else
          "focusin" === s || "focusout" === s
            ? t.closest(this.getSelectClass(this.selectClasses.classSelect)) &&
              ("focusin" === s
                ? i.classList.add(this.selectClasses.classSelectFocus)
                : i.classList.remove(this.selectClasses.classSelectFocus))
            : "keydown" === s && "Escape" === e.code && this.selectsСlose();
      } else this.selectsСlose();
    }
    selectsСlose() {
      const e = document.querySelectorAll(
        `${this.getSelectClass(
          this.selectClasses.classSelect
        )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`
      );
      e.length &&
        e.forEach((e) => {
          this.selectAction(e);
        });
    }
    selectAction(e) {
      const t = this.getSelectElement(e).originalSelect,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement;
      s.classList.contains("_slide") ||
        (e.classList.toggle(this.selectClasses.classSelectOpen),
        n(s, t.dataset.speed));
    }
    setSelectTitleValue(e, t) {
      const s = this.getSelectElement(
          e,
          this.selectClasses.classSelectBody
        ).selectElement,
        i = this.getSelectElement(
          e,
          this.selectClasses.classSelectTitle
        ).selectElement;
      i && i.remove(),
        s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
    }
    getSelectTitleValue(e, t) {
      let s = this.getSelectedOptionsData(t, 2).html;
      if (
        (t.multiple &&
          t.hasAttribute("data-tags") &&
          ((s = this.getSelectedOptionsData(t)
            .elements.map(
              (t) =>
                `<span role="button" data-select-id="${
                  e.dataset.id
                }" data-value="${
                  t.value
                }" class="_select-tag">${this.getSelectElementContent(
                  t
                )}</span>`
            )
            .join("")),
          t.dataset.tags &&
            document.querySelector(t.dataset.tags) &&
            ((document.querySelector(t.dataset.tags).innerHTML = s),
            t.hasAttribute("data-search") && (s = !1))),
        (s = s.length ? s : t.dataset.placeholder),
        this.getSelectedOptionsData(t).values.length
          ? e.classList.add(this.selectClasses.classSelectActive)
          : e.classList.remove(this.selectClasses.classSelectActive),
        t.hasAttribute("data-search"))
      )
        return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      {
        const e =
          this.getSelectedOptionsData(t).elements.length &&
          this.getSelectedOptionsData(t).elements[0].dataset.class
            ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
            : "";
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
      }
    }
    getSelectElementContent(e) {
      const t = e.dataset.asset ? `${e.dataset.asset}` : "",
        s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
      let i = "";
      return (
        (i += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
        (i += t ? `<span class="${this.selectClasses.classSelectData}">` : ""),
        (i += t ? s : ""),
        (i += t ? "</span>" : ""),
        (i += t ? `<span class="${this.selectClasses.classSelectText}">` : ""),
        (i += e.textContent),
        (i += t ? "</span>" : ""),
        (i += t ? "</span>" : ""),
        i
      );
    }
    getSelectPlaceholder(e) {
      const t = Array.from(e.options).find((e) => !e.value);
      if (t)
        return {
          value: t.textContent,
          show: t.hasAttribute("data-show"),
          label: { show: t.hasAttribute("data-label"), text: t.dataset.label },
        };
    }
    getSelectedOptionsData(e, t) {
      let s = [];
      return (
        e.multiple
          ? (s = Array.from(e.options)
              .filter((e) => e.value)
              .filter((e) => e.selected))
          : s.push(e.options[e.selectedIndex]),
        {
          elements: s.map((e) => e),
          values: s.filter((e) => e.value).map((e) => e.value),
          html: s.map((e) => this.getSelectElementContent(e)),
        }
      );
    }
    getOptions(e) {
      let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
        s = e.dataset.scroll ? `style="max-height:${e.dataset.scroll}px"` : "",
        i = Array.from(e.options);
      if (i.length > 0) {
        let n = "";
        return (
          ((this.getSelectPlaceholder(e) &&
            !this.getSelectPlaceholder(e).show) ||
            e.multiple) &&
            (i = i.filter((e) => e.value)),
          (n += t
            ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
            : ""),
          i.forEach((t) => {
            n += this.getOption(t, e);
          }),
          (n += t ? "</div>" : ""),
          n
        );
      }
    }
    getOption(e, t) {
      const s =
          e.selected && t.multiple
            ? ` ${this.selectClasses.classSelectOptionSelected}`
            : "",
        i = e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
        n = e.dataset.class ? ` ${e.dataset.class}` : "",
        l = !!e.dataset.href && e.dataset.href,
        o = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
      let a = "";
      return (
        (a += l
          ? `<a ${o} ${i} href="${l}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${n}${s}">`
          : `<button ${i} class="${this.selectClasses.classSelectOption}${n}${s}" data-value="${e.value}" type="button">`),
        (a += this.getSelectElementContent(e)),
        (a += l ? "</a>" : "</button>"),
        a
      );
    }
    setOptions(e, t) {
      this.getSelectElement(
        e,
        this.selectClasses.classSelectOptions
      ).selectElement.innerHTML = this.getOptions(t);
    }
    optionAction(e, t, s) {
      if (t.multiple) {
        s.classList.toggle(this.selectClasses.classSelectOptionSelected);
        this.getSelectedOptionsData(t).elements.forEach((e) => {
          e.removeAttribute("selected");
        });
        e.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected)
        ).forEach((e) => {
          t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
            "selected",
            "selected"
          );
        });
      } else
        t.hasAttribute("data-show-selected") ||
          (e.querySelector(
            `${this.getSelectClass(
              this.selectClasses.classSelectOption
            )}[hidden]`
          ) &&
            (e.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption
              )}[hidden]`
            ).hidden = !1),
          (s.hidden = !0)),
          (t.value = s.hasAttribute("data-value")
            ? s.dataset.value
            : s.textContent),
          this.selectAction(e);
      this.setSelectTitleValue(e, t), this.setSelectChange(t);
    }
    selectChange(e) {
      const t = e.target;
      this.selectBuild(t), this.setSelectChange(t);
    }
    setSelectChange(e) {
      if (
        (e.hasAttribute("data-validate") && p.validateInput(e),
        e.hasAttribute("data-submit") && e.value)
      ) {
        let t = document.createElement("button");
        (t.type = "submit"), e.closest("form").append(t), t.click(), t.remove();
      }
      const t = e.parentElement;
      this.selectCallback(t, e);
    }
    selectDisabled(e, t) {
      t.disabled
        ? (e.classList.add(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement.disabled = !0))
        : (e.classList.remove(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement.disabled = !1));
    }
    searchActions(e) {
      this.getSelectElement(e).originalSelect;
      const t = this.getSelectElement(
          e,
          this.selectClasses.classSelectInput
        ).selectElement,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement,
        i = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
        n = this;
      t.addEventListener("input", function () {
        i.forEach((e) => {
          e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
            ? (e.hidden = !1)
            : (e.hidden = !0);
        }),
          !0 === s.hidden && n.selectAction(e);
      });
    }
    selectCallback(e, t) {
      document.dispatchEvent(
        new CustomEvent("selectCallback", { detail: { select: t } })
      );
    }
    setLogging(e) {
      this.config.logging && d(`[select]: ${e}`);
    }
  }
  const u = { inputMaskModule: null, selectModule: null };
  let p = {
    getErrors(e) {
      let t = 0,
        s = e.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const s = t[e];
            s.parentElement.classList.remove("_form-focus"),
              s.classList.remove("_form-focus"),
              p.removeError(s),
              (s.value = s.dataset.placeholder);
          }
          let s = e.querySelectorAll(".checkbox__input");
          if (s.length > 0)
            for (let e = 0; e < s.length; e++) {
              s[e].checked = !1;
            }
          if (u.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const s = t[e].querySelector("select");
                u.selectModule.selectBuild(s);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function g(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function m(e = {}, t = {}) {
    Object.keys(t).forEach((s) => {
      void 0 === e[s]
        ? (e[s] = t[s])
        : g(t[s]) && g(e[s]) && Object.keys(t[s]).length > 0 && m(e[s], t[s]);
    });
  }
  const f = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function v() {
    const e = "undefined" != typeof document ? document : {};
    return m(e, f), e;
  }
  const b = {
    document: f,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function y() {
    const e = "undefined" != typeof window ? window : {};
    return m(e, b), e;
  }
  class w extends Array {
    constructor(e) {
      "number" == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function S(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...S(e)) : t.push(e);
      }),
      t
    );
  }
  function C(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function T(e, t) {
    const s = y(),
      i = v();
    let n = [];
    if (!t && e instanceof w) return e;
    if (!e) return new w(n);
    if ("string" == typeof e) {
      const s = e.trim();
      if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
        let e = "div";
        0 === s.indexOf("<li") && (e = "ul"),
          0 === s.indexOf("<tr") && (e = "tbody"),
          (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
          0 === s.indexOf("<tbody") && (e = "table"),
          0 === s.indexOf("<option") && (e = "select");
        const t = i.createElement(e);
        t.innerHTML = s;
        for (let e = 0; e < t.childNodes.length; e += 1)
          n.push(t.childNodes[e]);
      } else
        n = (function (e, t) {
          if ("string" != typeof e) return [e];
          const s = [],
            i = t.querySelectorAll(e);
          for (let e = 0; e < i.length; e += 1) s.push(i[e]);
          return s;
        })(e.trim(), t || i);
    } else if (e.nodeType || e === s || e === i) n.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof w) return e;
      n = e;
    }
    return new w(
      (function (e) {
        const t = [];
        for (let s = 0; s < e.length; s += 1)
          -1 === t.indexOf(e[s]) && t.push(e[s]);
        return t;
      })(n)
    );
  }
  T.fn = w.prototype;
  const x = "resize scroll".split(" ");
  function E(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          x.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : T(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  E("click"),
    E("blur"),
    E("focus"),
    E("focusin"),
    E("focusout"),
    E("keyup"),
    E("keydown"),
    E("keypress"),
    E("submit"),
    E("change"),
    E("mousedown"),
    E("mousemove"),
    E("mouseup"),
    E("mouseenter"),
    E("mouseleave"),
    E("mouseout"),
    E("mouseover"),
    E("touchstart"),
    E("touchend"),
    E("touchmove"),
    E("resize"),
    E("scroll");
  const L = {
    addClass: function (...e) {
      const t = S(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = S(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = S(e.map((e) => e.split(" ")));
      return (
        C(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = S(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else
          for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, s, i, n] = e;
      function l(e) {
        const t = e.target;
        if (!t) return;
        const n = e.target.dom7EventData || [];
        if ((n.indexOf(e) < 0 && n.unshift(e), T(t).is(s))) i.apply(t, n);
        else {
          const e = T(t).parents();
          for (let t = 0; t < e.length; t += 1)
            T(e[t]).is(s) && i.apply(e[t], n);
        }
      }
      function o(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
      }
      "function" == typeof e[1] && (([t, i, n] = e), (s = void 0)),
        n || (n = !1);
      const a = t.split(" ");
      let r;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (s)
          for (r = 0; r < a.length; r += 1) {
            const e = a[r];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: i, proxyListener: l }),
              t.addEventListener(e, l, n);
          }
        else
          for (r = 0; r < a.length; r += 1) {
            const e = a[r];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: i, proxyListener: o }),
              t.addEventListener(e, o, n);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, s, i, n] = e;
      "function" == typeof e[1] && (([t, i, n] = e), (s = void 0)),
        n || (n = !1);
      const l = t.split(" ");
      for (let e = 0; e < l.length; e += 1) {
        const t = l[e];
        for (let e = 0; e < this.length; e += 1) {
          const l = this[e];
          let o;
          if (
            (!s && l.dom7Listeners
              ? (o = l.dom7Listeners[t])
              : s && l.dom7LiveListeners && (o = l.dom7LiveListeners[t]),
            o && o.length)
          )
            for (let e = o.length - 1; e >= 0; e -= 1) {
              const s = o[e];
              (i && s.listener === i) ||
              (i &&
                s.listener &&
                s.listener.dom7proxy &&
                s.listener.dom7proxy === i)
                ? (l.removeEventListener(t, s.proxyListener, n), o.splice(e, 1))
                : i ||
                  (l.removeEventListener(t, s.proxyListener, n),
                  o.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = y(),
        s = e[0].split(" "),
        i = e[1];
      for (let n = 0; n < s.length; n += 1) {
        const l = s[n];
        for (let s = 0; s < this.length; s += 1) {
          const n = this[s];
          if (t.CustomEvent) {
            const s = new t.CustomEvent(l, {
              detail: i,
              bubbles: !0,
              cancelable: !0,
            });
            (n.dom7EventData = e.filter((e, t) => t > 0)),
              n.dispatchEvent(s),
              (n.dom7EventData = []),
              delete n.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function s(i) {
            i.target === this && (e.call(this, i), t.off("transitionend", s));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = y();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = y(),
          t = v(),
          s = this[0],
          i = s.getBoundingClientRect(),
          n = t.body,
          l = s.clientTop || n.clientTop || 0,
          o = s.clientLeft || n.clientLeft || 0,
          a = s === e ? e.scrollY : s.scrollTop,
          r = s === e ? e.scrollX : s.scrollLeft;
        return { top: i.top + a - l, left: i.left + r - o };
      }
      return null;
    },
    css: function (e, t) {
      const s = y();
      let i;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (i = 0; i < this.length; i += 1)
            for (const t in e) this[i].style[t] = e[t];
          return this;
        }
        if (this[0])
          return s.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, s) => {
            e.apply(t, [t, s]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = y(),
        s = v(),
        i = this[0];
      let n, l;
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (n = T(e), l = 0; l < n.length; l += 1) if (n[l] === i) return !0;
        return !1;
      }
      if (e === s) return i === s;
      if (e === t) return i === t;
      if (e.nodeType || e instanceof w) {
        for (n = e.nodeType ? [e] : e, l = 0; l < n.length; l += 1)
          if (n[l] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return T([]);
      if (e < 0) {
        const s = t + e;
        return T(s < 0 ? [] : [this[s]]);
      }
      return T([this[e]]);
    },
    append: function (...e) {
      let t;
      const s = v();
      for (let i = 0; i < e.length; i += 1) {
        t = e[i];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const i = s.createElement("div");
            for (i.innerHTML = t; i.firstChild; )
              this[e].appendChild(i.firstChild);
          } else if (t instanceof w)
            for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = v();
      let s, i;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof e) {
          const n = t.createElement("div");
          for (n.innerHTML = e, i = n.childNodes.length - 1; i >= 0; i -= 1)
            this[s].insertBefore(n.childNodes[i], this[s].childNodes[0]);
        } else if (e instanceof w)
          for (i = 0; i < e.length; i += 1)
            this[s].insertBefore(e[i], this[s].childNodes[0]);
        else this[s].insertBefore(e, this[s].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && T(this[0].nextElementSibling).is(e)
            ? T([this[0].nextElementSibling])
            : T([])
          : this[0].nextElementSibling
          ? T([this[0].nextElementSibling])
          : T([])
        : T([]);
    },
    nextAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return T([]);
      for (; s.nextElementSibling; ) {
        const i = s.nextElementSibling;
        e ? T(i).is(e) && t.push(i) : t.push(i), (s = i);
      }
      return T(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && T(t.previousElementSibling).is(e)
            ? T([t.previousElementSibling])
            : T([])
          : t.previousElementSibling
          ? T([t.previousElementSibling])
          : T([]);
      }
      return T([]);
    },
    prevAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return T([]);
      for (; s.previousElementSibling; ) {
        const i = s.previousElementSibling;
        e ? T(i).is(e) && t.push(i) : t.push(i), (s = i);
      }
      return T(t);
    },
    parent: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1)
        null !== this[s].parentNode &&
          (e
            ? T(this[s].parentNode).is(e) && t.push(this[s].parentNode)
            : t.push(this[s].parentNode));
      return T(t);
    },
    parents: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        let i = this[s].parentNode;
        for (; i; ) e ? T(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
      }
      return T(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? T([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const i = this[s].querySelectorAll(e);
        for (let e = 0; e < i.length; e += 1) t.push(i[e]);
      }
      return T(t);
    },
    children: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const i = this[s].children;
        for (let s = 0; s < i.length; s += 1)
          (e && !T(i[s]).is(e)) || t.push(i[s]);
      }
      return T(t);
    },
    filter: function (e) {
      return T(C(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(L).forEach((e) => {
    Object.defineProperty(T.fn, e, { value: L[e], writable: !0 });
  });
  const I = T;
  function O(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function k() {
    return Date.now();
  }
  function _(e, t) {
    void 0 === t && (t = "x");
    const s = y();
    let i, n, l;
    const o = (function (e) {
      const t = y();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((n = o.transform || o.webkitTransform),
          n.split(",").length > 6 &&
            (n = n
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (l = new s.WebKitCSSMatrix("none" === n ? "" : n)))
        : ((l =
            o.MozTransform ||
            o.OTransform ||
            o.MsTransform ||
            o.msTransform ||
            o.transform ||
            o
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = l.toString().split(","))),
      "x" === t &&
        (n = s.WebKitCSSMatrix
          ? l.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (n = s.WebKitCSSMatrix
          ? l.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      n || 0
    );
  }
  function A(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function $(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement
      ? e instanceof HTMLElement
      : e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function M() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
      const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
      if (null != i && !$(i)) {
        const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, n = s.length; t < n; t += 1) {
          const n = s[t],
            l = Object.getOwnPropertyDescriptor(i, n);
          void 0 !== l &&
            l.enumerable &&
            (A(e[n]) && A(i[n])
              ? i[n].__swiper__
                ? (e[n] = i[n])
                : M(e[n], i[n])
              : !A(e[n]) && A(i[n])
              ? ((e[n] = {}), i[n].__swiper__ ? (e[n] = i[n]) : M(e[n], i[n]))
              : (e[n] = i[n]));
        }
      }
    }
    return e;
  }
  function P(e, t, s) {
    e.style.setProperty(t, s);
  }
  function D(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const n = y(),
      l = -t.translate;
    let o,
      a = null;
    const r = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      n.cancelAnimationFrame(t.cssModeFrameID);
    const d = s > l ? "next" : "prev",
      c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
      h = () => {
        (o = new Date().getTime()), null === a && (a = o);
        const e = Math.max(Math.min((o - a) / r, 1), 0),
          d = 0.5 - Math.cos(e * Math.PI) / 2;
        let u = l + d * (s - l);
        if ((c(u, s) && (u = s), t.wrapperEl.scrollTo({ [i]: u }), c(u, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: u });
            }),
            void n.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = n.requestAnimationFrame(h);
      };
    h();
  }
  let B, z, G;
  function V() {
    return (
      B ||
        (B = (function () {
          const e = y(),
            t = v();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const s = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, s);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      B
    );
  }
  function q(e) {
    return (
      void 0 === e && (e = {}),
      z ||
        (z = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = V(),
            i = y(),
            n = i.navigator.platform,
            l = t || i.navigator.userAgent,
            o = { ios: !1, android: !1 },
            a = i.screen.width,
            r = i.screen.height,
            d = l.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = l.match(/(iPad).*OS\s([\d_]+)/);
          const h = l.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !c && l.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            p = "Win32" === n;
          let g = "MacIntel" === n;
          return (
            !c &&
              g &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${a}x${r}`) >= 0 &&
              ((c = l.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (g = !1)),
            d && !p && ((o.os = "android"), (o.android = !0)),
            (c || u || h) && ((o.os = "ios"), (o.ios = !0)),
            o
          );
        })(e)),
      z
    );
  }
  function H() {
    return (
      G ||
        (G = (function () {
          const e = y();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      G
    );
  }
  const F = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const n = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][n](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function n() {
        i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
        for (var s = arguments.length, l = new Array(s), o = 0; o < s; o++)
          l[o] = arguments[o];
        t.apply(i, l);
      }
      return (n.__emitterProxy = t), i.on(e, n, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((i, n) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(n, 1);
                });
          }),
          s)
        : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var n = arguments.length, l = new Array(n), o = 0; o < n; o++)
        l[o] = arguments[o];
      "string" == typeof l[0] || Array.isArray(l[0])
        ? ((t = l[0]), (s = l.slice(1, l.length)), (i = e))
        : ((t = l[0].events), (s = l[0].data), (i = l[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const j = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i[0].clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(i.css("padding-left") || 0, 10) -
            parseInt(i.css("padding-right") || 0, 10)),
          (s =
            s -
            parseInt(i.css("padding-top") || 0, 10) -
            parseInt(i.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const i = e.params,
        { $wrapperEl: n, size: l, rtlTranslate: o, wrongRTL: a } = e,
        r = e.virtual && i.virtual.enabled,
        d = r ? e.virtual.slides.length : e.slides.length,
        c = n.children(`.${e.params.slideClass}`),
        h = r ? e.virtual.slides.length : c.length;
      let u = [];
      const p = [],
        g = [];
      let m = i.slidesOffsetBefore;
      "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
      let f = i.slidesOffsetAfter;
      "function" == typeof f && (f = i.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        b = e.slidesGrid.length;
      let y = i.spaceBetween,
        w = -m,
        S = 0,
        C = 0;
      if (void 0 === l) return;
      "string" == typeof y &&
        y.indexOf("%") >= 0 &&
        (y = (parseFloat(y.replace("%", "")) / 100) * l),
        (e.virtualSize = -y),
        o
          ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        i.centeredSlides &&
          i.cssMode &&
          (P(e.wrapperEl, "--swiper-centered-offset-before", ""),
          P(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const T = i.grid && i.grid.rows > 1 && e.grid;
      let x;
      T && e.grid.initSlides(h);
      const E =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView
        ).length > 0;
      for (let n = 0; n < h; n += 1) {
        x = 0;
        const o = c.eq(n);
        if (
          (T && e.grid.updateSlide(n, o, h, t), "none" !== o.css("display"))
        ) {
          if ("auto" === i.slidesPerView) {
            E && (c[n].style[t("width")] = "");
            const l = getComputedStyle(o[0]),
              a = o[0].style.transform,
              r = o[0].style.webkitTransform;
            if (
              (a && (o[0].style.transform = "none"),
              r && (o[0].style.webkitTransform = "none"),
              i.roundLengths)
            )
              x = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
            else {
              const e = s(l, "width"),
                t = s(l, "padding-left"),
                i = s(l, "padding-right"),
                n = s(l, "margin-left"),
                a = s(l, "margin-right"),
                r = l.getPropertyValue("box-sizing");
              if (r && "border-box" === r) x = e + n + a;
              else {
                const { clientWidth: s, offsetWidth: l } = o[0];
                x = e + t + i + n + a + (l - s);
              }
            }
            a && (o[0].style.transform = a),
              r && (o[0].style.webkitTransform = r),
              i.roundLengths && (x = Math.floor(x));
          } else
            (x = (l - (i.slidesPerView - 1) * y) / i.slidesPerView),
              i.roundLengths && (x = Math.floor(x)),
              c[n] && (c[n].style[t("width")] = `${x}px`);
          c[n] && (c[n].swiperSlideSize = x),
            g.push(x),
            i.centeredSlides
              ? ((w = w + x / 2 + S / 2 + y),
                0 === S && 0 !== n && (w = w - l / 2 - y),
                0 === n && (w = w - l / 2 - y),
                Math.abs(w) < 0.001 && (w = 0),
                i.roundLengths && (w = Math.floor(w)),
                C % i.slidesPerGroup == 0 && u.push(w),
                p.push(w))
              : (i.roundLengths && (w = Math.floor(w)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(w),
                p.push(w),
                (w = w + x + y)),
            (e.virtualSize += x + y),
            (S = x),
            (C += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, l) + f),
        o &&
          a &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          n.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
        i.setWrapperSize &&
          n.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
        T && e.grid.updateWrapperSize(x, u, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < u.length; s += 1) {
          let n = u[s];
          i.roundLengths && (n = Math.floor(n)),
            u[s] <= e.virtualSize - l && t.push(n);
        }
        (u = t),
          Math.floor(e.virtualSize - l) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - l);
      }
      if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
        const s = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({
          [s]: `${y}px`,
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        g.forEach((t) => {
          e += t + (i.spaceBetween ? i.spaceBetween : 0);
        }),
          (e -= i.spaceBetween);
        const t = e - l;
        u = u.map((e) => (e < 0 ? -m : e > t ? t + f : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (g.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
          (e -= i.spaceBetween),
          e < l)
        ) {
          const t = (l - e) / 2;
          u.forEach((e, s) => {
            u[s] = e - t;
          }),
            p.forEach((e, s) => {
              p[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: u,
          slidesGrid: p,
          slidesSizesGrid: g,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        P(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          P(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - g[g.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (h !== d && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        p.length !== b && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset(),
        !(r || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
      ) {
        const t = `${i.containerModifierClass}backface-hidden`,
          s = e.$el.hasClass(t);
        h <= i.maxBackfaceHiddenSlides
          ? s || e.$el.addClass(t)
          : s && e.$el.removeClass(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let n,
        l = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const o = (e) =>
        i
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || I([])).each((e) => {
            s.push(e);
          });
        else
          for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
            const e = t.activeIndex + n;
            if (e > t.slides.length && !i) break;
            s.push(o(e));
          }
      else s.push(o(t.activeIndex));
      for (n = 0; n < s.length; n += 1)
        if (void 0 !== s[n]) {
          const e = s[n].offsetHeight;
          l = e > l ? e : l;
        }
      (l || 0 === l) && t.$wrapperEl.css("height", `${l}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let s = 0; s < t.length; s += 1)
        t[s].swiperSlideOffset = e.isHorizontal()
          ? t[s].offsetLeft
          : t[s].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: n, snapGrid: l } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let o = -e;
      n && (o = e),
        i.removeClass(s.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < i.length; e += 1) {
        const a = i[e];
        let r = a.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (r -= i[0].swiperSlideOffset);
        const d =
            (o + (s.centeredSlides ? t.minTranslate() : 0) - r) /
            (a.swiperSlideSize + s.spaceBetween),
          c =
            (o - l[0] + (s.centeredSlides ? t.minTranslate() : 0) - r) /
            (a.swiperSlideSize + s.spaceBetween),
          h = -(o - r),
          u = h + t.slidesSizesGrid[e];
        ((h >= 0 && h < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (h <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(a),
          t.visibleSlidesIndexes.push(e),
          i.eq(e).addClass(s.slideVisibleClass)),
          (a.progress = n ? -d : d),
          (a.originalProgress = n ? -c : c);
      }
      t.visibleSlides = I(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: n, isBeginning: l, isEnd: o } = t;
      const a = l,
        r = o;
      0 === i
        ? ((n = 0), (l = !0), (o = !0))
        : ((n = (e - t.minTranslate()) / i), (l = n <= 0), (o = n >= 1)),
        Object.assign(t, { progress: n, isBeginning: l, isEnd: o }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        l && !a && t.emit("reachBeginning toEdge"),
        o && !r && t.emit("reachEnd toEdge"),
        ((a && !l) || (r && !o)) && t.emit("fromEdge"),
        t.emit("progress", n);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: s,
          $wrapperEl: i,
          activeIndex: n,
          realIndex: l,
        } = e,
        o = e.virtual && s.virtual.enabled;
      let a;
      t.removeClass(
        `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
      ),
        (a = o
          ? e.$wrapperEl.find(
              `.${s.slideClass}[data-swiper-slide-index="${n}"]`
            )
          : t.eq(n)),
        a.addClass(s.slideActiveClass),
        s.loop &&
          (a.hasClass(s.slideDuplicateClass)
            ? i
                .children(
                  `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${l}"]`
                )
                .addClass(s.slideDuplicateActiveClass)
            : i
                .children(
                  `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${l}"]`
                )
                .addClass(s.slideDuplicateActiveClass));
      let r = a.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
      s.loop && 0 === r.length && ((r = t.eq(0)), r.addClass(s.slideNextClass));
      let d = a.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
      s.loop &&
        0 === d.length &&
        ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
        s.loop &&
          (r.hasClass(s.slideDuplicateClass)
            ? i
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${r.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass)
            : i
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${r.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass),
          d.hasClass(s.slideDuplicateClass)
            ? i
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)
            : i
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: i,
          snapGrid: n,
          params: l,
          activeIndex: o,
          realIndex: a,
          snapIndex: r,
        } = t;
      let d,
        c = e;
      if (void 0 === c) {
        for (let e = 0; e < i.length; e += 1)
          void 0 !== i[e + 1]
            ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2
              ? (c = e)
              : s >= i[e] && s < i[e + 1] && (c = e + 1)
            : s >= i[e] && (c = e);
        l.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
      }
      if (n.indexOf(s) >= 0) d = n.indexOf(s);
      else {
        const e = Math.min(l.slidesPerGroupSkip, c);
        d = e + Math.floor((c - e) / l.slidesPerGroup);
      }
      if ((d >= n.length && (d = n.length - 1), c === o))
        return void (d !== r && ((t.snapIndex = d), t.emit("snapIndexChange")));
      const h = parseInt(
        t.slides.eq(c).attr("data-swiper-slide-index") || c,
        10
      );
      Object.assign(t, {
        snapIndex: d,
        realIndex: h,
        previousIndex: o,
        activeIndex: c,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        a !== h && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        i = I(e).closest(`.${s.slideClass}`)[0];
      let n,
        l = !1;
      if (i)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === i) {
            (l = !0), (n = e);
            break;
          }
      if (!i || !l)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = i),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              I(i).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = n),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const N = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, $wrapperEl: n } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let l = _(n[0], e);
      return s && (l = -l), l || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        {
          rtlTranslate: i,
          params: n,
          $wrapperEl: l,
          wrapperEl: o,
          progress: a,
        } = s;
      let r,
        d = 0,
        c = 0;
      s.isHorizontal() ? (d = i ? -e : e) : (c = e),
        n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
        n.cssMode
          ? (o[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -d
              : -c)
          : n.virtualTranslate ||
            l.transform(`translate3d(${d}px, ${c}px, 0px)`),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? d : c);
      const h = s.maxTranslate() - s.minTranslate();
      (r = 0 === h ? 0 : (e - s.minTranslate()) / h),
        r !== a && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, n) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const l = this,
        { params: o, wrapperEl: a } = l;
      if (l.animating && o.preventInteractionOnTransition) return !1;
      const r = l.minTranslate(),
        d = l.maxTranslate();
      let c;
      if (
        ((c = i && e > r ? r : i && e < d ? d : e),
        l.updateProgress(c),
        o.cssMode)
      ) {
        const e = l.isHorizontal();
        if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!l.support.smoothScroll)
            return (
              D({ swiper: l, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          a.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (l.setTransition(0),
            l.setTranslate(c),
            s &&
              (l.emit("beforeTransitionStart", t, n), l.emit("transitionEnd")))
          : (l.setTransition(t),
            l.setTranslate(c),
            s &&
              (l.emit("beforeTransitionStart", t, n),
              l.emit("transitionStart")),
            l.animating ||
              ((l.animating = !0),
              l.onTranslateToWrapperTransitionEnd ||
                (l.onTranslateToWrapperTransitionEnd = function (e) {
                  l &&
                    !l.destroyed &&
                    e.target === this &&
                    (l.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      l.onTranslateToWrapperTransitionEnd
                    ),
                    l.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      l.onTranslateToWrapperTransitionEnd
                    ),
                    (l.onTranslateToWrapperTransitionEnd = null),
                    delete l.onTranslateToWrapperTransitionEnd,
                    s && l.emit("transitionEnd"));
                }),
              l.$wrapperEl[0].addEventListener(
                "transitionend",
                l.onTranslateToWrapperTransitionEnd
              ),
              l.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                l.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function W(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: n } = e;
    const { activeIndex: l, previousIndex: o } = t;
    let a = i;
    if (
      (a || (a = l > o ? "next" : l < o ? "prev" : "reset"),
      t.emit(`transition${n}`),
      s && l !== o)
    ) {
      if ("reset" === a) return void t.emit(`slideResetTransition${n}`);
      t.emit(`slideChangeTransition${n}`),
        "next" === a
          ? t.emit(`slideNextTransition${n}`)
          : t.emit(`slidePrevTransition${n}`);
    }
  }
  const X = {
    slideTo: function (e, t, s, i, n) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "number" != typeof e && "string" != typeof e)
      )
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const l = this;
      let o = e;
      o < 0 && (o = 0);
      const {
        params: a,
        snapGrid: r,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: h,
        rtlTranslate: u,
        wrapperEl: p,
        enabled: g,
      } = l;
      if ((l.animating && a.preventInteractionOnTransition) || (!g && !i && !n))
        return !1;
      const m = Math.min(l.params.slidesPerGroupSkip, o);
      let f = m + Math.floor((o - m) / l.params.slidesPerGroup);
      f >= r.length && (f = r.length - 1),
        (h || a.initialSlide || 0) === (c || 0) &&
          s &&
          l.emit("beforeSlideChangeStart");
      const v = -r[f];
      if ((l.updateProgress(v), a.normalizeSlideIndex))
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * d[e]),
            i = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (o = e)
              : t >= s && t < i && (o = e + 1)
            : t >= s && (o = e);
        }
      if (l.initialized && o !== h) {
        if (!l.allowSlideNext && v < l.translate && v < l.minTranslate())
          return !1;
        if (
          !l.allowSlidePrev &&
          v > l.translate &&
          v > l.maxTranslate() &&
          (h || 0) !== o
        )
          return !1;
      }
      let b;
      if (
        ((b = o > h ? "next" : o < h ? "prev" : "reset"),
        (u && -v === l.translate) || (!u && v === l.translate))
      )
        return (
          l.updateActiveIndex(o),
          a.autoHeight && l.updateAutoHeight(),
          l.updateSlidesClasses(),
          "slide" !== a.effect && l.setTranslate(v),
          "reset" !== b && (l.transitionStart(s, b), l.transitionEnd(s, b)),
          !1
        );
      if (a.cssMode) {
        const e = l.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = l.virtual && l.params.virtual.enabled;
          t &&
            ((l.wrapperEl.style.scrollSnapType = "none"),
            (l._immediateVirtual = !0)),
            (p[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (l.wrapperEl.style.scrollSnapType = ""),
                  (l._swiperImmediateVirtual = !1);
              });
        } else {
          if (!l.support.smoothScroll)
            return (
              D({ swiper: l, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          p.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        l.setTransition(t),
        l.setTranslate(v),
        l.updateActiveIndex(o),
        l.updateSlidesClasses(),
        l.emit("beforeTransitionStart", t, i),
        l.transitionStart(s, b),
        0 === t
          ? l.transitionEnd(s, b)
          : l.animating ||
            ((l.animating = !0),
            l.onSlideToWrapperTransitionEnd ||
              (l.onSlideToWrapperTransitionEnd = function (e) {
                l &&
                  !l.destroyed &&
                  e.target === this &&
                  (l.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    l.onSlideToWrapperTransitionEnd
                  ),
                  l.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    l.onSlideToWrapperTransitionEnd
                  ),
                  (l.onSlideToWrapperTransitionEnd = null),
                  delete l.onSlideToWrapperTransitionEnd,
                  l.transitionEnd(s, b));
              }),
            l.$wrapperEl[0].addEventListener(
              "transitionend",
              l.onSlideToWrapperTransitionEnd
            ),
            l.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              l.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const n = this;
      let l = e;
      return n.params.loop && (l += n.loopedSlides), n.slideTo(l, t, s, i);
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { animating: n, enabled: l, params: o } = i;
      if (!l) return i;
      let a = o.slidesPerGroup;
      "auto" === o.slidesPerView &&
        1 === o.slidesPerGroup &&
        o.slidesPerGroupAuto &&
        (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const r = i.activeIndex < o.slidesPerGroupSkip ? 1 : a;
      if (o.loop) {
        if (n && o.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      return o.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + r, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: n,
          animating: l,
          snapGrid: o,
          slidesGrid: a,
          rtlTranslate: r,
          enabled: d,
        } = i;
      if (!d) return i;
      if (n.loop) {
        if (l && n.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      function c(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const h = c(r ? i.translate : -i.translate),
        u = o.map((e) => c(e));
      let p = o[u.indexOf(h) - 1];
      if (void 0 === p && n.cssMode) {
        let e;
        o.forEach((t, s) => {
          h >= t && (e = s);
        }),
          void 0 !== e && (p = o[e > 0 ? e - 1 : e]);
      }
      let g = 0;
      if (
        (void 0 !== p &&
          ((g = a.indexOf(p)),
          g < 0 && (g = i.activeIndex - 1),
          "auto" === n.slidesPerView &&
            1 === n.slidesPerGroup &&
            n.slidesPerGroupAuto &&
            ((g = g - i.slidesPerViewDynamic("previous", !0) + 1),
            (g = Math.max(g, 0)))),
        n.rewind && i.isBeginning)
      ) {
        const n =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(n, e, t, s);
      }
      return i.slideTo(g, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const n = this;
      let l = n.activeIndex;
      const o = Math.min(n.params.slidesPerGroupSkip, l),
        a = o + Math.floor((l - o) / n.params.slidesPerGroup),
        r = n.rtlTranslate ? n.translate : -n.translate;
      if (r >= n.snapGrid[a]) {
        const e = n.snapGrid[a];
        r - e > (n.snapGrid[a + 1] - e) * i && (l += n.params.slidesPerGroup);
      } else {
        const e = n.snapGrid[a - 1];
        r - e <= (n.snapGrid[a] - e) * i && (l -= n.params.slidesPerGroup);
      }
      return (
        (l = Math.max(l, 0)),
        (l = Math.min(l, n.slidesGrid.length - 1)),
        n.slideTo(l, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let n,
        l = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (n = parseInt(I(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? l < e.loopedSlides - i / 2 ||
              l > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (l = s
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                O(() => {
                  e.slideTo(l);
                }))
              : e.slideTo(l)
            : l > e.slides.length - i
            ? (e.loopFix(),
              (l = s
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              O(() => {
                e.slideTo(l);
              }))
            : e.slideTo(l);
      } else e.slideTo(l);
    },
  };
  const R = {
    loopCreate: function () {
      const e = this,
        t = v(),
        { params: s, $wrapperEl: i } = e,
        n = i.children().length > 0 ? I(i.children()[0].parentNode) : i;
      n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
      let l = n.children(`.${s.slideClass}`);
      if (s.loopFillGroupWithBlank) {
        const e = s.slidesPerGroup - (l.length % s.slidesPerGroup);
        if (e !== s.slidesPerGroup) {
          for (let i = 0; i < e; i += 1) {
            const e = I(t.createElement("div")).addClass(
              `${s.slideClass} ${s.slideBlankClass}`
            );
            n.append(e);
          }
          l = n.children(`.${s.slideClass}`);
        }
      }
      "auto" !== s.slidesPerView ||
        s.loopedSlides ||
        (s.loopedSlides = l.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(s.loopedSlides || s.slidesPerView, 10)
        )),
        (e.loopedSlides += s.loopAdditionalSlides),
        e.loopedSlides > l.length &&
          e.params.loopedSlidesLimit &&
          (e.loopedSlides = l.length);
      const o = [],
        a = [];
      l.each((e, t) => {
        I(e).attr("data-swiper-slide-index", t);
      });
      for (let t = 0; t < e.loopedSlides; t += 1) {
        const e = t - Math.floor(t / l.length) * l.length;
        a.push(l.eq(e)[0]), o.unshift(l.eq(l.length - e - 1)[0]);
      }
      for (let e = 0; e < a.length; e += 1)
        n.append(I(a[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
      for (let e = o.length - 1; e >= 0; e -= 1)
        n.prepend(I(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: s,
        loopedSlides: i,
        allowSlidePrev: n,
        allowSlideNext: l,
        snapGrid: o,
        rtlTranslate: a,
      } = e;
      let r;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const d = -o[t] - e.getTranslate();
      if (t < i) {
        (r = s.length - 3 * i + t), (r += i);
        e.slideTo(r, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((a ? -e.translate : e.translate) - d);
      } else if (t >= s.length - i) {
        (r = -s.length + t + i), (r += i);
        e.slideTo(r, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((a ? -e.translate : e.translate) - d);
      }
      (e.allowSlidePrev = n), (e.allowSlideNext = l), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: s } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        s.removeAttr("data-swiper-slide-index");
    },
  };
  function Y(e) {
    const t = this,
      s = v(),
      i = y(),
      n = t.touchEventsData,
      { params: l, touches: o, enabled: a } = t;
    if (!a) return;
    if (t.animating && l.preventInteractionOnTransition) return;
    !t.animating && l.cssMode && l.loop && t.loopFix();
    let r = e;
    r.originalEvent && (r = r.originalEvent);
    let d = I(r.target);
    if ("wrapper" === l.touchEventsTarget && !d.closest(t.wrapperEl).length)
      return;
    if (
      ((n.isTouchEvent = "touchstart" === r.type),
      !n.isTouchEvent && "which" in r && 3 === r.which)
    )
      return;
    if (!n.isTouchEvent && "button" in r && r.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    !!l.noSwipingClass &&
      "" !== l.noSwipingClass &&
      r.target &&
      r.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (d = I(e.path[0]));
    const c = l.noSwipingSelector
        ? l.noSwipingSelector
        : `.${l.noSwipingClass}`,
      h = !(!r.target || !r.target.shadowRoot);
    if (
      l.noSwiping &&
      (h
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === v() || s === y()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(c, d[0])
        : d.closest(c)[0])
    )
      return void (t.allowClick = !0);
    if (l.swipeHandler && !d.closest(l.swipeHandler)[0]) return;
    (o.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX),
      (o.currentY =
        "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY);
    const u = o.currentX,
      p = o.currentY,
      g = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection,
      m = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold;
    if (g && (u <= m || u >= i.innerWidth - m)) {
      if ("prevent" !== g) return;
      e.preventDefault();
    }
    if (
      (Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (o.startX = u),
      (o.startY = p),
      (n.touchStartTime = k()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      l.threshold > 0 && (n.allowThresholdMove = !1),
      "touchstart" !== r.type)
    ) {
      let e = !0;
      d.is(n.focusableElements) &&
        ((e = !1), "SELECT" === d[0].nodeName && (n.isTouched = !1)),
        s.activeElement &&
          I(s.activeElement).is(n.focusableElements) &&
          s.activeElement !== d[0] &&
          s.activeElement.blur();
      const i = e && t.allowTouchMove && l.touchStartPreventDefault;
      (!l.touchStartForcePreventDefault && !i) ||
        d[0].isContentEditable ||
        r.preventDefault();
    }
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !l.cssMode &&
      t.freeMode.onTouchStart(),
      t.emit("touchStart", r);
  }
  function U(e) {
    const t = v(),
      s = this,
      i = s.touchEventsData,
      { params: n, touches: l, rtlTranslate: o, enabled: a } = s;
    if (!a) return;
    let r = e;
    if ((r.originalEvent && (r = r.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", r)
      );
    if (i.isTouchEvent && "touchmove" !== r.type) return;
    const d =
        "touchmove" === r.type &&
        r.targetTouches &&
        (r.targetTouches[0] || r.changedTouches[0]),
      c = "touchmove" === r.type ? d.pageX : r.pageX,
      h = "touchmove" === r.type ? d.pageY : r.pageY;
    if (r.preventedByNestedSwiper) return (l.startX = c), void (l.startY = h);
    if (!s.allowTouchMove)
      return (
        I(r.target).is(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(l, { startX: c, startY: h, currentX: c, currentY: h }),
          (i.touchStartTime = k()))
        )
      );
    if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
      if (s.isVertical()) {
        if (
          (h < l.startY && s.translate <= s.maxTranslate()) ||
          (h > l.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (c < l.startX && s.translate <= s.maxTranslate()) ||
        (c > l.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      i.isTouchEvent &&
      t.activeElement &&
      r.target === t.activeElement &&
      I(r.target).is(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", r),
      r.targetTouches && r.targetTouches.length > 1)
    )
      return;
    (l.currentX = c), (l.currentY = h);
    const u = l.currentX - l.startX,
      p = l.currentY - l.startY;
    if (s.params.threshold && Math.sqrt(u ** 2 + p ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && l.currentY === l.startY) ||
      (s.isVertical() && l.currentX === l.startX)
        ? (i.isScrolling = !1)
        : u * u + p * p >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(p), Math.abs(u))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > n.touchAngle
            : 90 - e > n.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", r),
      void 0 === i.startMoving &&
        ((l.currentX === l.startX && l.currentY === l.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !n.cssMode && r.cancelable && r.preventDefault(),
      n.touchMoveStopPropagation && !n.nested && r.stopPropagation(),
      i.isMoved ||
        (n.loop && !n.cssMode && s.loopFix(),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating &&
          s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (i.allowMomentumBounce = !1),
        !n.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", r)),
      s.emit("sliderMove", r),
      (i.isMoved = !0);
    let g = s.isHorizontal() ? u : p;
    (l.diff = g),
      (g *= n.touchRatio),
      o && (g = -g),
      (s.swipeDirection = g > 0 ? "prev" : "next"),
      (i.currentTranslate = g + i.startTranslate);
    let m = !0,
      f = n.resistanceRatio;
    if (
      (n.touchReleaseOnEdges && (f = 0),
      g > 0 && i.currentTranslate > s.minTranslate()
        ? ((m = !1),
          n.resistance &&
            (i.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + i.startTranslate + g) ** f))
        : g < 0 &&
          i.currentTranslate < s.maxTranslate() &&
          ((m = !1),
          n.resistance &&
            (i.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - i.startTranslate - g) ** f)),
      m && (r.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      n.threshold > 0)
    ) {
      if (!(Math.abs(g) > n.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (l.startX = l.currentX),
          (l.startY = l.currentY),
          (i.currentTranslate = i.startTranslate),
          void (l.diff = s.isHorizontal()
            ? l.currentX - l.startX
            : l.currentY - l.startY)
        );
    }
    n.followFinger &&
      !n.cssMode &&
      (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
        n.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        n.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function K(e) {
    const t = this,
      s = t.touchEventsData,
      { params: i, touches: n, rtlTranslate: l, slidesGrid: o, enabled: a } = t;
    if (!a) return;
    let r = e;
    if (
      (r.originalEvent && (r = r.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", r),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && i.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    i.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const d = k(),
      c = d - s.touchStartTime;
    if (t.allowClick) {
      const e = r.path || (r.composedPath && r.composedPath());
      t.updateClickedSlide((e && e[0]) || r.target),
        t.emit("tap click", r),
        c < 300 &&
          d - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", r);
    }
    if (
      ((s.lastClickTime = k()),
      O(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === n.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let h;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (h = i.followFinger
        ? l
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      i.cssMode)
    )
      return;
    if (t.params.freeMode && i.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: h });
    let u = 0,
      p = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
    ) {
      const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      void 0 !== o[e + t]
        ? h >= o[e] && h < o[e + t] && ((u = e), (p = o[e + t] - o[e]))
        : h >= o[e] && ((u = e), (p = o[o.length - 1] - o[o.length - 2]));
    }
    let g = null,
      m = null;
    i.rewind &&
      (t.isBeginning
        ? (m =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (g = 0));
    const f = (h - o[u]) / p,
      v = u < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (c > i.longSwipesMs) {
      if (!i.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (f >= i.longSwipesRatio
          ? t.slideTo(i.rewind && t.isEnd ? g : u + v)
          : t.slideTo(u)),
        "prev" === t.swipeDirection &&
          (f > 1 - i.longSwipesRatio
            ? t.slideTo(u + v)
            : null !== m && f < 0 && Math.abs(f) > i.longSwipesRatio
            ? t.slideTo(m)
            : t.slideTo(u));
    } else {
      if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl)
        ? r.target === t.navigation.nextEl
          ? t.slideTo(u + v)
          : t.slideTo(u)
        : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : u + v),
          "prev" === t.swipeDirection && t.slideTo(null !== m ? m : u));
    }
  }
  function Z() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: n, snapGrid: l } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = n),
      (e.allowSlideNext = i),
      e.params.watchOverflow && l !== e.snapGrid && e.checkOverflow();
  }
  function Q(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function J() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let n;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const l = e.maxTranslate() - e.minTranslate();
    (n = 0 === l ? 0 : (e.translate - e.minTranslate()) / l),
      n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let ee = !1;
  function te() {}
  const se = (e, t) => {
    const s = v(),
      {
        params: i,
        touchEvents: n,
        el: l,
        wrapperEl: o,
        device: a,
        support: r,
      } = e,
      d = !!i.nested,
      c = "on" === t ? "addEventListener" : "removeEventListener",
      h = t;
    if (r.touch) {
      const t = !(
        "touchstart" !== n.start ||
        !r.passiveListener ||
        !i.passiveListeners
      ) && { passive: !0, capture: !1 };
      l[c](n.start, e.onTouchStart, t),
        l[c](
          n.move,
          e.onTouchMove,
          r.passiveListener ? { passive: !1, capture: d } : d
        ),
        l[c](n.end, e.onTouchEnd, t),
        n.cancel && l[c](n.cancel, e.onTouchEnd, t);
    } else
      l[c](n.start, e.onTouchStart, !1),
        s[c](n.move, e.onTouchMove, d),
        s[c](n.end, e.onTouchEnd, !1);
    (i.preventClicks || i.preventClicksPropagation) &&
      l[c]("click", e.onClick, !0),
      i.cssMode && o[c]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[h](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            Z,
            !0
          )
        : e[h]("observerUpdate", Z, !0);
  };
  const ie = {
      attachEvents: function () {
        const e = this,
          t = v(),
          { params: s, support: i } = e;
        (e.onTouchStart = Y.bind(e)),
          (e.onTouchMove = U.bind(e)),
          (e.onTouchEnd = K.bind(e)),
          s.cssMode && (e.onScroll = J.bind(e)),
          (e.onClick = Q.bind(e)),
          i.touch && !ee && (t.addEventListener("touchstart", te), (ee = !0)),
          se(e, "on");
      },
      detachEvents: function () {
        se(this, "off");
      },
    },
    ne = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const le = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: s,
          loopedSlides: i = 0,
          params: n,
          $el: l,
        } = e,
        o = n.breakpoints;
      if (!o || (o && 0 === Object.keys(o).length)) return;
      const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
      if (!a || e.currentBreakpoint === a) return;
      const r = (a in o ? o[a] : void 0) || e.originalParams,
        d = ne(e, n),
        c = ne(e, r),
        h = n.enabled;
      d && !c
        ? (l.removeClass(
            `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !d &&
          c &&
          (l.addClass(`${n.containerModifierClass}grid`),
          ((r.grid.fill && "column" === r.grid.fill) ||
            (!r.grid.fill && "column" === n.grid.fill)) &&
            l.addClass(`${n.containerModifierClass}grid-column`),
          e.emitContainerClasses()),
        ["navigation", "pagination", "scrollbar"].forEach((t) => {
          const s = n[t] && n[t].enabled,
            i = r[t] && r[t].enabled;
          s && !i && e[t].disable(), !s && i && e[t].enable();
        });
      const u = r.direction && r.direction !== n.direction,
        p = n.loop && (r.slidesPerView !== n.slidesPerView || u);
      u && s && e.changeDirection(), M(e.params, r);
      const g = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        h && !g ? e.disable() : !h && g && e.enable(),
        (e.currentBreakpoint = a),
        e.emit("_beforeBreakpoint", r),
        p &&
          s &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - i + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", r);
    },
    getBreakpoint: function (e, t, s) {
      if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
        return;
      let i = !1;
      const n = y(),
        l = "window" === t ? n.innerHeight : s.clientHeight,
        o = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: l * t, point: e };
          }
          return { value: e, point: e };
        });
      o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < o.length; e += 1) {
        const { point: l, value: a } = o[e];
        "window" === t
          ? n.matchMedia(`(min-width: ${a}px)`).matches && (i = l)
          : a <= s.clientWidth && (i = l);
      }
      return i || "max";
    },
  };
  const oe = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: s, rtl: i, $el: n, device: l, support: o } = e,
        a = (function (e, t) {
          const s = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((i) => {
                    e[i] && s.push(t + i);
                  })
                : "string" == typeof e && s.push(t + e);
            }),
            s
          );
        })(
          [
            "initialized",
            s.direction,
            { "pointer-events": !o.touch },
            { "free-mode": e.params.freeMode && s.freeMode.enabled },
            { autoheight: s.autoHeight },
            { rtl: i },
            { grid: s.grid && s.grid.rows > 1 },
            {
              "grid-column":
                s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
            },
            { android: l.android },
            { ios: l.ios },
            { "css-mode": s.cssMode },
            { centered: s.cssMode && s.centeredSlides },
            { "watch-progress": s.watchSlidesProgress },
          ],
          s.containerModifierClass
        );
      t.push(...a), n.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const ae = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopedSlidesLimit: !0,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function re(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        n = s[i];
      "object" == typeof n && null !== n
        ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
            !0 === e[i] &&
            (e[i] = { auto: !0 }),
          i in e && "enabled" in n
            ? (!0 === e[i] && (e[i] = { enabled: !0 }),
              "object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              M(t, s))
            : M(t, s))
        : M(t, s);
    };
  }
  const de = {
      eventsEmitter: F,
      update: j,
      translate: N,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || s.$wrapperEl.transition(e),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            W({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              W({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: X,
      loop: R,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (s.style.cursor = "move"), (s.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: ie,
      breakpoints: le,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: oe,
      images: {
        loadImage: function (e, t, s, i, n, l) {
          const o = y();
          let a;
          function r() {
            l && l();
          }
          I(e).parent("picture")[0] || (e.complete && n)
            ? r()
            : t
            ? ((a = new o.Image()),
              (a.onload = r),
              (a.onerror = r),
              i && (a.sizes = i),
              s && (a.srcset = s),
              t && (a.src = t))
            : r();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let s = 0; s < e.imagesToLoad.length; s += 1) {
            const i = e.imagesToLoad[s];
            e.loadImage(
              i,
              i.currentSrc || i.getAttribute("src"),
              i.srcset || i.getAttribute("srcset"),
              i.sizes || i.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    ce = {};
  class he {
    constructor() {
      let e, t;
      for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
        i[n] = arguments[n];
      if (
        (1 === i.length &&
        i[0].constructor &&
        "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
          ? (t = i[0])
          : ([e, t] = i),
        t || (t = {}),
        (t = M({}, t)),
        e && !t.el && (t.el = e),
        t.el && I(t.el).length > 1)
      ) {
        const e = [];
        return (
          I(t.el).each((s) => {
            const i = M({}, t, { el: s });
            e.push(new he(i));
          }),
          e
        );
      }
      const l = this;
      (l.__swiper__ = !0),
        (l.support = V()),
        (l.device = q({ userAgent: t.userAgent })),
        (l.browser = H()),
        (l.eventsListeners = {}),
        (l.eventsAnyListeners = []),
        (l.modules = [...l.__modules__]),
        t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
      const o = {};
      l.modules.forEach((e) => {
        e({
          swiper: l,
          extendParams: re(t, o),
          on: l.on.bind(l),
          once: l.once.bind(l),
          off: l.off.bind(l),
          emit: l.emit.bind(l),
        });
      });
      const a = M({}, ae, o);
      return (
        (l.params = M({}, a, ce, t)),
        (l.originalParams = M({}, l.params)),
        (l.passedParams = M({}, t)),
        l.params &&
          l.params.on &&
          Object.keys(l.params.on).forEach((e) => {
            l.on(e, l.params.on[e]);
          }),
        l.params && l.params.onAny && l.onAny(l.params.onAny),
        (l.$ = I),
        Object.assign(l, {
          enabled: l.params.enabled,
          el: e,
          classNames: [],
          slides: I(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === l.params.direction,
          isVertical: () => "vertical" === l.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: l.params.allowSlideNext,
          allowSlidePrev: l.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (l.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (l.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              l.support.touch || !l.params.simulateTouch
                ? l.touchEventsTouch
                : l.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: l.params.focusableElements,
            lastClickTime: k(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: l.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        l.emit("_swiper"),
        l.params.init && l.init(),
        l
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        n = (s.maxTranslate() - i) * e + i;
      s.translateTo(n, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: n,
        slidesSizesGrid: l,
        size: o,
        activeIndex: a,
      } = this;
      let r = 1;
      if (s.centeredSlides) {
        let e,
          t = i[a].swiperSlideSize;
        for (let s = a + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (r += 1), t > o && (e = !0));
        for (let s = a - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (r += 1), t > o && (e = !0));
      } else if ("current" === e)
        for (let e = a + 1; e < i.length; e += 1) {
          (t ? n[e] + l[e] - n[a] < o : n[e] - n[a] < o) && (r += 1);
        }
      else
        for (let e = a - 1; e >= 0; e -= 1) {
          n[a] - n[e] < o && (r += 1);
        }
      return r;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let n;
      s.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (i(), e.params.autoHeight && e.updateAutoHeight())
          : ((n =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            n || i()),
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.$el
            .removeClass(`${s.params.containerModifierClass}${i}`)
            .addClass(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.$el.addClass(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.$el.removeClass(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const s = I(e || t.params.el);
      if (!(e = s[0])) return !1;
      e.swiper = t;
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let n = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = I(e.shadowRoot.querySelector(i()));
          return (t.children = (e) => s.children(e)), t;
        }
        return s.children ? s.children(i()) : I(s).children(i());
      })();
      if (0 === n.length && t.params.createElements) {
        const e = v().createElement("div");
        (n = I(e)),
          (e.className = t.params.wrapperClass),
          s.append(e),
          s.children(`.${t.params.slideClass}`).each((e) => {
            n.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: s,
          el: e,
          $wrapperEl: n,
          wrapperEl: n[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
          wrongRTL: "-webkit-box" === n.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, $el: n, $wrapperEl: l, slides: o } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            n.removeAttr("style"),
            l.removeAttr("style"),
            o &&
              o.length &&
              o
                .removeClass(
                  [
                    i.slideVisibleClass,
                    i.slideActiveClass,
                    i.slideNextClass,
                    i.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      M(ce, e);
    }
    static get extendedDefaults() {
      return ce;
    }
    static get defaults() {
      return ae;
    }
    static installModule(e) {
      he.prototype.__modules__ || (he.prototype.__modules__ = []);
      const t = he.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => he.installModule(e)), he)
        : (he.installModule(e), he);
    }
  }
  Object.keys(de).forEach((e) => {
    Object.keys(de[e]).forEach((t) => {
      he.prototype[t] = de[e][t];
    });
  }),
    he.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const n = y();
        let l = null,
          o = null;
        const a = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          r = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== n.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((l = new ResizeObserver((e) => {
                o = n.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let n = s,
                    l = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: o } = e;
                    (o && o !== t.el) ||
                      ((n = i ? i.width : (s[0] || s).inlineSize),
                      (l = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (n === s && l === i) || a();
                });
              })),
              l.observe(t.el))
            : (n.addEventListener("resize", a),
              n.addEventListener("orientationchange", r));
        }),
          s("destroy", () => {
            o && n.cancelAnimationFrame(o),
              l && l.unobserve && t.el && (l.unobserve(t.el), (l = null)),
              n.removeEventListener("resize", a),
              n.removeEventListener("orientationchange", r);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const l = [],
          o = y(),
          a = function (e, t) {
            void 0 === t && (t = {});
            const s = new (o.MutationObserver || o.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void n("observerUpdate", e[0]);
                const t = function () {
                  n("observerUpdate", e[0]);
                };
                o.requestAnimationFrame
                  ? o.requestAnimationFrame(t)
                  : o.setTimeout(t, 0);
              }
            );
            s.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              l.push(s);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = t.$el.parents();
                for (let t = 0; t < e.length; t += 1) a(e[t]);
              }
              a(t.$el[0], { childList: t.params.observeSlideChildren }),
                a(t.$wrapperEl[0], { attributes: !1 });
            }
          }),
          i("destroy", () => {
            l.forEach((e) => {
              e.disconnect();
            }),
              l.splice(0, l.length);
          });
      },
    ]);
  const ue = he;
  function pe(e, t, s, i) {
    const n = v();
    return (
      e.params.createElements &&
        Object.keys(i).forEach((l) => {
          if (!s[l] && !0 === s.auto) {
            let o = e.$el.children(`.${i[l]}`)[0];
            o ||
              ((o = n.createElement("div")),
              (o.className = i[l]),
              e.$el.append(o)),
              (s[l] = o),
              (t[l] = o);
          }
        }),
      s
    );
  }
  function ge(e) {
    let { swiper: t, extendParams: s, on: i, emit: n } = e;
    function l(e) {
      let s;
      return (
        e &&
          ((s = I(e)),
          t.params.uniqueNavElements &&
            "string" == typeof e &&
            s.length > 1 &&
            1 === t.$el.find(e).length &&
            (s = t.$el.find(e))),
        s
      );
    }
    function o(e, s) {
      const i = t.params.navigation;
      e &&
        e.length > 0 &&
        (e[s ? "addClass" : "removeClass"](i.disabledClass),
        e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
        t.params.watchOverflow &&
          t.enabled &&
          e[t.isLocked ? "addClass" : "removeClass"](i.lockClass));
    }
    function a() {
      if (t.params.loop) return;
      const { $nextEl: e, $prevEl: s } = t.navigation;
      o(s, t.isBeginning && !t.params.rewind),
        o(e, t.isEnd && !t.params.rewind);
    }
    function r(e) {
      e.preventDefault(),
        (!t.isBeginning || t.params.loop || t.params.rewind) &&
          (t.slidePrev(), n("navigationPrev"));
    }
    function d(e) {
      e.preventDefault(),
        (!t.isEnd || t.params.loop || t.params.rewind) &&
          (t.slideNext(), n("navigationNext"));
    }
    function c() {
      const e = t.params.navigation;
      if (
        ((t.params.navigation = pe(
          t,
          t.originalParams.navigation,
          t.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
        )),
        !e.nextEl && !e.prevEl)
      )
        return;
      const s = l(e.nextEl),
        i = l(e.prevEl);
      s && s.length > 0 && s.on("click", d),
        i && i.length > 0 && i.on("click", r),
        Object.assign(t.navigation, {
          $nextEl: s,
          nextEl: s && s[0],
          $prevEl: i,
          prevEl: i && i[0],
        }),
        t.enabled ||
          (s && s.addClass(e.lockClass), i && i.addClass(e.lockClass));
    }
    function h() {
      const { $nextEl: e, $prevEl: s } = t.navigation;
      e &&
        e.length &&
        (e.off("click", d), e.removeClass(t.params.navigation.disabledClass)),
        s &&
          s.length &&
          (s.off("click", r), s.removeClass(t.params.navigation.disabledClass));
    }
    s({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (t.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null,
      }),
      i("init", () => {
        !1 === t.params.navigation.enabled ? u() : (c(), a());
      }),
      i("toEdge fromEdge lock unlock", () => {
        a();
      }),
      i("destroy", () => {
        h();
      }),
      i("enable disable", () => {
        const { $nextEl: e, $prevEl: s } = t.navigation;
        e &&
          e[t.enabled ? "removeClass" : "addClass"](
            t.params.navigation.lockClass
          ),
          s &&
            s[t.enabled ? "removeClass" : "addClass"](
              t.params.navigation.lockClass
            );
      }),
      i("click", (e, s) => {
        const { $nextEl: i, $prevEl: l } = t.navigation,
          o = s.target;
        if (t.params.navigation.hideOnClick && !I(o).is(l) && !I(o).is(i)) {
          if (
            t.pagination &&
            t.params.pagination &&
            t.params.pagination.clickable &&
            (t.pagination.el === o || t.pagination.el.contains(o))
          )
            return;
          let e;
          i
            ? (e = i.hasClass(t.params.navigation.hiddenClass))
            : l && (e = l.hasClass(t.params.navigation.hiddenClass)),
            n(!0 === e ? "navigationShow" : "navigationHide"),
            i && i.toggleClass(t.params.navigation.hiddenClass),
            l && l.toggleClass(t.params.navigation.hiddenClass);
        }
      });
    const u = () => {
      t.$el.addClass(t.params.navigation.navigationDisabledClass), h();
    };
    Object.assign(t.navigation, {
      enable: () => {
        t.$el.removeClass(t.params.navigation.navigationDisabledClass),
          c(),
          a();
      },
      disable: u,
      update: a,
      init: c,
      destroy: h,
    });
  }
  function me(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function fe(e) {
    let { swiper: t, extendParams: s, on: i, emit: n } = e;
    const l = "swiper-pagination";
    let o;
    s({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${l}-bullet`,
        bulletActiveClass: `${l}-bullet-active`,
        modifierClass: `${l}-`,
        currentClass: `${l}-current`,
        totalClass: `${l}-total`,
        hiddenClass: `${l}-hidden`,
        progressbarFillClass: `${l}-progressbar-fill`,
        progressbarOppositeClass: `${l}-progressbar-opposite`,
        clickableClass: `${l}-clickable`,
        lockClass: `${l}-lock`,
        horizontalClass: `${l}-horizontal`,
        verticalClass: `${l}-vertical`,
        paginationDisabledClass: `${l}-disabled`,
      },
    }),
      (t.pagination = { el: null, $el: null, bullets: [] });
    let a = 0;
    function r() {
      return (
        !t.params.pagination.el ||
        !t.pagination.el ||
        !t.pagination.$el ||
        0 === t.pagination.$el.length
      );
    }
    function d(e, s) {
      const { bulletActiveClass: i } = t.params.pagination;
      e[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`);
    }
    function c() {
      const e = t.rtl,
        s = t.params.pagination;
      if (r()) return;
      const i =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        l = t.pagination.$el;
      let c;
      const h = t.params.loop
        ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
        : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((c = Math.ceil(
              (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
            )),
            c > i - 1 - 2 * t.loopedSlides && (c -= i - 2 * t.loopedSlides),
            c > h - 1 && (c -= h),
            c < 0 && "bullets" !== t.params.paginationType && (c = h + c))
          : (c = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
        "bullets" === s.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const i = t.pagination.bullets;
        let n, r, h;
        if (
          (s.dynamicBullets &&
            ((o = i.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
            l.css(
              t.isHorizontal() ? "width" : "height",
              o * (s.dynamicMainBullets + 4) + "px"
            ),
            s.dynamicMainBullets > 1 &&
              void 0 !== t.previousIndex &&
              ((a += c - (t.previousIndex - t.loopedSlides || 0)),
              a > s.dynamicMainBullets - 1
                ? (a = s.dynamicMainBullets - 1)
                : a < 0 && (a = 0)),
            (n = Math.max(c - a, 0)),
            (r = n + (Math.min(i.length, s.dynamicMainBullets) - 1)),
            (h = (r + n) / 2)),
          i.removeClass(
            ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((e) => `${s.bulletActiveClass}${e}`)
              .join(" ")
          ),
          l.length > 1)
        )
          i.each((e) => {
            const t = I(e),
              i = t.index();
            i === c && t.addClass(s.bulletActiveClass),
              s.dynamicBullets &&
                (i >= n && i <= r && t.addClass(`${s.bulletActiveClass}-main`),
                i === n && d(t, "prev"),
                i === r && d(t, "next"));
          });
        else {
          const e = i.eq(c),
            l = e.index();
          if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
            const e = i.eq(n),
              o = i.eq(r);
            for (let e = n; e <= r; e += 1)
              i.eq(e).addClass(`${s.bulletActiveClass}-main`);
            if (t.params.loop)
              if (l >= i.length) {
                for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                  i.eq(i.length - e).addClass(`${s.bulletActiveClass}-main`);
                i.eq(i.length - s.dynamicMainBullets - 1).addClass(
                  `${s.bulletActiveClass}-prev`
                );
              } else d(e, "prev"), d(o, "next");
            else d(e, "prev"), d(o, "next");
          }
        }
        if (s.dynamicBullets) {
          const n = Math.min(i.length, s.dynamicMainBullets + 4),
            l = (o * n - o) / 2 - h * o,
            a = e ? "right" : "left";
          i.css(t.isHorizontal() ? a : "top", `${l}px`);
        }
      }
      if (
        ("fraction" === s.type &&
          (l.find(me(s.currentClass)).text(s.formatFractionCurrent(c + 1)),
          l.find(me(s.totalClass)).text(s.formatFractionTotal(h))),
        "progressbar" === s.type)
      ) {
        let e;
        e = s.progressbarOpposite
          ? t.isHorizontal()
            ? "vertical"
            : "horizontal"
          : t.isHorizontal()
          ? "horizontal"
          : "vertical";
        const i = (c + 1) / h;
        let n = 1,
          o = 1;
        "horizontal" === e ? (n = i) : (o = i),
          l
            .find(me(s.progressbarFillClass))
            .transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${o})`)
            .transition(t.params.speed);
      }
      "custom" === s.type && s.renderCustom
        ? (l.html(s.renderCustom(t, c + 1, h)), n("paginationRender", l[0]))
        : n("paginationUpdate", l[0]),
        t.params.watchOverflow &&
          t.enabled &&
          l[t.isLocked ? "addClass" : "removeClass"](s.lockClass);
    }
    function h() {
      const e = t.params.pagination;
      if (r()) return;
      const s =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        i = t.pagination.$el;
      let l = "";
      if ("bullets" === e.type) {
        let n = t.params.loop
          ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          !t.params.loop &&
          n > s &&
          (n = s);
        for (let s = 0; s < n; s += 1)
          e.renderBullet
            ? (l += e.renderBullet.call(t, s, e.bulletClass))
            : (l += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
        i.html(l), (t.pagination.bullets = i.find(me(e.bulletClass)));
      }
      "fraction" === e.type &&
        ((l = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        i.html(l)),
        "progressbar" === e.type &&
          ((l = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
          i.html(l)),
        "custom" !== e.type && n("paginationRender", t.pagination.$el[0]);
    }
    function u() {
      t.params.pagination = pe(
        t,
        t.originalParams.pagination,
        t.params.pagination,
        { el: "swiper-pagination" }
      );
      const e = t.params.pagination;
      if (!e.el) return;
      let s = I(e.el);
      0 !== s.length &&
        (t.params.uniqueNavElements &&
          "string" == typeof e.el &&
          s.length > 1 &&
          ((s = t.$el.find(e.el)),
          s.length > 1 &&
            (s = s.filter((e) => I(e).parents(".swiper")[0] === t.el))),
        "bullets" === e.type && e.clickable && s.addClass(e.clickableClass),
        s.addClass(e.modifierClass + e.type),
        s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
        "bullets" === e.type &&
          e.dynamicBullets &&
          (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
          (a = 0),
          e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
        "progressbar" === e.type &&
          e.progressbarOpposite &&
          s.addClass(e.progressbarOppositeClass),
        e.clickable &&
          s.on("click", me(e.bulletClass), function (e) {
            e.preventDefault();
            let s = I(this).index() * t.params.slidesPerGroup;
            t.params.loop && (s += t.loopedSlides), t.slideTo(s);
          }),
        Object.assign(t.pagination, { $el: s, el: s[0] }),
        t.enabled || s.addClass(e.lockClass));
    }
    function p() {
      const e = t.params.pagination;
      if (r()) return;
      const s = t.pagination.$el;
      s.removeClass(e.hiddenClass),
        s.removeClass(e.modifierClass + e.type),
        s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
        t.pagination.bullets &&
          t.pagination.bullets.removeClass &&
          t.pagination.bullets.removeClass(e.bulletActiveClass),
        e.clickable && s.off("click", me(e.bulletClass));
    }
    i("init", () => {
      !1 === t.params.pagination.enabled ? g() : (u(), h(), c());
    }),
      i("activeIndexChange", () => {
        (t.params.loop || void 0 === t.snapIndex) && c();
      }),
      i("snapIndexChange", () => {
        t.params.loop || c();
      }),
      i("slidesLengthChange", () => {
        t.params.loop && (h(), c());
      }),
      i("snapGridLengthChange", () => {
        t.params.loop || (h(), c());
      }),
      i("destroy", () => {
        p();
      }),
      i("enable disable", () => {
        const { $el: e } = t.pagination;
        e &&
          e[t.enabled ? "removeClass" : "addClass"](
            t.params.pagination.lockClass
          );
      }),
      i("lock unlock", () => {
        c();
      }),
      i("click", (e, s) => {
        const i = s.target,
          { $el: l } = t.pagination;
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          l &&
          l.length > 0 &&
          !I(i).hasClass(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && i === t.navigation.nextEl) ||
              (t.navigation.prevEl && i === t.navigation.prevEl))
          )
            return;
          const e = l.hasClass(t.params.pagination.hiddenClass);
          n(!0 === e ? "paginationShow" : "paginationHide"),
            l.toggleClass(t.params.pagination.hiddenClass);
        }
      });
    const g = () => {
      t.$el.addClass(t.params.pagination.paginationDisabledClass),
        t.pagination.$el &&
          t.pagination.$el.addClass(
            t.params.pagination.paginationDisabledClass
          ),
        p();
    };
    Object.assign(t.pagination, {
      enable: () => {
        t.$el.removeClass(t.params.pagination.paginationDisabledClass),
          t.pagination.$el &&
            t.pagination.$el.removeClass(
              t.params.pagination.paginationDisabledClass
            ),
          u(),
          h(),
          c();
      },
      disable: g,
      render: h,
      update: c,
      init: u,
      destroy: p,
    });
  }
  function ve(e) {
    let { swiper: t, extendParams: s, on: i } = e;
    s({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: !0,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs",
      },
    });
    let n = !1,
      l = !1;
    function o() {
      const e = t.thumbs.swiper;
      if (!e || e.destroyed) return;
      const s = e.clickedIndex,
        i = e.clickedSlide;
      if (i && I(i).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
      if (null == s) return;
      let n;
      if (
        ((n = e.params.loop
          ? parseInt(I(e.clickedSlide).attr("data-swiper-slide-index"), 10)
          : s),
        t.params.loop)
      ) {
        let e = t.activeIndex;
        t.slides.eq(e).hasClass(t.params.slideDuplicateClass) &&
          (t.loopFix(),
          (t._clientLeft = t.$wrapperEl[0].clientLeft),
          (e = t.activeIndex));
        const s = t.slides
            .eq(e)
            .prevAll(`[data-swiper-slide-index="${n}"]`)
            .eq(0)
            .index(),
          i = t.slides
            .eq(e)
            .nextAll(`[data-swiper-slide-index="${n}"]`)
            .eq(0)
            .index();
        n = void 0 === s ? i : void 0 === i ? s : i - e < e - s ? i : s;
      }
      t.slideTo(n);
    }
    function a() {
      const { thumbs: e } = t.params;
      if (n) return !1;
      n = !0;
      const s = t.constructor;
      if (e.swiper instanceof s)
        (t.thumbs.swiper = e.swiper),
          Object.assign(t.thumbs.swiper.originalParams, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
          Object.assign(t.thumbs.swiper.params, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          });
      else if (A(e.swiper)) {
        const i = Object.assign({}, e.swiper);
        Object.assign(i, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
          (t.thumbs.swiper = new s(i)),
          (l = !0);
      }
      return (
        t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),
        t.thumbs.swiper.on("tap", o),
        !0
      );
    }
    function r(e) {
      const s = t.thumbs.swiper;
      if (!s || s.destroyed) return;
      const i =
        "auto" === s.params.slidesPerView
          ? s.slidesPerViewDynamic()
          : s.params.slidesPerView;
      let n = 1;
      const l = t.params.thumbs.slideThumbActiveClass;
      if (
        (t.params.slidesPerView > 1 &&
          !t.params.centeredSlides &&
          (n = t.params.slidesPerView),
        t.params.thumbs.multipleActiveThumbs || (n = 1),
        (n = Math.floor(n)),
        s.slides.removeClass(l),
        s.params.loop || (s.params.virtual && s.params.virtual.enabled))
      )
        for (let e = 0; e < n; e += 1)
          s.$wrapperEl
            .children(`[data-swiper-slide-index="${t.realIndex + e}"]`)
            .addClass(l);
      else
        for (let e = 0; e < n; e += 1) s.slides.eq(t.realIndex + e).addClass(l);
      const o = t.params.thumbs.autoScrollOffset,
        a = o && !s.params.loop;
      if (t.realIndex !== s.realIndex || a) {
        let n,
          l,
          r = s.activeIndex;
        if (s.params.loop) {
          s.slides.eq(r).hasClass(s.params.slideDuplicateClass) &&
            (s.loopFix(),
            (s._clientLeft = s.$wrapperEl[0].clientLeft),
            (r = s.activeIndex));
          const e = s.slides
              .eq(r)
              .prevAll(`[data-swiper-slide-index="${t.realIndex}"]`)
              .eq(0)
              .index(),
            i = s.slides
              .eq(r)
              .nextAll(`[data-swiper-slide-index="${t.realIndex}"]`)
              .eq(0)
              .index();
          (n =
            void 0 === e
              ? i
              : void 0 === i
              ? e
              : i - r == r - e
              ? s.params.slidesPerGroup > 1
                ? i
                : r
              : i - r < r - e
              ? i
              : e),
            (l = t.activeIndex > t.previousIndex ? "next" : "prev");
        } else (n = t.realIndex), (l = n > t.previousIndex ? "next" : "prev");
        a && (n += "next" === l ? o : -1 * o),
          s.visibleSlidesIndexes &&
            s.visibleSlidesIndexes.indexOf(n) < 0 &&
            (s.params.centeredSlides
              ? (n =
                  n > r ? n - Math.floor(i / 2) + 1 : n + Math.floor(i / 2) - 1)
              : n > r && s.params.slidesPerGroup,
            s.slideTo(n, e ? 0 : void 0));
      }
    }
    (t.thumbs = { swiper: null }),
      i("beforeInit", () => {
        const { thumbs: e } = t.params;
        e && e.swiper && (a(), r(!0));
      }),
      i("slideChange update resize observerUpdate", () => {
        r();
      }),
      i("setTransition", (e, s) => {
        const i = t.thumbs.swiper;
        i && !i.destroyed && i.setTransition(s);
      }),
      i("beforeDestroy", () => {
        const e = t.thumbs.swiper;
        e && !e.destroyed && l && e.destroy();
      }),
      Object.assign(t.thumbs, { init: a, update: r });
  }
  function be(e, t) {
    return e.transformEl
      ? t
          .find(e.transformEl)
          .css({
            "backface-visibility": "hidden",
            "-webkit-backface-visibility": "hidden",
          })
      : t;
  }
  function ye(e) {
    let { swiper: t, extendParams: s, on: i } = e;
    s({ fadeEffect: { crossFade: !1, transformEl: null } });
    !(function (e) {
      const {
        effect: t,
        swiper: s,
        on: i,
        setTranslate: n,
        setTransition: l,
        overwriteParams: o,
        perspective: a,
        recreateShadows: r,
        getEffectParams: d,
      } = e;
      let c;
      i("beforeInit", () => {
        if (s.params.effect !== t) return;
        s.classNames.push(`${s.params.containerModifierClass}${t}`),
          a && a() && s.classNames.push(`${s.params.containerModifierClass}3d`);
        const e = o ? o() : {};
        Object.assign(s.params, e), Object.assign(s.originalParams, e);
      }),
        i("setTranslate", () => {
          s.params.effect === t && n();
        }),
        i("setTransition", (e, i) => {
          s.params.effect === t && l(i);
        }),
        i("transitionEnd", () => {
          if (s.params.effect === t && r) {
            if (!d || !d().slideShadows) return;
            s.slides.each((e) => {
              s.$(e)
                .find(
                  ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                )
                .remove();
            }),
              r();
          }
        }),
        i("virtualUpdate", () => {
          s.params.effect === t &&
            (s.slides.length || (c = !0),
            requestAnimationFrame(() => {
              c && s.slides && s.slides.length && (n(), (c = !1));
            }));
        });
    })({
      effect: "fade",
      swiper: t,
      on: i,
      setTranslate: () => {
        const { slides: e } = t,
          s = t.params.fadeEffect;
        for (let i = 0; i < e.length; i += 1) {
          const e = t.slides.eq(i);
          let n = -e[0].swiperSlideOffset;
          t.params.virtualTranslate || (n -= t.translate);
          let l = 0;
          t.isHorizontal() || ((l = n), (n = 0));
          const o = t.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs(e[0].progress), 0)
            : 1 + Math.min(Math.max(e[0].progress, -1), 0);
          be(s, e)
            .css({ opacity: o })
            .transform(`translate3d(${n}px, ${l}px, 0px)`);
        }
      },
      setTransition: (e) => {
        const { transformEl: s } = t.params.fadeEffect;
        (s ? t.slides.find(s) : t.slides).transition(e),
          (function (e) {
            let { swiper: t, duration: s, transformEl: i, allSlides: n } = e;
            const { slides: l, activeIndex: o, $wrapperEl: a } = t;
            if (t.params.virtualTranslate && 0 !== s) {
              let e,
                s = !1;
              (e = n ? (i ? l.find(i) : l) : i ? l.eq(o).find(i) : l.eq(o)),
                e.transitionEnd(() => {
                  if (s) return;
                  if (!t || t.destroyed) return;
                  (s = !0), (t.animating = !1);
                  const e = ["webkitTransitionEnd", "transitionend"];
                  for (let t = 0; t < e.length; t += 1) a.trigger(e[t]);
                });
            }
          })({ swiper: t, duration: e, transformEl: s, allSlides: !0 });
      },
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !t.params.cssMode,
      }),
    });
  }
  function we() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  window.addEventListener("load", function (e) {
    !(function () {
      if ((we(), document.querySelector(".swiper"))) {
        new ue(".products__slider", {
          modules: [ge, fe],
          observer: !0,
          observeParents: !0,
          spaceBetween: 27,
          speed: 800,
          slidesPerView: "auto",
          pagination: { el: ".products__pagination", clickable: !0 },
          navigation: { nextEl: ".products__next", prevEl: ".products__prev" },
          breakpoints: {
            320: { slidesPerView: "auto", spaceBetween: 16 },
            768: {},
            992: {},
          },
          on: {},
        }),
          new ue(".gallery__slider", {
            modules: [fe],
            observer: !0,
            observeParents: !0,
            spaceBetween: 30,
            speed: 800,
            slidesPerView: "auto",
            pagination: { el: ".gallery__pagination", clickable: !0 },
            breakpoints: {
              320: { spaceBetween: 17 },
              768: { spaceBetween: 24 },
            },
            on: {},
          }),
          new ue(".testimonials__slider", {
            modules: [fe, ge],
            observer: !0,
            observeParents: !0,
            spaceBetween: 20,
            speed: 800,
            slidesPerView: 2,
            pagination: { el: ".testimonials__pagination", clickable: !0 },
            navigation: {
              nextEl: ".testimonials__next",
              prevEl: ".testimonials__prev",
            },
            breakpoints: {
              320: { spaceBetween: 16, slidesPerView: "auto" },
              880: { spaceBetween: 20 },
            },
            on: {},
          }),
          new ue(".news__slider", {
            modules: [ge, fe],
            observer: !0,
            observeParents: !0,
            spaceBetween: 27,
            speed: 800,
            slidesPerView: 3,
            navigation: { nextEl: ".news__next", prevEl: ".news__prev" },
            pagination: { el: ".news__pagination", clickable: !0 },
            breakpoints: {
              320: { spaceBetween: 16, slidesPerView: "auto" },
              880: { spaceBetween: 20 },
            },
            on: {},
          }),
          new ue(".partners__slider", {
            modules: [fe],
            observer: !0,
            observeParents: !0,
            spaceBetween: 30,
            speed: 800,
            slidesPerView: "auto",
            loop: !0,
            pagination: { el: ".partners__pagination", clickable: !0 },
            breakpoints: {
              320: { spaceBetween: 14 },
              630: { spaceBetween: 24 },
              1280: { spaceBetween: 30 },
            },
            on: {},
          });
        const e = new ue(".thumbnails__slider", {
          observer: !0,
          observeParents: !0,
          spaceBetween: 22,
          slidesPerView: 4,
          breakpoints: {
            320: { spaceBetween: 7 },
            630: { spaceBetween: 12 },
            1280: { spaceBetween: 16 },
          },
          on: {},
          slidesPerView: 4,
          freeMode: !0,
          watchSlidesProgress: !0,
        });
        new ue(".album__slider", {
          modules: [ve, ye, ge],
          observer: !0,
          effect: "fade",
          fadeEffect: { crossFade: !0 },
          observeParents: !0,
          spaceBetween: 10,
          speed: 800,
          slidesPerView: 1,
          navigation: { nextEl: ".album__next", prevEl: ".album__prev" },
          thumbs: { swiper: e },
        }),
          new ue(".process__slider", {
            modules: [ge, fe],
            observer: !0,
            observeParents: !0,
            spaceBetween: 30,
            speed: 800,
            slidesPerView: 1,
            navigation: { nextEl: ".process__next", prevEl: ".process__prev" },
            pagination: { el: ".process__pagination", clickable: !0 },
            breakpoints: {
              320: { slidesPerView: "auto", spaceBetween: 16 },
              769: { slidesPerView: 1 },
            },
          }),
          new ue(".guides__slider", {
            modules: [ge, fe],
            observer: !0,
            observeParents: !0,
            spaceBetween: 30,
            speed: 800,
            slidesPerView: 1,
            navigation: { nextEl: ".guides__next", prevEl: ".guides__prev" },
            pagination: { el: ".guides__pagination", clickable: !0 },
            breakpoints: {
              320: { slidesPerView: "auto", spaceBetween: 16 },
              769: { slidesPerView: 1 },
            },
          });
      }
    })();
  });
  let Se = !1;
  setTimeout(() => {
    if (Se) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  var Ce = function () {
    return (
      (Ce =
        Object.assign ||
        function (e) {
          for (var t, s = 1, i = arguments.length; s < i; s++)
            for (var n in (t = arguments[s]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        }),
      Ce.apply(this, arguments)
    );
  };
  var Te = "lgAfterAppendSlide",
    xe = "lgInit",
    Ee = "lgHasVideo",
    Le = "lgContainerResize",
    Ie = "lgUpdateSlides",
    Oe = "lgAfterAppendSubHtml",
    ke = "lgBeforeOpen",
    _e = "lgAfterOpen",
    Ae = "lgSlideItemLoad",
    $e = "lgBeforeSlide",
    Me = "lgAfterSlide",
    Pe = "lgPosterClick",
    De = "lgDragStart",
    Be = "lgDragMove",
    ze = "lgDragEnd",
    Ge = "lgBeforeNextSlide",
    Ve = "lgBeforePrevSlide",
    qe = "lgBeforeClose",
    He = "lgAfterClose",
    Fe = {
      mode: "lg-slide",
      easing: "ease",
      speed: 400,
      licenseKey: "0000-0000-000-0000",
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 300,
      container: "",
      startAnimationDuration: 400,
      zoomFromOrigin: !0,
      hideBarsDelay: 0,
      showBarsAfter: 1e4,
      slideDelay: 0,
      supportLegacyBrowser: !0,
      allowMediaOverlap: !1,
      videoMaxSize: "1280-720",
      loadYouTubePoster: !0,
      defaultCaptionHeight: 0,
      ariaLabelledby: "",
      ariaDescribedby: "",
      resetScrollPosition: !0,
      hideScrollbar: !1,
      closable: !0,
      swipeToClose: !0,
      closeOnTap: !0,
      showCloseIcon: !0,
      showMaximizeIcon: !1,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      trapFocus: !0,
      controls: !0,
      slideEndAnimation: !0,
      hideControlOnEnd: !1,
      mousewheel: !1,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 2,
      numberOfSlideItemsInDom: 10,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: 0,
      iframeWidth: "100%",
      iframeHeight: "100%",
      iframeMaxWidth: "100%",
      iframeMaxHeight: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      extraProps: [],
      exThumbImage: "",
      isMobile: void 0,
      mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
      plugins: [],
      strings: {
        closeGallery: "Close gallery",
        toggleMaximize: "Toggle maximize",
        previousSlide: "Previous slide",
        nextSlide: "Next slide",
        download: "Download",
        playVideo: "Play video",
      },
    };
  var je = (function () {
    function e(e) {
      return (
        (this.cssVenderPrefixes = [
          "TransitionDuration",
          "TransitionTimingFunction",
          "Transform",
          "Transition",
        ]),
        (this.selector = this._getSelector(e)),
        (this.firstElement = this._getFirstEl()),
        this
      );
    }
    return (
      (e.generateUUID = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (e) {
            var t = (16 * Math.random()) | 0;
            return ("x" == e ? t : (3 & t) | 8).toString(16);
          }
        );
      }),
      (e.prototype._getSelector = function (e, t) {
        return (
          void 0 === t && (t = document),
          "string" != typeof e
            ? e
            : ((t = t || document),
              "#" === e.substring(0, 1)
                ? t.querySelector(e)
                : t.querySelectorAll(e))
        );
      }),
      (e.prototype._each = function (e) {
        return this.selector
          ? (void 0 !== this.selector.length
              ? [].forEach.call(this.selector, e)
              : e(this.selector, 0),
            this)
          : this;
      }),
      (e.prototype._setCssVendorPrefix = function (e, t, s) {
        var i = t.replace(/-([a-z])/gi, function (e, t) {
          return t.toUpperCase();
        });
        -1 !== this.cssVenderPrefixes.indexOf(i)
          ? ((e.style[i.charAt(0).toLowerCase() + i.slice(1)] = s),
            (e.style["webkit" + i] = s),
            (e.style["moz" + i] = s),
            (e.style["ms" + i] = s),
            (e.style["o" + i] = s))
          : (e.style[i] = s);
      }),
      (e.prototype._getFirstEl = function () {
        return this.selector && void 0 !== this.selector.length
          ? this.selector[0]
          : this.selector;
      }),
      (e.prototype.isEventMatched = function (e, t) {
        var s = t.split(".");
        return e
          .split(".")
          .filter(function (e) {
            return e;
          })
          .every(function (e) {
            return -1 !== s.indexOf(e);
          });
      }),
      (e.prototype.attr = function (e, t) {
        return void 0 === t
          ? this.firstElement
            ? this.firstElement.getAttribute(e)
            : ""
          : (this._each(function (s) {
              s.setAttribute(e, t);
            }),
            this);
      }),
      (e.prototype.find = function (e) {
        return Ne(this._getSelector(e, this.selector));
      }),
      (e.prototype.first = function () {
        return this.selector && void 0 !== this.selector.length
          ? Ne(this.selector[0])
          : Ne(this.selector);
      }),
      (e.prototype.eq = function (e) {
        return Ne(this.selector[e]);
      }),
      (e.prototype.parent = function () {
        return Ne(this.selector.parentElement);
      }),
      (e.prototype.get = function () {
        return this._getFirstEl();
      }),
      (e.prototype.removeAttr = function (e) {
        var t = e.split(" ");
        return (
          this._each(function (e) {
            t.forEach(function (t) {
              return e.removeAttribute(t);
            });
          }),
          this
        );
      }),
      (e.prototype.wrap = function (e) {
        if (!this.firstElement) return this;
        var t = document.createElement("div");
        return (
          (t.className = e),
          this.firstElement.parentNode.insertBefore(t, this.firstElement),
          this.firstElement.parentNode.removeChild(this.firstElement),
          t.appendChild(this.firstElement),
          this
        );
      }),
      (e.prototype.addClass = function (e) {
        return (
          void 0 === e && (e = ""),
          this._each(function (t) {
            e.split(" ").forEach(function (e) {
              e && t.classList.add(e);
            });
          }),
          this
        );
      }),
      (e.prototype.removeClass = function (e) {
        return (
          this._each(function (t) {
            e.split(" ").forEach(function (e) {
              e && t.classList.remove(e);
            });
          }),
          this
        );
      }),
      (e.prototype.hasClass = function (e) {
        return !!this.firstElement && this.firstElement.classList.contains(e);
      }),
      (e.prototype.hasAttribute = function (e) {
        return !!this.firstElement && this.firstElement.hasAttribute(e);
      }),
      (e.prototype.toggleClass = function (e) {
        return this.firstElement
          ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this)
          : this;
      }),
      (e.prototype.css = function (e, t) {
        var s = this;
        return (
          this._each(function (i) {
            s._setCssVendorPrefix(i, e, t);
          }),
          this
        );
      }),
      (e.prototype.on = function (t, s) {
        var i = this;
        return this.selector
          ? (t.split(" ").forEach(function (t) {
              Array.isArray(e.eventListeners[t]) || (e.eventListeners[t] = []),
                e.eventListeners[t].push(s),
                i.selector.addEventListener(t.split(".")[0], s);
            }),
            this)
          : this;
      }),
      (e.prototype.once = function (e, t) {
        var s = this;
        return (
          this.on(e, function () {
            s.off(e), t(e);
          }),
          this
        );
      }),
      (e.prototype.off = function (t) {
        var s = this;
        return this.selector
          ? (Object.keys(e.eventListeners).forEach(function (i) {
              s.isEventMatched(t, i) &&
                (e.eventListeners[i].forEach(function (e) {
                  s.selector.removeEventListener(i.split(".")[0], e);
                }),
                (e.eventListeners[i] = []));
            }),
            this)
          : this;
      }),
      (e.prototype.trigger = function (e, t) {
        if (!this.firstElement) return this;
        var s = new CustomEvent(e.split(".")[0], { detail: t || null });
        return this.firstElement.dispatchEvent(s), this;
      }),
      (e.prototype.load = function (e) {
        var t = this;
        return (
          fetch(e)
            .then(function (e) {
              return e.text();
            })
            .then(function (e) {
              t.selector.innerHTML = e;
            }),
          this
        );
      }),
      (e.prototype.html = function (e) {
        return void 0 === e
          ? this.firstElement
            ? this.firstElement.innerHTML
            : ""
          : (this._each(function (t) {
              t.innerHTML = e;
            }),
            this);
      }),
      (e.prototype.append = function (e) {
        return (
          this._each(function (t) {
            "string" == typeof e
              ? t.insertAdjacentHTML("beforeend", e)
              : t.appendChild(e);
          }),
          this
        );
      }),
      (e.prototype.prepend = function (e) {
        return (
          this._each(function (t) {
            t.insertAdjacentHTML("afterbegin", e);
          }),
          this
        );
      }),
      (e.prototype.remove = function () {
        return (
          this._each(function (e) {
            e.parentNode.removeChild(e);
          }),
          this
        );
      }),
      (e.prototype.empty = function () {
        return (
          this._each(function (e) {
            e.innerHTML = "";
          }),
          this
        );
      }),
      (e.prototype.scrollTop = function (e) {
        return void 0 !== e
          ? ((document.body.scrollTop = e),
            (document.documentElement.scrollTop = e),
            this)
          : window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;
      }),
      (e.prototype.scrollLeft = function (e) {
        return void 0 !== e
          ? ((document.body.scrollLeft = e),
            (document.documentElement.scrollLeft = e),
            this)
          : window.pageXOffset ||
              document.documentElement.scrollLeft ||
              document.body.scrollLeft ||
              0;
      }),
      (e.prototype.offset = function () {
        if (!this.firstElement) return { left: 0, top: 0 };
        var e = this.firstElement.getBoundingClientRect(),
          t = Ne("body").style().marginLeft;
        return {
          left: e.left - parseFloat(t) + this.scrollLeft(),
          top: e.top + this.scrollTop(),
        };
      }),
      (e.prototype.style = function () {
        return this.firstElement
          ? this.firstElement.currentStyle ||
              window.getComputedStyle(this.firstElement)
          : {};
      }),
      (e.prototype.width = function () {
        var e = this.style();
        return (
          this.firstElement.clientWidth -
          parseFloat(e.paddingLeft) -
          parseFloat(e.paddingRight)
        );
      }),
      (e.prototype.height = function () {
        var e = this.style();
        return (
          this.firstElement.clientHeight -
          parseFloat(e.paddingTop) -
          parseFloat(e.paddingBottom)
        );
      }),
      (e.eventListeners = {}),
      e
    );
  })();
  function Ne(e) {
    return (
      (function () {
        if ("function" == typeof window.CustomEvent) return !1;
        window.CustomEvent = function (e, t) {
          t = t || { bubbles: !1, cancelable: !1, detail: null };
          var s = document.createEvent("CustomEvent");
          return s.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), s;
        };
      })(),
      Element.prototype.matches ||
        (Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector),
      new je(e)
    );
  }
  var We = [
    "src",
    "sources",
    "subHtml",
    "subHtmlUrl",
    "html",
    "video",
    "poster",
    "slideName",
    "responsive",
    "srcset",
    "sizes",
    "iframe",
    "downloadUrl",
    "download",
    "width",
    "facebookShareUrl",
    "tweetText",
    "iframeTitle",
    "twitterShareUrl",
    "pinterestShareUrl",
    "pinterestText",
    "fbHtml",
    "disqusIdentifier",
    "disqusUrl",
  ];
  function Xe(e) {
    return "href" === e
      ? "src"
      : (e = (e =
          (e = e.replace("data-", "")).charAt(0).toLowerCase() +
          e.slice(1)).replace(/-([a-z])/g, function (e) {
          return e[1].toUpperCase();
        }));
  }
  var Re = function (e, t, s, i) {
      void 0 === s && (s = 0);
      var n = Ne(e).attr("data-lg-size") || i;
      if (n) {
        var l = n.split(",");
        if (l[1])
          for (var o = window.innerWidth, a = 0; a < l.length; a++) {
            var r = l[a];
            if (parseInt(r.split("-")[2], 10) > o) {
              n = r;
              break;
            }
            a === l.length - 1 && (n = r);
          }
        var d = n.split("-"),
          c = parseInt(d[0], 10),
          h = parseInt(d[1], 10),
          u = t.width(),
          p = t.height() - s,
          g = Math.min(u, c),
          m = Math.min(p, h),
          f = Math.min(g / c, m / h);
        return { width: c * f, height: h * f };
      }
    },
    Ye = function (e, t, s, i, n) {
      if (n) {
        var l = Ne(e).find("img").first();
        if (l.get()) {
          var o = t.get().getBoundingClientRect(),
            a = o.width,
            r = t.height() - (s + i),
            d = l.width(),
            c = l.height(),
            h = l.style(),
            u =
              (a - d) / 2 -
              l.offset().left +
              (parseFloat(h.paddingLeft) || 0) +
              (parseFloat(h.borderLeft) || 0) +
              Ne(window).scrollLeft() +
              o.left,
            p =
              (r - c) / 2 -
              l.offset().top +
              (parseFloat(h.paddingTop) || 0) +
              (parseFloat(h.borderTop) || 0) +
              Ne(window).scrollTop() +
              s;
          return (
            "translate3d(" +
            (u *= -1) +
            "px, " +
            (p *= -1) +
            "px, 0) scale3d(" +
            d / n.width +
            ", " +
            c / n.height +
            ", 1)"
          );
        }
      }
    },
    Ue = function (e, t, s, i, n, l) {
      return (
        '<div class="lg-video-cont lg-has-iframe" style="width:' +
        e +
        "; max-width:" +
        s +
        "; height: " +
        t +
        "; max-height:" +
        i +
        '">\n                    <iframe class="lg-object" frameborder="0" ' +
        (l ? 'title="' + l + '"' : "") +
        ' src="' +
        n +
        '"  allowfullscreen="true"></iframe>\n                </div>'
      );
    },
    Ke = function (e, t, s, i, n, l) {
      var o =
          "<img " +
          s +
          " " +
          (i ? 'srcset="' + i + '"' : "") +
          "  " +
          (n ? 'sizes="' + n + '"' : "") +
          ' class="lg-object lg-image" data-index="' +
          e +
          '" src="' +
          t +
          '" />',
        a = "";
      l &&
        (a = ("string" == typeof l ? JSON.parse(l) : l).map(function (e) {
          var t = "";
          return (
            Object.keys(e).forEach(function (s) {
              t += " " + s + '="' + e[s] + '"';
            }),
            "<source " + t + "></source>"
          );
        }));
      return "" + a + o;
    },
    Ze = function (e) {
      for (var t = [], s = [], i = "", n = 0; n < e.length; n++) {
        var l = e[n].split(" ");
        "" === l[0] && l.splice(0, 1), s.push(l[0]), t.push(l[1]);
      }
      for (var o = window.innerWidth, a = 0; a < t.length; a++)
        if (parseInt(t[a], 10) > o) {
          i = s[a];
          break;
        }
      return i;
    },
    Qe = function (e) {
      return !!e && !!e.complete && 0 !== e.naturalWidth;
    },
    Je = function (e, t, s, i, n) {
      return (
        '<div class="lg-video-cont ' +
        (n && n.youtube
          ? "lg-has-youtube"
          : n && n.vimeo
          ? "lg-has-vimeo"
          : "lg-has-html5") +
        '" style="' +
        s +
        '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
        i +
        '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
        i +
        '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
        (t || "") +
        '\n            <img class="lg-object lg-video-poster" src="' +
        e +
        '" />\n        </div>'
      );
    },
    et = function (e) {
      var t = e.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
      );
      return [].filter.call(t, function (e) {
        var t = window.getComputedStyle(e);
        return "none" !== t.display && "hidden" !== t.visibility;
      });
    },
    tt = function (e, t, s, i) {
      var n = [],
        l = (function () {
          for (var e = 0, t = 0, s = arguments.length; t < s; t++)
            e += arguments[t].length;
          var i = Array(e),
            n = 0;
          for (t = 0; t < s; t++)
            for (var l = arguments[t], o = 0, a = l.length; o < a; o++, n++)
              i[n] = l[o];
          return i;
        })(We, t);
      return (
        [].forEach.call(e, function (e) {
          for (var t = {}, o = 0; o < e.attributes.length; o++) {
            var a = e.attributes[o];
            if (a.specified) {
              var r = Xe(a.name),
                d = "";
              l.indexOf(r) > -1 && (d = r), d && (t[d] = a.value);
            }
          }
          var c = Ne(e),
            h = c.find("img").first().attr("alt"),
            u = c.attr("title"),
            p = i ? c.attr(i) : c.find("img").first().attr("src");
          (t.thumb = p),
            s && !t.subHtml && (t.subHtml = u || h || ""),
            (t.alt = h || u || ""),
            n.push(t);
        }),
        n
      );
    },
    st = function () {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    it = function (e, t, s) {
      if (!e)
        return t
          ? { html5: !0 }
          : void console.error(
              "lightGallery :- data-src is not provided on slide item " +
                (s + 1) +
                ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
            );
      var i = e.match(
          /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
        ),
        n = e.match(
          /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
        ),
        l = e.match(
          /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
        );
      return i ? { youtube: i } : n ? { vimeo: n } : l ? { wistia: l } : void 0;
    },
    nt = 0,
    lt = (function () {
      function e(e, t) {
        if (
          ((this.lgOpened = !1),
          (this.index = 0),
          (this.plugins = []),
          (this.lGalleryOn = !1),
          (this.lgBusy = !1),
          (this.currentItemsInDom = []),
          (this.prevScrollTop = 0),
          (this.bodyPaddingRight = 0),
          (this.isDummyImageRemoved = !1),
          (this.dragOrSwipeEnabled = !1),
          (this.mediaContainerPosition = { top: 0, bottom: 0 }),
          !e)
        )
          return this;
        if (
          (nt++,
          (this.lgId = nt),
          (this.el = e),
          (this.LGel = Ne(e)),
          this.generateSettings(t),
          this.buildModules(),
          this.settings.dynamic &&
            void 0 !== this.settings.dynamicEl &&
            !Array.isArray(this.settings.dynamicEl))
        )
          throw "When using dynamic mode, you must also define dynamicEl as an Array.";
        return (
          (this.galleryItems = this.getItems()),
          this.normalizeSettings(),
          this.init(),
          this.validateLicense(),
          this
        );
      }
      return (
        (e.prototype.generateSettings = function (e) {
          if (
            ((this.settings = Ce(Ce({}, Fe), e)),
            this.settings.isMobile &&
            "function" == typeof this.settings.isMobile
              ? this.settings.isMobile()
              : st())
          ) {
            var t = Ce(
              Ce({}, this.settings.mobileSettings),
              this.settings.mobileSettings
            );
            this.settings = Ce(Ce({}, this.settings), t);
          }
        }),
        (e.prototype.normalizeSettings = function () {
          this.settings.slideEndAnimation &&
            (this.settings.hideControlOnEnd = !1),
            this.settings.closable || (this.settings.swipeToClose = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            this.settings.dynamic && (this.zoomFromOrigin = !1),
            this.settings.container ||
              (this.settings.container = document.body),
            (this.settings.preload = Math.min(
              this.settings.preload,
              this.galleryItems.length
            ));
        }),
        (e.prototype.init = function () {
          var e = this;
          this.addSlideVideoInfo(this.galleryItems),
            this.buildStructure(),
            this.LGel.trigger(xe, { instance: this }),
            this.settings.keyPress && this.keyPress(),
            setTimeout(function () {
              e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
            }, 50),
            this.arrow(),
            this.settings.mousewheel && this.mousewheel(),
            this.settings.dynamic || this.openGalleryOnItemClick();
        }),
        (e.prototype.openGalleryOnItemClick = function () {
          for (
            var e = this,
              t = function (t) {
                var i = s.items[t],
                  n = Ne(i),
                  l = je.generateUUID();
                n.attr("data-lg-id", l).on(
                  "click.lgcustom-item-" + l,
                  function (s) {
                    s.preventDefault();
                    var n = e.settings.index || t;
                    e.openGallery(n, i);
                  }
                );
              },
              s = this,
              i = 0;
            i < this.items.length;
            i++
          )
            t(i);
        }),
        (e.prototype.buildModules = function () {
          var e = this;
          this.settings.plugins.forEach(function (t) {
            e.plugins.push(new t(e, Ne));
          });
        }),
        (e.prototype.validateLicense = function () {
          this.settings.licenseKey
            ? "0000-0000-000-0000" === this.settings.licenseKey &&
              console.warn(
                "lightGallery: " +
                  this.settings.licenseKey +
                  " license key is not valid for production use"
              )
            : console.error("Please provide a valid license key");
        }),
        (e.prototype.getSlideItem = function (e) {
          return Ne(this.getSlideItemId(e));
        }),
        (e.prototype.getSlideItemId = function (e) {
          return "#lg-item-" + this.lgId + "-" + e;
        }),
        (e.prototype.getIdName = function (e) {
          return e + "-" + this.lgId;
        }),
        (e.prototype.getElementById = function (e) {
          return Ne("#" + this.getIdName(e));
        }),
        (e.prototype.manageSingleSlideClassName = function () {
          this.galleryItems.length < 2
            ? this.outer.addClass("lg-single-item")
            : this.outer.removeClass("lg-single-item");
        }),
        (e.prototype.buildStructure = function () {
          var e = this;
          if (!(this.$container && this.$container.get())) {
            var t = "",
              s = "";
            this.settings.controls &&
              (t =
                '<button type="button" id="' +
                this.getIdName("lg-prev") +
                '" aria-label="' +
                this.settings.strings.previousSlide +
                '" class="lg-prev lg-icon"> ' +
                this.settings.prevHtml +
                ' </button>\n                <button type="button" id="' +
                this.getIdName("lg-next") +
                '" aria-label="' +
                this.settings.strings.nextSlide +
                '" class="lg-next lg-icon"> ' +
                this.settings.nextHtml +
                " </button>"),
              ".lg-item" !== this.settings.appendSubHtmlTo &&
                (s =
                  '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
            var i = "";
            this.settings.allowMediaOverlap && (i += "lg-media-overlap ");
            var n = this.settings.ariaLabelledby
                ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                : "",
              l = this.settings.ariaDescribedby
                ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                : "",
              o =
                "lg-container " +
                this.settings.addClass +
                " " +
                (document.body !== this.settings.container ? "lg-inline" : ""),
              a =
                this.settings.closable && this.settings.showCloseIcon
                  ? '<button type="button" aria-label="' +
                    this.settings.strings.closeGallery +
                    '" id="' +
                    this.getIdName("lg-close") +
                    '" class="lg-close lg-icon"></button>'
                  : "",
              r = this.settings.showMaximizeIcon
                ? '<button type="button" aria-label="' +
                  this.settings.strings.toggleMaximize +
                  '" id="' +
                  this.getIdName("lg-maximize") +
                  '" class="lg-maximize lg-icon"></button>'
                : "",
              d =
                '\n        <div class="' +
                o +
                '" id="' +
                this.getIdName("lg-container") +
                '" tabindex="-1" aria-modal="true" ' +
                n +
                " " +
                l +
                ' role="dialog"\n        >\n            <div id="' +
                this.getIdName("lg-backdrop") +
                '" class="lg-backdrop"></div>\n\n            <div id="' +
                this.getIdName("lg-outer") +
                '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                i +
                ' ">\n\n              <div id="' +
                this.getIdName("lg-content") +
                '" class="lg-content">\n                <div id="' +
                this.getIdName("lg-inner") +
                '" class="lg-inner">\n                </div>\n                ' +
                t +
                '\n              </div>\n                <div id="' +
                this.getIdName("lg-toolbar") +
                '" class="lg-toolbar lg-group">\n                    ' +
                r +
                "\n                    " +
                a +
                "\n                    </div>\n                    " +
                (".lg-outer" === this.settings.appendSubHtmlTo ? s : "") +
                '\n                <div id="' +
                this.getIdName("lg-components") +
                '" class="lg-components">\n                    ' +
                (".lg-sub-html" === this.settings.appendSubHtmlTo ? s : "") +
                "\n                </div>\n            </div>\n        </div>\n        ";
            Ne(this.settings.container).append(d),
              document.body !== this.settings.container &&
                Ne(this.settings.container).css("position", "relative"),
              (this.outer = this.getElementById("lg-outer")),
              (this.$lgComponents = this.getElementById("lg-components")),
              (this.$backdrop = this.getElementById("lg-backdrop")),
              (this.$container = this.getElementById("lg-container")),
              (this.$inner = this.getElementById("lg-inner")),
              (this.$content = this.getElementById("lg-content")),
              (this.$toolbar = this.getElementById("lg-toolbar")),
              this.$backdrop.css(
                "transition-duration",
                this.settings.backdropDuration + "ms"
              );
            var c = this.settings.mode + " ";
            this.manageSingleSlideClassName(),
              this.settings.enableDrag && (c += "lg-grab "),
              this.outer.addClass(c),
              this.$inner.css(
                "transition-timing-function",
                this.settings.easing
              ),
              this.$inner.css(
                "transition-duration",
                this.settings.speed + "ms"
              ),
              this.settings.download &&
                this.$toolbar.append(
                  '<a id="' +
                    this.getIdName("lg-download") +
                    '" target="_blank" rel="noopener" aria-label="' +
                    this.settings.strings.download +
                    '" download class="lg-download lg-icon"></a>'
                ),
              this.counter(),
              Ne(window).on(
                "resize.lg.global" +
                  this.lgId +
                  " orientationchange.lg.global" +
                  this.lgId,
                function () {
                  e.refreshOnResize();
                }
              ),
              this.hideBars(),
              this.manageCloseGallery(),
              this.toggleMaximize(),
              this.initModules();
          }
        }),
        (e.prototype.refreshOnResize = function () {
          if (this.lgOpened) {
            var e = this.galleryItems[this.index].__slideVideoInfo;
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var t = this.mediaContainerPosition,
              s = t.top,
              i = t.bottom;
            if (
              ((this.currentImageSize = Re(
                this.items[this.index],
                this.outer,
                s + i,
                e && this.settings.videoMaxSize
              )),
              e && this.resizeVideoSlide(this.index, this.currentImageSize),
              this.zoomFromOrigin && !this.isDummyImageRemoved)
            ) {
              var n = this.getDummyImgStyles(this.currentImageSize);
              this.outer
                .find(".lg-current .lg-dummy-img")
                .first()
                .attr("style", n);
            }
            this.LGel.trigger(Le);
          }
        }),
        (e.prototype.resizeVideoSlide = function (e, t) {
          var s = this.getVideoContStyle(t);
          this.getSlideItem(e).find(".lg-video-cont").attr("style", s);
        }),
        (e.prototype.updateSlides = function (e, t) {
          if (
            (this.index > e.length - 1 && (this.index = e.length - 1),
            1 === e.length && (this.index = 0),
            e.length)
          ) {
            var s = this.galleryItems[t].src;
            (this.galleryItems = e),
              this.updateControls(),
              this.$inner.empty(),
              (this.currentItemsInDom = []);
            var i = 0;
            this.galleryItems.some(function (e, t) {
              return e.src === s && ((i = t), !0);
            }),
              (this.currentItemsInDom = this.organizeSlideItems(i, -1)),
              this.loadContent(i, !0),
              this.getSlideItem(i).addClass("lg-current"),
              (this.index = i),
              this.updateCurrentCounter(i),
              this.LGel.trigger(Ie);
          } else this.closeGallery();
        }),
        (e.prototype.getItems = function () {
          if (((this.items = []), this.settings.dynamic))
            return this.settings.dynamicEl || [];
          if ("this" === this.settings.selector) this.items.push(this.el);
          else if (this.settings.selector)
            if ("string" == typeof this.settings.selector)
              if (this.settings.selectWithin) {
                var e = Ne(this.settings.selectWithin);
                this.items = e.find(this.settings.selector).get();
              } else
                this.items = this.el.querySelectorAll(this.settings.selector);
            else this.items = this.settings.selector;
          else this.items = this.el.children;
          return tt(
            this.items,
            this.settings.extraProps,
            this.settings.getCaptionFromTitleOrAlt,
            this.settings.exThumbImage
          );
        }),
        (e.prototype.shouldHideScrollbar = function () {
          return (
            this.settings.hideScrollbar &&
            document.body === this.settings.container
          );
        }),
        (e.prototype.hideScrollbar = function () {
          if (this.shouldHideScrollbar()) {
            this.bodyPaddingRight = parseFloat(Ne("body").style().paddingRight);
            var e = document.documentElement.getBoundingClientRect(),
              t = window.innerWidth - e.width;
            Ne(document.body).css(
              "padding-right",
              t + this.bodyPaddingRight + "px"
            ),
              Ne(document.body).addClass("lg-overlay-open");
          }
        }),
        (e.prototype.resetScrollBar = function () {
          this.shouldHideScrollbar() &&
            (Ne(document.body).css(
              "padding-right",
              this.bodyPaddingRight + "px"
            ),
            Ne(document.body).removeClass("lg-overlay-open"));
        }),
        (e.prototype.openGallery = function (e, t) {
          var s = this;
          if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
            (this.lgOpened = !0),
              this.outer.removeClass("lg-hide-items"),
              this.hideScrollbar(),
              this.$container.addClass("lg-show");
            var i = this.getItemsToBeInsertedToDom(e, e);
            this.currentItemsInDom = i;
            var n = "";
            i.forEach(function (e) {
              n = n + '<div id="' + e + '" class="lg-item"></div>';
            }),
              this.$inner.append(n),
              this.addHtml(e);
            var l = "";
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var o = this.mediaContainerPosition,
              a = o.top,
              r = o.bottom;
            this.settings.allowMediaOverlap ||
              this.setMediaContainerPosition(a, r);
            var d = this.galleryItems[e].__slideVideoInfo;
            this.zoomFromOrigin &&
              t &&
              ((this.currentImageSize = Re(
                t,
                this.outer,
                a + r,
                d && this.settings.videoMaxSize
              )),
              (l = Ye(t, this.outer, a, r, this.currentImageSize))),
              (this.zoomFromOrigin && l) ||
                (this.outer.addClass(this.settings.startClass),
                this.getSlideItem(e).removeClass("lg-complete"));
            var c = this.settings.zoomFromOrigin
              ? 100
              : this.settings.backdropDuration;
            setTimeout(function () {
              s.outer.addClass("lg-components-open");
            }, c),
              (this.index = e),
              this.LGel.trigger(ke),
              this.getSlideItem(e).addClass("lg-current"),
              (this.lGalleryOn = !1),
              (this.prevScrollTop = Ne(window).scrollTop()),
              setTimeout(function () {
                if (s.zoomFromOrigin && l) {
                  var t = s.getSlideItem(e);
                  t.css("transform", l),
                    setTimeout(function () {
                      t
                        .addClass("lg-start-progress lg-start-end-progress")
                        .css(
                          "transition-duration",
                          s.settings.startAnimationDuration + "ms"
                        ),
                        s.outer.addClass("lg-zoom-from-image");
                    }),
                    setTimeout(function () {
                      t.css("transform", "translate3d(0, 0, 0)");
                    }, 100);
                }
                setTimeout(function () {
                  s.$backdrop.addClass("in"),
                    s.$container.addClass("lg-show-in");
                }, 10),
                  setTimeout(function () {
                    s.settings.trapFocus &&
                      document.body === s.settings.container &&
                      s.trapFocus();
                  }, s.settings.backdropDuration + 50),
                  (s.zoomFromOrigin && l) ||
                    setTimeout(function () {
                      s.outer.addClass("lg-visible");
                    }, s.settings.backdropDuration),
                  s.slide(e, !1, !1, !1),
                  s.LGel.trigger(_e);
              }),
              document.body === this.settings.container &&
                Ne("html").addClass("lg-on");
          }
        }),
        (e.prototype.getMediaContainerPosition = function () {
          if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
          var e = this.$toolbar.get().clientHeight || 0,
            t = this.outer.find(".lg-components .lg-sub-html").get(),
            s =
              this.settings.defaultCaptionHeight || (t && t.clientHeight) || 0,
            i = this.outer.find(".lg-thumb-outer").get();
          return { top: e, bottom: (i ? i.clientHeight : 0) + s };
        }),
        (e.prototype.setMediaContainerPosition = function (e, t) {
          void 0 === e && (e = 0),
            void 0 === t && (t = 0),
            this.$content.css("top", e + "px").css("bottom", t + "px");
        }),
        (e.prototype.hideBars = function () {
          var e = this;
          setTimeout(function () {
            e.outer.removeClass("lg-hide-items"),
              e.settings.hideBarsDelay > 0 &&
                (e.outer.on("mousemove.lg click.lg touchstart.lg", function () {
                  e.outer.removeClass("lg-hide-items"),
                    clearTimeout(e.hideBarTimeout),
                    (e.hideBarTimeout = setTimeout(function () {
                      e.outer.addClass("lg-hide-items");
                    }, e.settings.hideBarsDelay));
                }),
                e.outer.trigger("mousemove.lg"));
          }, this.settings.showBarsAfter);
        }),
        (e.prototype.initPictureFill = function (e) {
          if (this.settings.supportLegacyBrowser)
            try {
              picturefill({ elements: [e.get()] });
            } catch (e) {
              console.warn(
                "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
              );
            }
        }),
        (e.prototype.counter = function () {
          if (this.settings.counter) {
            var e =
              '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
              this.getIdName("lg-counter-current") +
              '" class="lg-counter-current">' +
              (this.index + 1) +
              ' </span> /\n                <span id="' +
              this.getIdName("lg-counter-all") +
              '" class="lg-counter-all">' +
              this.galleryItems.length +
              " </span></div>";
            this.outer.find(this.settings.appendCounterTo).append(e);
          }
        }),
        (e.prototype.addHtml = function (e) {
          var t, s;
          if (
            (this.galleryItems[e].subHtmlUrl
              ? (s = this.galleryItems[e].subHtmlUrl)
              : (t = this.galleryItems[e].subHtml),
            !s)
          )
            if (t) {
              var i = t.substring(0, 1);
              ("." !== i && "#" !== i) ||
                (t =
                  this.settings.subHtmlSelectorRelative &&
                  !this.settings.dynamic
                    ? Ne(this.items).eq(e).find(t).first().html()
                    : Ne(t).first().html());
            } else t = "";
          if (".lg-item" !== this.settings.appendSubHtmlTo)
            s
              ? this.outer.find(".lg-sub-html").load(s)
              : this.outer.find(".lg-sub-html").html(t);
          else {
            var n = Ne(this.getSlideItemId(e));
            s
              ? n.load(s)
              : n.append('<div class="lg-sub-html">' + t + "</div>");
          }
          null != t &&
            ("" === t
              ? this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
            this.LGel.trigger(Oe, { index: e });
        }),
        (e.prototype.preload = function (e) {
          for (
            var t = 1;
            t <= this.settings.preload && !(t >= this.galleryItems.length - e);
            t++
          )
            this.loadContent(e + t, !1);
          for (var s = 1; s <= this.settings.preload && !(e - s < 0); s++)
            this.loadContent(e - s, !1);
        }),
        (e.prototype.getDummyImgStyles = function (e) {
          return e
            ? "width:" +
                e.width +
                "px;\n                margin-left: -" +
                e.width / 2 +
                "px;\n                margin-top: -" +
                e.height / 2 +
                "px;\n                height:" +
                e.height +
                "px"
            : "";
        }),
        (e.prototype.getVideoContStyle = function (e) {
          return e
            ? "width:" +
                e.width +
                "px;\n                height:" +
                e.height +
                "px"
            : "";
        }),
        (e.prototype.getDummyImageContent = function (e, t, s) {
          var i;
          if ((this.settings.dynamic || (i = Ne(this.items).eq(t)), i)) {
            var n = void 0;
            if (
              !(n = this.settings.exThumbImage
                ? i.attr(this.settings.exThumbImage)
                : i.find("img").first().attr("src"))
            )
              return "";
            var l =
              "<img " +
              s +
              ' style="' +
              this.getDummyImgStyles(this.currentImageSize) +
              '" class="lg-dummy-img" src="' +
              n +
              '" />';
            return (
              e.addClass("lg-first-slide"),
              this.outer.addClass("lg-first-slide-loading"),
              l
            );
          }
          return "";
        }),
        (e.prototype.setImgMarkup = function (e, t, s) {
          var i = this.galleryItems[s],
            n = i.alt,
            l = i.srcset,
            o = i.sizes,
            a = i.sources,
            r = n ? 'alt="' + n + '"' : "",
            d =
              '<picture class="lg-img-wrap"> ' +
              (this.isFirstSlideWithZoomAnimation()
                ? this.getDummyImageContent(t, s, r)
                : Ke(s, e, r, l, o, a)) +
              "</picture>";
          t.prepend(d);
        }),
        (e.prototype.onSlideObjectLoad = function (e, t, s, i) {
          var n = e.find(".lg-object").first();
          Qe(n.get()) || t
            ? s()
            : (n.on("load.lg error.lg", function () {
                s && s();
              }),
              n.on("error.lg", function () {
                i && i();
              }));
        }),
        (e.prototype.onLgObjectLoad = function (e, t, s, i, n, l) {
          var o = this;
          this.onSlideObjectLoad(
            e,
            l,
            function () {
              o.triggerSlideItemLoad(e, t, s, i, n);
            },
            function () {
              e.addClass("lg-complete lg-complete_"),
                e.html(
                  '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                );
            }
          );
        }),
        (e.prototype.triggerSlideItemLoad = function (e, t, s, i, n) {
          var l = this,
            o = this.galleryItems[t],
            a = n && "video" === this.getSlideType(o) && !o.poster ? i : 0;
          setTimeout(function () {
            e.addClass("lg-complete lg-complete_"),
              l.LGel.trigger(Ae, { index: t, delay: s || 0, isFirstSlide: n });
          }, a);
        }),
        (e.prototype.isFirstSlideWithZoomAnimation = function () {
          return !(
            this.lGalleryOn ||
            !this.zoomFromOrigin ||
            !this.currentImageSize
          );
        }),
        (e.prototype.addSlideVideoInfo = function (e) {
          var t = this;
          e.forEach(function (e, s) {
            (e.__slideVideoInfo = it(e.src, !!e.video, s)),
              e.__slideVideoInfo &&
                t.settings.loadYouTubePoster &&
                !e.poster &&
                e.__slideVideoInfo.youtube &&
                (e.poster =
                  "//img.youtube.com/vi/" +
                  e.__slideVideoInfo.youtube[1] +
                  "/maxresdefault.jpg");
          });
        }),
        (e.prototype.loadContent = function (e, t) {
          var s = this,
            i = this.galleryItems[e],
            n = Ne(this.getSlideItemId(e)),
            l = i.poster,
            o = i.srcset,
            a = i.sizes,
            r = i.sources,
            d = i.src,
            c = i.video,
            h = c && "string" == typeof c ? JSON.parse(c) : c;
          if (i.responsive) {
            var u = i.responsive.split(",");
            d = Ze(u) || d;
          }
          var p = i.__slideVideoInfo,
            g = "",
            m = !!i.iframe,
            f = !this.lGalleryOn,
            v = 0;
          if (
            (f &&
              (v =
                this.zoomFromOrigin && this.currentImageSize
                  ? this.settings.startAnimationDuration + 10
                  : this.settings.backdropDuration + 10),
            !n.hasClass("lg-loaded"))
          ) {
            if (p) {
              var b = this.mediaContainerPosition,
                y = b.top,
                w = b.bottom,
                S = Re(
                  this.items[e],
                  this.outer,
                  y + w,
                  p && this.settings.videoMaxSize
                );
              g = this.getVideoContStyle(S);
            }
            if (m) {
              var C = Ue(
                this.settings.iframeWidth,
                this.settings.iframeHeight,
                this.settings.iframeMaxWidth,
                this.settings.iframeMaxHeight,
                d,
                i.iframeTitle
              );
              n.prepend(C);
            } else if (l) {
              var T = "";
              f &&
                this.zoomFromOrigin &&
                this.currentImageSize &&
                (T = this.getDummyImageContent(n, e, ""));
              C = Je(l, T || "", g, this.settings.strings.playVideo, p);
              n.prepend(C);
            } else if (p) {
              C = '<div class="lg-video-cont " style="' + g + '"></div>';
              n.prepend(C);
            } else if ((this.setImgMarkup(d, n, e), o || r)) {
              var x = n.find(".lg-object");
              this.initPictureFill(x);
            }
            (l || p) &&
              this.LGel.trigger(Ee, {
                index: e,
                src: d,
                html5Video: h,
                hasPoster: !!l,
              }),
              this.LGel.trigger(Te, { index: e }),
              this.lGalleryOn &&
                ".lg-item" === this.settings.appendSubHtmlTo &&
                this.addHtml(e);
          }
          var E = 0;
          v && !Ne(document.body).hasClass("lg-from-hash") && (E = v),
            this.isFirstSlideWithZoomAnimation() &&
              (setTimeout(function () {
                n.removeClass(
                  "lg-start-end-progress lg-start-progress"
                ).removeAttr("style");
              }, this.settings.startAnimationDuration + 100),
              n.hasClass("lg-loaded") ||
                setTimeout(function () {
                  if ("image" === s.getSlideType(i)) {
                    var t = i.alt,
                      c = t ? 'alt="' + t + '"' : "";
                    if (
                      (n
                        .find(".lg-img-wrap")
                        .append(Ke(e, d, c, o, a, i.sources)),
                      o || r)
                    ) {
                      var h = n.find(".lg-object");
                      s.initPictureFill(h);
                    }
                  }
                  ("image" === s.getSlideType(i) ||
                    ("video" === s.getSlideType(i) && l)) &&
                    (s.onLgObjectLoad(n, e, v, E, !0, !1),
                    s.onSlideObjectLoad(
                      n,
                      !(!p || !p.html5 || l),
                      function () {
                        s.loadContentOnFirstSlideLoad(e, n, E);
                      },
                      function () {
                        s.loadContentOnFirstSlideLoad(e, n, E);
                      }
                    ));
                }, this.settings.startAnimationDuration + 100)),
            n.addClass("lg-loaded"),
            (this.isFirstSlideWithZoomAnimation() &&
              ("video" !== this.getSlideType(i) || l)) ||
              this.onLgObjectLoad(n, e, v, E, f, !(!p || !p.html5 || l)),
            (this.zoomFromOrigin && this.currentImageSize) ||
              !n.hasClass("lg-complete_") ||
              this.lGalleryOn ||
              setTimeout(function () {
                n.addClass("lg-complete");
              }, this.settings.backdropDuration),
            (this.lGalleryOn = !0),
            !0 === t &&
              (n.hasClass("lg-complete_")
                ? this.preload(e)
                : n
                    .find(".lg-object")
                    .first()
                    .on("load.lg error.lg", function () {
                      s.preload(e);
                    }));
        }),
        (e.prototype.loadContentOnFirstSlideLoad = function (e, t, s) {
          var i = this;
          setTimeout(function () {
            t.find(".lg-dummy-img").remove(),
              t.removeClass("lg-first-slide"),
              i.outer.removeClass("lg-first-slide-loading"),
              (i.isDummyImageRemoved = !0),
              i.preload(e);
          }, s + 300);
        }),
        (e.prototype.getItemsToBeInsertedToDom = function (e, t, s) {
          var i = this;
          void 0 === s && (s = 0);
          var n = [],
            l = Math.max(s, 3);
          l = Math.min(l, this.galleryItems.length);
          var o = "lg-item-" + this.lgId + "-" + t;
          if (this.galleryItems.length <= 3)
            return (
              this.galleryItems.forEach(function (e, t) {
                n.push("lg-item-" + i.lgId + "-" + t);
              }),
              n
            );
          if (e < (this.galleryItems.length - 1) / 2) {
            for (var a = e; a > e - l / 2 && a >= 0; a--)
              n.push("lg-item-" + this.lgId + "-" + a);
            var r = n.length;
            for (a = 0; a < l - r; a++)
              n.push("lg-item-" + this.lgId + "-" + (e + a + 1));
          } else {
            for (a = e; a <= this.galleryItems.length - 1 && a < e + l / 2; a++)
              n.push("lg-item-" + this.lgId + "-" + a);
            for (r = n.length, a = 0; a < l - r; a++)
              n.push("lg-item-" + this.lgId + "-" + (e - a - 1));
          }
          return (
            this.settings.loop &&
              (e === this.galleryItems.length - 1
                ? n.push("lg-item-" + this.lgId + "-0")
                : 0 === e &&
                  n.push(
                    "lg-item-" +
                      this.lgId +
                      "-" +
                      (this.galleryItems.length - 1)
                  )),
            -1 === n.indexOf(o) && n.push("lg-item-" + this.lgId + "-" + t),
            n
          );
        }),
        (e.prototype.organizeSlideItems = function (e, t) {
          var s = this,
            i = this.getItemsToBeInsertedToDom(
              e,
              t,
              this.settings.numberOfSlideItemsInDom
            );
          return (
            i.forEach(function (e) {
              -1 === s.currentItemsInDom.indexOf(e) &&
                s.$inner.append('<div id="' + e + '" class="lg-item"></div>');
            }),
            this.currentItemsInDom.forEach(function (e) {
              -1 === i.indexOf(e) && Ne("#" + e).remove();
            }),
            i
          );
        }),
        (e.prototype.getPreviousSlideIndex = function () {
          var e = 0;
          try {
            var t = this.outer.find(".lg-current").first().attr("id");
            e = parseInt(t.split("-")[3]) || 0;
          } catch (t) {
            e = 0;
          }
          return e;
        }),
        (e.prototype.setDownloadValue = function (e) {
          if (this.settings.download) {
            var t = this.galleryItems[e];
            if (!1 === t.downloadUrl || "false" === t.downloadUrl)
              this.outer.addClass("lg-hide-download");
            else {
              var s = this.getElementById("lg-download");
              this.outer.removeClass("lg-hide-download"),
                s.attr("href", t.downloadUrl || t.src),
                t.download && s.attr("download", t.download);
            }
          }
        }),
        (e.prototype.makeSlideAnimation = function (e, t, s) {
          var i = this;
          this.lGalleryOn && s.addClass("lg-slide-progress"),
            setTimeout(
              function () {
                i.outer.addClass("lg-no-trans"),
                  i.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-next-slide"),
                  "prev" === e
                    ? (t.addClass("lg-prev-slide"), s.addClass("lg-next-slide"))
                    : (t.addClass("lg-next-slide"),
                      s.addClass("lg-prev-slide")),
                  setTimeout(function () {
                    i.outer.find(".lg-item").removeClass("lg-current"),
                      t.addClass("lg-current"),
                      i.outer.removeClass("lg-no-trans");
                  }, 50);
              },
              this.lGalleryOn ? this.settings.slideDelay : 0
            );
        }),
        (e.prototype.slide = function (e, t, s, i) {
          var n = this,
            l = this.getPreviousSlideIndex();
          if (
            ((this.currentItemsInDom = this.organizeSlideItems(e, l)),
            !this.lGalleryOn || l !== e)
          ) {
            var o = this.galleryItems.length;
            if (!this.lgBusy) {
              this.settings.counter && this.updateCurrentCounter(e);
              var a = this.getSlideItem(e),
                r = this.getSlideItem(l),
                d = this.galleryItems[e],
                c = d.__slideVideoInfo;
              if (
                (this.outer.attr("data-lg-slide-type", this.getSlideType(d)),
                this.setDownloadValue(e),
                c)
              ) {
                var h = this.mediaContainerPosition,
                  u = h.top,
                  p = h.bottom,
                  g = Re(
                    this.items[e],
                    this.outer,
                    u + p,
                    c && this.settings.videoMaxSize
                  );
                this.resizeVideoSlide(e, g);
              }
              if (
                (this.LGel.trigger($e, {
                  prevIndex: l,
                  index: e,
                  fromTouch: !!t,
                  fromThumb: !!s,
                }),
                (this.lgBusy = !0),
                clearTimeout(this.hideBarTimeout),
                this.arrowDisable(e),
                i || (e < l ? (i = "prev") : e > l && (i = "next")),
                t)
              ) {
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-prev-slide lg-current lg-next-slide");
                var m = void 0,
                  f = void 0;
                o > 2
                  ? ((m = e - 1),
                    (f = e + 1),
                    ((0 === e && l === o - 1) || (e === o - 1 && 0 === l)) &&
                      ((f = 0), (m = o - 1)))
                  : ((m = 0), (f = 1)),
                  "prev" === i
                    ? this.getSlideItem(f).addClass("lg-next-slide")
                    : this.getSlideItem(m).addClass("lg-prev-slide"),
                  a.addClass("lg-current");
              } else this.makeSlideAnimation(i, a, r);
              this.lGalleryOn
                ? setTimeout(function () {
                    n.loadContent(e, !0),
                      ".lg-item" !== n.settings.appendSubHtmlTo && n.addHtml(e);
                  }, this.settings.speed +
                    50 +
                    (t ? 0 : this.settings.slideDelay))
                : this.loadContent(e, !0),
                setTimeout(function () {
                  (n.lgBusy = !1),
                    r.removeClass("lg-slide-progress"),
                    n.LGel.trigger(Me, {
                      prevIndex: l,
                      index: e,
                      fromTouch: t,
                      fromThumb: s,
                    });
                }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                  (t ? 0 : this.settings.slideDelay));
            }
            this.index = e;
          }
        }),
        (e.prototype.updateCurrentCounter = function (e) {
          this.getElementById("lg-counter-current").html(e + 1 + "");
        }),
        (e.prototype.updateCounterTotal = function () {
          this.getElementById("lg-counter-all").html(
            this.galleryItems.length + ""
          );
        }),
        (e.prototype.getSlideType = function (e) {
          return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
        }),
        (e.prototype.touchMove = function (e, t, s) {
          var i = t.pageX - e.pageX,
            n = t.pageY - e.pageY,
            l = !1;
          if (
            (this.swipeDirection
              ? (l = !0)
              : Math.abs(i) > 15
              ? ((this.swipeDirection = "horizontal"), (l = !0))
              : Math.abs(n) > 15 &&
                ((this.swipeDirection = "vertical"), (l = !0)),
            l)
          ) {
            var o = this.getSlideItem(this.index);
            if ("horizontal" === this.swipeDirection) {
              null == s || s.preventDefault(),
                this.outer.addClass("lg-dragging"),
                this.setTranslate(o, i, 0);
              var a = o.get().offsetWidth,
                r = (15 * a) / 100 - Math.abs((10 * i) / 100);
              this.setTranslate(
                this.outer.find(".lg-prev-slide").first(),
                -a + i - r,
                0
              ),
                this.setTranslate(
                  this.outer.find(".lg-next-slide").first(),
                  a + i + r,
                  0
                );
            } else if (
              "vertical" === this.swipeDirection &&
              this.settings.swipeToClose
            ) {
              null == s || s.preventDefault(),
                this.$container.addClass("lg-dragging-vertical");
              var d = 1 - Math.abs(n) / window.innerHeight;
              this.$backdrop.css("opacity", d);
              var c = 1 - Math.abs(n) / (2 * window.innerWidth);
              this.setTranslate(o, 0, n, c, c),
                Math.abs(n) > 100 &&
                  this.outer
                    .addClass("lg-hide-items")
                    .removeClass("lg-components-open");
            }
          }
        }),
        (e.prototype.touchEnd = function (e, t, s) {
          var i,
            n = this;
          "lg-slide" !== this.settings.mode && this.outer.addClass("lg-slide"),
            setTimeout(function () {
              n.$container.removeClass("lg-dragging-vertical"),
                n.outer
                  .removeClass("lg-dragging lg-hide-items")
                  .addClass("lg-components-open");
              var l = !0;
              if ("horizontal" === n.swipeDirection) {
                i = e.pageX - t.pageX;
                var o = Math.abs(e.pageX - t.pageX);
                i < 0 && o > n.settings.swipeThreshold
                  ? (n.goToNextSlide(!0), (l = !1))
                  : i > 0 &&
                    o > n.settings.swipeThreshold &&
                    (n.goToPrevSlide(!0), (l = !1));
              } else if ("vertical" === n.swipeDirection) {
                if (
                  ((i = Math.abs(e.pageY - t.pageY)),
                  n.settings.closable && n.settings.swipeToClose && i > 100)
                )
                  return void n.closeGallery();
                n.$backdrop.css("opacity", 1);
              }
              if (
                (n.outer.find(".lg-item").removeAttr("style"),
                l && Math.abs(e.pageX - t.pageX) < 5)
              ) {
                var a = Ne(s.target);
                n.isPosterElement(a) && n.LGel.trigger(Pe);
              }
              n.swipeDirection = void 0;
            }),
            setTimeout(function () {
              n.outer.hasClass("lg-dragging") ||
                "lg-slide" === n.settings.mode ||
                n.outer.removeClass("lg-slide");
            }, this.settings.speed + 100);
        }),
        (e.prototype.enableSwipe = function () {
          var e = this,
            t = {},
            s = {},
            i = !1,
            n = !1;
          this.settings.enableSwipe &&
            (this.$inner.on("touchstart.lg", function (s) {
              e.dragOrSwipeEnabled = !0;
              var i = e.getSlideItem(e.index);
              (!Ne(s.target).hasClass("lg-item") &&
                !i.get().contains(s.target)) ||
                e.outer.hasClass("lg-zoomed") ||
                e.lgBusy ||
                1 !== s.touches.length ||
                ((n = !0),
                (e.touchAction = "swipe"),
                e.manageSwipeClass(),
                (t = { pageX: s.touches[0].pageX, pageY: s.touches[0].pageY }));
            }),
            this.$inner.on("touchmove.lg", function (l) {
              n &&
                "swipe" === e.touchAction &&
                1 === l.touches.length &&
                ((s = { pageX: l.touches[0].pageX, pageY: l.touches[0].pageY }),
                e.touchMove(t, s, l),
                (i = !0));
            }),
            this.$inner.on("touchend.lg", function (l) {
              if ("swipe" === e.touchAction) {
                if (i) (i = !1), e.touchEnd(s, t, l);
                else if (n) {
                  var o = Ne(l.target);
                  e.isPosterElement(o) && e.LGel.trigger(Pe);
                }
                (e.touchAction = void 0), (n = !1);
              }
            }));
        }),
        (e.prototype.enableDrag = function () {
          var e = this,
            t = {},
            s = {},
            i = !1,
            n = !1;
          this.settings.enableDrag &&
            (this.outer.on("mousedown.lg", function (s) {
              e.dragOrSwipeEnabled = !0;
              var n = e.getSlideItem(e.index);
              (Ne(s.target).hasClass("lg-item") ||
                n.get().contains(s.target)) &&
                (e.outer.hasClass("lg-zoomed") ||
                  e.lgBusy ||
                  (s.preventDefault(),
                  e.lgBusy ||
                    (e.manageSwipeClass(),
                    (t = { pageX: s.pageX, pageY: s.pageY }),
                    (i = !0),
                    (e.outer.get().scrollLeft += 1),
                    (e.outer.get().scrollLeft -= 1),
                    e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                    e.LGel.trigger(De))));
            }),
            Ne(window).on("mousemove.lg.global" + this.lgId, function (l) {
              i &&
                e.lgOpened &&
                ((n = !0),
                (s = { pageX: l.pageX, pageY: l.pageY }),
                e.touchMove(t, s),
                e.LGel.trigger(Be));
            }),
            Ne(window).on("mouseup.lg.global" + this.lgId, function (l) {
              if (e.lgOpened) {
                var o = Ne(l.target);
                n
                  ? ((n = !1), e.touchEnd(s, t, l), e.LGel.trigger(ze))
                  : e.isPosterElement(o) && e.LGel.trigger(Pe),
                  i &&
                    ((i = !1),
                    e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
              }
            }));
        }),
        (e.prototype.triggerPosterClick = function () {
          var e = this;
          this.$inner.on("click.lg", function (t) {
            !e.dragOrSwipeEnabled &&
              e.isPosterElement(Ne(t.target)) &&
              e.LGel.trigger(Pe);
          });
        }),
        (e.prototype.manageSwipeClass = function () {
          var e = this.index + 1,
            t = this.index - 1;
          this.settings.loop &&
            this.galleryItems.length > 2 &&
            (0 === this.index
              ? (t = this.galleryItems.length - 1)
              : this.index === this.galleryItems.length - 1 && (e = 0)),
            this.outer
              .find(".lg-item")
              .removeClass("lg-next-slide lg-prev-slide"),
            t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
            this.getSlideItem(e).addClass("lg-next-slide");
        }),
        (e.prototype.goToNextSlide = function (e) {
          var t = this,
            s = this.settings.loop;
          e && this.galleryItems.length < 3 && (s = !1),
            this.lgBusy ||
              (this.index + 1 < this.galleryItems.length
                ? (this.index++,
                  this.LGel.trigger(Ge, { index: this.index }),
                  this.slide(this.index, !!e, !1, "next"))
                : s
                ? ((this.index = 0),
                  this.LGel.trigger(Ge, { index: this.index }),
                  this.slide(this.index, !!e, !1, "next"))
                : this.settings.slideEndAnimation &&
                  !e &&
                  (this.outer.addClass("lg-right-end"),
                  setTimeout(function () {
                    t.outer.removeClass("lg-right-end");
                  }, 400)));
        }),
        (e.prototype.goToPrevSlide = function (e) {
          var t = this,
            s = this.settings.loop;
          e && this.galleryItems.length < 3 && (s = !1),
            this.lgBusy ||
              (this.index > 0
                ? (this.index--,
                  this.LGel.trigger(Ve, { index: this.index, fromTouch: e }),
                  this.slide(this.index, !!e, !1, "prev"))
                : s
                ? ((this.index = this.galleryItems.length - 1),
                  this.LGel.trigger(Ve, { index: this.index, fromTouch: e }),
                  this.slide(this.index, !!e, !1, "prev"))
                : this.settings.slideEndAnimation &&
                  !e &&
                  (this.outer.addClass("lg-left-end"),
                  setTimeout(function () {
                    t.outer.removeClass("lg-left-end");
                  }, 400)));
        }),
        (e.prototype.keyPress = function () {
          var e = this;
          Ne(window).on("keydown.lg.global" + this.lgId, function (t) {
            e.lgOpened &&
              !0 === e.settings.escKey &&
              27 === t.keyCode &&
              (t.preventDefault(),
              e.settings.allowMediaOverlap &&
              e.outer.hasClass("lg-can-toggle") &&
              e.outer.hasClass("lg-components-open")
                ? e.outer.removeClass("lg-components-open")
                : e.closeGallery()),
              e.lgOpened &&
                e.galleryItems.length > 1 &&
                (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()),
                39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
          });
        }),
        (e.prototype.arrow = function () {
          var e = this;
          this.getElementById("lg-prev").on("click.lg", function () {
            e.goToPrevSlide();
          }),
            this.getElementById("lg-next").on("click.lg", function () {
              e.goToNextSlide();
            });
        }),
        (e.prototype.arrowDisable = function (e) {
          if (!this.settings.loop && this.settings.hideControlOnEnd) {
            var t = this.getElementById("lg-prev"),
              s = this.getElementById("lg-next");
            e + 1 === this.galleryItems.length
              ? s.attr("disabled", "disabled").addClass("disabled")
              : s.removeAttr("disabled").removeClass("disabled"),
              0 === e
                ? t.attr("disabled", "disabled").addClass("disabled")
                : t.removeAttr("disabled").removeClass("disabled");
          }
        }),
        (e.prototype.setTranslate = function (e, t, s, i, n) {
          void 0 === i && (i = 1),
            void 0 === n && (n = 1),
            e.css(
              "transform",
              "translate3d(" +
                t +
                "px, " +
                s +
                "px, 0px) scale3d(" +
                i +
                ", " +
                n +
                ", 1)"
            );
        }),
        (e.prototype.mousewheel = function () {
          var e = this,
            t = 0;
          this.outer.on("wheel.lg", function (s) {
            if (s.deltaY && !(e.galleryItems.length < 2)) {
              s.preventDefault();
              var i = new Date().getTime();
              i - t < 1e3 ||
                ((t = i),
                s.deltaY > 0
                  ? e.goToNextSlide()
                  : s.deltaY < 0 && e.goToPrevSlide());
            }
          });
        }),
        (e.prototype.isSlideElement = function (e) {
          return (
            e.hasClass("lg-outer") ||
            e.hasClass("lg-item") ||
            e.hasClass("lg-img-wrap")
          );
        }),
        (e.prototype.isPosterElement = function (e) {
          var t = this.getSlideItem(this.index)
            .find(".lg-video-play-button")
            .get();
          return (
            e.hasClass("lg-video-poster") ||
            e.hasClass("lg-video-play-button") ||
            (t && t.contains(e.get()))
          );
        }),
        (e.prototype.toggleMaximize = function () {
          var e = this;
          this.getElementById("lg-maximize").on("click.lg", function () {
            e.$container.toggleClass("lg-inline"), e.refreshOnResize();
          });
        }),
        (e.prototype.invalidateItems = function () {
          for (var e = 0; e < this.items.length; e++) {
            var t = Ne(this.items[e]);
            t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
          }
        }),
        (e.prototype.trapFocus = function () {
          var e = this;
          this.$container.get().focus({ preventScroll: !0 }),
            Ne(window).on("keydown.lg.global" + this.lgId, function (t) {
              if (e.lgOpened && ("Tab" === t.key || 9 === t.keyCode)) {
                var s = et(e.$container.get()),
                  i = s[0],
                  n = s[s.length - 1];
                t.shiftKey
                  ? document.activeElement === i &&
                    (n.focus(), t.preventDefault())
                  : document.activeElement === n &&
                    (i.focus(), t.preventDefault());
              }
            });
        }),
        (e.prototype.manageCloseGallery = function () {
          var e = this;
          if (this.settings.closable) {
            var t = !1;
            this.getElementById("lg-close").on("click.lg", function () {
              e.closeGallery();
            }),
              this.settings.closeOnTap &&
                (this.outer.on("mousedown.lg", function (s) {
                  var i = Ne(s.target);
                  t = !!e.isSlideElement(i);
                }),
                this.outer.on("mousemove.lg", function () {
                  t = !1;
                }),
                this.outer.on("mouseup.lg", function (s) {
                  var i = Ne(s.target);
                  e.isSlideElement(i) &&
                    t &&
                    (e.outer.hasClass("lg-dragging") || e.closeGallery());
                }));
          }
        }),
        (e.prototype.closeGallery = function (e) {
          var t = this;
          if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
          this.LGel.trigger(qe),
            this.settings.resetScrollPosition &&
              !this.settings.hideScrollbar &&
              Ne(window).scrollTop(this.prevScrollTop);
          var s,
            i = this.items[this.index];
          if (this.zoomFromOrigin && i) {
            var n = this.mediaContainerPosition,
              l = n.top,
              o = n.bottom,
              a = this.galleryItems[this.index],
              r = a.__slideVideoInfo,
              d = a.poster,
              c = Re(
                i,
                this.outer,
                l + o,
                r && d && this.settings.videoMaxSize
              );
            s = Ye(i, this.outer, l, o, c);
          }
          this.zoomFromOrigin && s
            ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
              this.getSlideItem(this.index)
                .addClass("lg-start-end-progress")
                .css(
                  "transition-duration",
                  this.settings.startAnimationDuration + "ms"
                )
                .css("transform", s))
            : (this.outer.addClass("lg-hide-items"),
              this.outer.removeClass("lg-zoom-from-image")),
            this.destroyModules(),
            (this.lGalleryOn = !1),
            (this.isDummyImageRemoved = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            clearTimeout(this.hideBarTimeout),
            (this.hideBarTimeout = !1),
            Ne("html").removeClass("lg-on"),
            this.outer.removeClass("lg-visible lg-components-open"),
            this.$backdrop.removeClass("in").css("opacity", 0);
          var h =
            this.zoomFromOrigin && s
              ? Math.max(
                  this.settings.startAnimationDuration,
                  this.settings.backdropDuration
                )
              : this.settings.backdropDuration;
          return (
            this.$container.removeClass("lg-show-in"),
            setTimeout(function () {
              t.zoomFromOrigin &&
                s &&
                t.outer.removeClass("lg-zoom-from-image"),
                t.$container.removeClass("lg-show"),
                t.resetScrollBar(),
                t.$backdrop
                  .removeAttr("style")
                  .css(
                    "transition-duration",
                    t.settings.backdropDuration + "ms"
                  ),
                t.outer.removeClass("lg-closing " + t.settings.startClass),
                t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                t.$inner.empty(),
                t.lgOpened && t.LGel.trigger(He, { instance: t }),
                t.$container.get() && t.$container.get().blur(),
                (t.lgOpened = !1);
            }, h + 100),
            h + 100
          );
        }),
        (e.prototype.initModules = function () {
          this.plugins.forEach(function (e) {
            try {
              e.init();
            } catch (e) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly initiated"
              );
            }
          });
        }),
        (e.prototype.destroyModules = function (e) {
          this.plugins.forEach(function (t) {
            try {
              e ? t.destroy() : t.closeGallery && t.closeGallery();
            } catch (e) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly destroyed"
              );
            }
          });
        }),
        (e.prototype.refresh = function (e) {
          this.settings.dynamic || this.invalidateItems(),
            (this.galleryItems = e || this.getItems()),
            this.updateControls(),
            this.openGalleryOnItemClick(),
            this.LGel.trigger(Ie);
        }),
        (e.prototype.updateControls = function () {
          this.addSlideVideoInfo(this.galleryItems),
            this.updateCounterTotal(),
            this.manageSingleSlideClassName();
        }),
        (e.prototype.destroyGallery = function () {
          this.destroyModules(!0),
            this.settings.dynamic || this.invalidateItems(),
            Ne(window).off(".lg.global" + this.lgId),
            this.LGel.off(".lg"),
            this.$container.remove();
        }),
        (e.prototype.destroy = function () {
          var e = this.closeGallery(!0);
          return (
            e
              ? setTimeout(this.destroyGallery.bind(this), e)
              : this.destroyGallery(),
            e
          );
        }),
        e
      );
    })();
  const ot = function (e, t) {
    return new lt(e, t);
  };
  var at = function () {
      return (
        (at =
          Object.assign ||
          function (e) {
            for (var t, s = 1, i = arguments.length; s < i; s++)
              for (var n in (t = arguments[s]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          }),
        at.apply(this, arguments)
      );
    },
    rt = {
      thumbnail: !0,
      animateThumb: !0,
      currentPagerPosition: "middle",
      alignThumbnails: "middle",
      thumbWidth: 100,
      thumbHeight: "80px",
      thumbMargin: 5,
      appendThumbnailsTo: ".lg-components",
      toggleThumb: !1,
      enableThumbDrag: !0,
      enableThumbSwipe: !0,
      thumbnailSwipeThreshold: 10,
      loadYouTubeThumbnail: !0,
      youTubeThumbSize: 1,
      thumbnailPluginStrings: { toggleThumbnails: "Toggle thumbnails" },
    },
    dt = "lgContainerResize",
    ct = "lgUpdateSlides",
    ht = "lgBeforeOpen",
    ut = "lgBeforeSlide";
  !(function () {
    function e(e, t) {
      return (
        (this.thumbOuterWidth = 0),
        (this.thumbTotalWidth = 0),
        (this.translateX = 0),
        (this.thumbClickable = !1),
        (this.core = e),
        (this.$LG = t),
        this
      );
    }
    (e.prototype.init = function () {
      (this.settings = at(at({}, rt), this.core.settings)),
        (this.thumbOuterWidth = 0),
        (this.thumbTotalWidth =
          this.core.galleryItems.length *
          (this.settings.thumbWidth + this.settings.thumbMargin)),
        (this.translateX = 0),
        this.setAnimateThumbStyles(),
        this.core.settings.allowMediaOverlap ||
          (this.settings.toggleThumb = !1),
        this.settings.thumbnail &&
          (this.build(),
          this.settings.animateThumb
            ? (this.settings.enableThumbDrag && this.enableThumbDrag(),
              this.settings.enableThumbSwipe && this.enableThumbSwipe(),
              (this.thumbClickable = !1))
            : (this.thumbClickable = !0),
          this.toggleThumbBar(),
          this.thumbKeyPress());
    }),
      (e.prototype.build = function () {
        var e = this;
        this.setThumbMarkup(),
          this.manageActiveClassOnSlideChange(),
          this.$lgThumb.first().on("click.lg touchend.lg", function (t) {
            var s = e.$LG(t.target);
            s.hasAttribute("data-lg-item-id") &&
              setTimeout(function () {
                if (e.thumbClickable && !e.core.lgBusy) {
                  var t = parseInt(s.attr("data-lg-item-id"));
                  e.core.slide(t, !1, !0, !1);
                }
              }, 50);
          }),
          this.core.LGel.on(ut + ".thumb", function (t) {
            var s = t.detail.index;
            e.animateThumb(s);
          }),
          this.core.LGel.on(ht + ".thumb", function () {
            e.thumbOuterWidth = e.core.outer.get().offsetWidth;
          }),
          this.core.LGel.on(ct + ".thumb", function () {
            e.rebuildThumbnails();
          }),
          this.core.LGel.on(dt + ".thumb", function () {
            e.core.lgOpened &&
              setTimeout(function () {
                (e.thumbOuterWidth = e.core.outer.get().offsetWidth),
                  e.animateThumb(e.core.index),
                  (e.thumbOuterWidth = e.core.outer.get().offsetWidth);
              }, 50);
          });
      }),
      (e.prototype.setThumbMarkup = function () {
        var e = "lg-thumb-outer ";
        this.settings.alignThumbnails &&
          (e += "lg-thumb-align-" + this.settings.alignThumbnails);
        var t =
          '<div class="' +
          e +
          '">\n        <div class="lg-thumb lg-group">\n        </div>\n        </div>';
        this.core.outer.addClass("lg-has-thumb"),
          ".lg-components" === this.settings.appendThumbnailsTo
            ? this.core.$lgComponents.append(t)
            : this.core.outer.append(t),
          (this.$thumbOuter = this.core.outer.find(".lg-thumb-outer").first()),
          (this.$lgThumb = this.core.outer.find(".lg-thumb").first()),
          this.settings.animateThumb &&
            this.core.outer
              .find(".lg-thumb")
              .css("transition-duration", this.core.settings.speed + "ms")
              .css("width", this.thumbTotalWidth + "px")
              .css("position", "relative"),
          this.setThumbItemHtml(this.core.galleryItems);
      }),
      (e.prototype.enableThumbDrag = function () {
        var e = this,
          t = {
            cords: { startX: 0, endX: 0 },
            isMoved: !1,
            newTranslateX: 0,
            startTime: new Date(),
            endTime: new Date(),
            touchMoveTime: 0,
          },
          s = !1;
        this.$thumbOuter.addClass("lg-grab"),
          this.core.outer
            .find(".lg-thumb")
            .first()
            .on("mousedown.lg.thumb", function (i) {
              e.thumbTotalWidth > e.thumbOuterWidth &&
                (i.preventDefault(),
                (t.cords.startX = i.pageX),
                (t.startTime = new Date()),
                (e.thumbClickable = !1),
                (s = !0),
                (e.core.outer.get().scrollLeft += 1),
                (e.core.outer.get().scrollLeft -= 1),
                e.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"));
            }),
          this.$LG(window).on(
            "mousemove.lg.thumb.global" + this.core.lgId,
            function (i) {
              e.core.lgOpened &&
                s &&
                ((t.cords.endX = i.pageX), (t = e.onThumbTouchMove(t)));
            }
          ),
          this.$LG(window).on(
            "mouseup.lg.thumb.global" + this.core.lgId,
            function () {
              e.core.lgOpened &&
                (t.isMoved
                  ? (t = e.onThumbTouchEnd(t))
                  : (e.thumbClickable = !0),
                s &&
                  ((s = !1),
                  e.$thumbOuter
                    .removeClass("lg-grabbing")
                    .addClass("lg-grab")));
            }
          );
      }),
      (e.prototype.enableThumbSwipe = function () {
        var e = this,
          t = {
            cords: { startX: 0, endX: 0 },
            isMoved: !1,
            newTranslateX: 0,
            startTime: new Date(),
            endTime: new Date(),
            touchMoveTime: 0,
          };
        this.$lgThumb.on("touchstart.lg", function (s) {
          e.thumbTotalWidth > e.thumbOuterWidth &&
            (s.preventDefault(),
            (t.cords.startX = s.targetTouches[0].pageX),
            (e.thumbClickable = !1),
            (t.startTime = new Date()));
        }),
          this.$lgThumb.on("touchmove.lg", function (s) {
            e.thumbTotalWidth > e.thumbOuterWidth &&
              (s.preventDefault(),
              (t.cords.endX = s.targetTouches[0].pageX),
              (t = e.onThumbTouchMove(t)));
          }),
          this.$lgThumb.on("touchend.lg", function () {
            t.isMoved ? (t = e.onThumbTouchEnd(t)) : (e.thumbClickable = !0);
          });
      }),
      (e.prototype.rebuildThumbnails = function () {
        var e = this;
        this.$thumbOuter.addClass("lg-rebuilding-thumbnails"),
          setTimeout(function () {
            (e.thumbTotalWidth =
              e.core.galleryItems.length *
              (e.settings.thumbWidth + e.settings.thumbMargin)),
              e.$lgThumb.css("width", e.thumbTotalWidth + "px"),
              e.$lgThumb.empty(),
              e.setThumbItemHtml(e.core.galleryItems),
              e.animateThumb(e.core.index);
          }, 50),
          setTimeout(function () {
            e.$thumbOuter.removeClass("lg-rebuilding-thumbnails");
          }, 200);
      }),
      (e.prototype.setTranslate = function (e) {
        this.$lgThumb.css("transform", "translate3d(-" + e + "px, 0px, 0px)");
      }),
      (e.prototype.getPossibleTransformX = function (e) {
        return (
          e > this.thumbTotalWidth - this.thumbOuterWidth &&
            (e = this.thumbTotalWidth - this.thumbOuterWidth),
          e < 0 && (e = 0),
          e
        );
      }),
      (e.prototype.animateThumb = function (e) {
        if (
          (this.$lgThumb.css(
            "transition-duration",
            this.core.settings.speed + "ms"
          ),
          this.settings.animateThumb)
        ) {
          var t = 0;
          switch (this.settings.currentPagerPosition) {
            case "left":
              t = 0;
              break;
            case "middle":
              t = this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
              break;
            case "right":
              t = this.thumbOuterWidth - this.settings.thumbWidth;
          }
          (this.translateX =
            (this.settings.thumbWidth + this.settings.thumbMargin) * e - 1 - t),
            this.translateX > this.thumbTotalWidth - this.thumbOuterWidth &&
              (this.translateX = this.thumbTotalWidth - this.thumbOuterWidth),
            this.translateX < 0 && (this.translateX = 0),
            this.setTranslate(this.translateX);
        }
      }),
      (e.prototype.onThumbTouchMove = function (e) {
        return (
          (e.newTranslateX = this.translateX),
          (e.isMoved = !0),
          (e.touchMoveTime = new Date().valueOf()),
          (e.newTranslateX -= e.cords.endX - e.cords.startX),
          (e.newTranslateX = this.getPossibleTransformX(e.newTranslateX)),
          this.setTranslate(e.newTranslateX),
          this.$thumbOuter.addClass("lg-dragging"),
          e
        );
      }),
      (e.prototype.onThumbTouchEnd = function (e) {
        (e.isMoved = !1),
          (e.endTime = new Date()),
          this.$thumbOuter.removeClass("lg-dragging");
        var t = e.endTime.valueOf() - e.startTime.valueOf(),
          s = e.cords.endX - e.cords.startX,
          i = Math.abs(s) / t;
        return (
          i > 0.15 && e.endTime.valueOf() - e.touchMoveTime < 30
            ? ((i += 1) > 2 && (i += 1),
              (i += i * (Math.abs(s) / this.thumbOuterWidth)),
              this.$lgThumb.css(
                "transition-duration",
                Math.min(i - 1, 2) + "settings"
              ),
              (s *= i),
              (this.translateX = this.getPossibleTransformX(
                this.translateX - s
              )),
              this.setTranslate(this.translateX))
            : (this.translateX = e.newTranslateX),
          Math.abs(e.cords.endX - e.cords.startX) <
            this.settings.thumbnailSwipeThreshold && (this.thumbClickable = !0),
          e
        );
      }),
      (e.prototype.getThumbHtml = function (e, t) {
        var s,
          i = this.core.galleryItems[t].__slideVideoInfo || {};
        return (
          (s =
            i.youtube && this.settings.loadYouTubeThumbnail
              ? "//img.youtube.com/vi/" +
                i.youtube[1] +
                "/" +
                this.settings.youTubeThumbSize +
                ".jpg"
              : e),
          '<div data-lg-item-id="' +
            t +
            '" class="lg-thumb-item ' +
            (t === this.core.index ? " active" : "") +
            '" \n        style="width:' +
            this.settings.thumbWidth +
            "px; height: " +
            this.settings.thumbHeight +
            ";\n            margin-right: " +
            this.settings.thumbMargin +
            'px;">\n            <img data-lg-item-id="' +
            t +
            '" src="' +
            s +
            '" />\n        </div>'
        );
      }),
      (e.prototype.getThumbItemHtml = function (e) {
        for (var t = "", s = 0; s < e.length; s++)
          t += this.getThumbHtml(e[s].thumb, s);
        return t;
      }),
      (e.prototype.setThumbItemHtml = function (e) {
        var t = this.getThumbItemHtml(e);
        this.$lgThumb.html(t);
      }),
      (e.prototype.setAnimateThumbStyles = function () {
        this.settings.animateThumb &&
          this.core.outer.addClass("lg-animate-thumb");
      }),
      (e.prototype.manageActiveClassOnSlideChange = function () {
        var e = this;
        this.core.LGel.on(ut + ".thumb", function (t) {
          var s = e.core.outer.find(".lg-thumb-item"),
            i = t.detail.index;
          s.removeClass("active"), s.eq(i).addClass("active");
        });
      }),
      (e.prototype.toggleThumbBar = function () {
        var e = this;
        this.settings.toggleThumb &&
          (this.core.outer.addClass("lg-can-toggle"),
          this.core.$toolbar.append(
            '<button type="button" aria-label="' +
              this.settings.thumbnailPluginStrings.toggleThumbnails +
              '" class="lg-toggle-thumb lg-icon"></button>'
          ),
          this.core.outer
            .find(".lg-toggle-thumb")
            .first()
            .on("click.lg", function () {
              e.core.outer.toggleClass("lg-components-open");
            }));
      }),
      (e.prototype.thumbKeyPress = function () {
        var e = this;
        this.$LG(window).on(
          "keydown.lg.thumb.global" + this.core.lgId,
          function (t) {
            e.core.lgOpened &&
              e.settings.toggleThumb &&
              (38 === t.keyCode
                ? (t.preventDefault(),
                  e.core.outer.addClass("lg-components-open"))
                : 40 === t.keyCode &&
                  (t.preventDefault(),
                  e.core.outer.removeClass("lg-components-open")));
          }
        );
      }),
      (e.prototype.destroy = function () {
        this.settings.thumbnail &&
          (this.$LG(window).off(".lg.thumb.global" + this.core.lgId),
          this.core.LGel.off(".lg.thumb"),
          this.core.LGel.off(".thumb"),
          this.$thumbOuter.remove(),
          this.core.outer.removeClass("lg-has-thumb"));
      });
  })();
  var pt = function () {
      return (
        (pt =
          Object.assign ||
          function (e) {
            for (var t, s = 1, i = arguments.length; s < i; s++)
              for (var n in (t = arguments[s]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          }),
        pt.apply(this, arguments)
      );
    },
    gt = {
      autoplayFirstVideo: !0,
      youTubePlayerParams: !1,
      vimeoPlayerParams: !1,
      wistiaPlayerParams: !1,
      gotoNextSlideOnVideoEnd: !0,
      autoplayVideoOnSlide: !1,
      videojs: !1,
      videojsTheme: "",
      videojsOptions: {},
    },
    mt = "lgHasVideo",
    ft = "lgSlideItemLoad",
    vt = "lgBeforeSlide",
    bt = "lgAfterSlide",
    yt = "lgPosterClick",
    wt = function (e) {
      return Object.keys(e)
        .map(function (t) {
          return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
        })
        .join("&");
    },
    St = (function () {
      function e(e) {
        return (
          (this.core = e),
          (this.settings = pt(pt({}, gt), this.core.settings)),
          this
        );
      }
      return (
        (e.prototype.init = function () {
          var e = this;
          this.core.LGel.on(mt + ".video", this.onHasVideo.bind(this)),
            this.core.LGel.on(yt + ".video", function () {
              var t = e.core.getSlideItem(e.core.index);
              e.loadVideoOnPosterClick(t);
            }),
            this.core.LGel.on(ft + ".video", this.onSlideItemLoad.bind(this)),
            this.core.LGel.on(vt + ".video", this.onBeforeSlide.bind(this)),
            this.core.LGel.on(bt + ".video", this.onAfterSlide.bind(this));
        }),
        (e.prototype.onSlideItemLoad = function (e) {
          var t = this,
            s = e.detail,
            i = s.isFirstSlide,
            n = s.index;
          this.settings.autoplayFirstVideo &&
            i &&
            n === this.core.index &&
            setTimeout(function () {
              t.loadAndPlayVideo(n);
            }, 200),
            !i &&
              this.settings.autoplayVideoOnSlide &&
              n === this.core.index &&
              this.loadAndPlayVideo(n);
        }),
        (e.prototype.onHasVideo = function (e) {
          var t = e.detail,
            s = t.index,
            i = t.src,
            n = t.html5Video;
          t.hasPoster ||
            (this.appendVideos(this.core.getSlideItem(s), {
              src: i,
              addClass: "lg-object",
              index: s,
              html5Video: n,
            }),
            this.gotoNextSlideOnVideoEnd(i, s));
        }),
        (e.prototype.onBeforeSlide = function (e) {
          if (this.core.lGalleryOn) {
            var t = e.detail.prevIndex;
            this.pauseVideo(t);
          }
        }),
        (e.prototype.onAfterSlide = function (e) {
          var t = this,
            s = e.detail,
            i = s.index,
            n = s.prevIndex,
            l = this.core.getSlideItem(i);
          this.settings.autoplayVideoOnSlide &&
            i !== n &&
            l.hasClass("lg-complete") &&
            setTimeout(function () {
              t.loadAndPlayVideo(i);
            }, 100);
        }),
        (e.prototype.loadAndPlayVideo = function (e) {
          var t = this.core.getSlideItem(e);
          this.core.galleryItems[e].poster
            ? this.loadVideoOnPosterClick(t, !0)
            : this.playVideo(e);
        }),
        (e.prototype.playVideo = function (e) {
          this.controlVideo(e, "play");
        }),
        (e.prototype.pauseVideo = function (e) {
          this.controlVideo(e, "pause");
        }),
        (e.prototype.getVideoHtml = function (e, t, s, i) {
          var n = "",
            l = this.core.galleryItems[s].__slideVideoInfo || {},
            o = this.core.galleryItems[s],
            a = o.title || o.alt;
          a = a ? 'title="' + a + '"' : "";
          var r =
            'allowtransparency="true"\n            frameborder="0"\n            scrolling="no"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen';
          if (l.youtube) {
            var d = "lg-youtube" + s,
              c =
                "?" +
                (l.youtube[2] ? l.youtube[2] + "&" : "") +
                "wmode=opaque&autoplay=0&mute=1&enablejsapi=1" +
                (this.settings.youTubePlayerParams
                  ? "&" + wt(this.settings.youTubePlayerParams)
                  : "");
            n =
              '<iframe allow="autoplay" id=' +
              d +
              ' class="lg-video-object lg-youtube ' +
              t +
              '" ' +
              a +
              ' src="//www.youtube.com/embed/' +
              (l.youtube[1] + c) +
              '" ' +
              r +
              "></iframe>";
          } else if (l.vimeo) {
            (d = "lg-vimeo" + s),
              (c = (function (e, t) {
                if (!t || !t.vimeo) return "";
                var s = t.vimeo[2] || "",
                  i = e && 0 !== Object.keys(e).length ? "&" + wt(e) : "",
                  n = (
                    (t.vimeo[0].split("/").pop() || "").split("?")[0] || ""
                  ).split("#")[0],
                  l = t.vimeo[1] !== n;
                return (
                  l && (s = s.replace("/" + n, "")),
                  "?autoplay=0&muted=1" +
                    (l ? "&h=" + n : "") +
                    i +
                    ("?" == s[0] ? "&" + s.slice(1) : s || "")
                );
              })(this.settings.vimeoPlayerParams, l));
            n =
              '<iframe allow="autoplay" id=' +
              d +
              ' class="lg-video-object lg-vimeo ' +
              t +
              '" ' +
              a +
              ' src="//player.vimeo.com/video/' +
              (l.vimeo[1] + c) +
              '" ' +
              r +
              "></iframe>";
          } else if (l.wistia) {
            var h = "lg-wistia" + s;
            (c = (c = wt(this.settings.wistiaPlayerParams)) ? "?" + c : ""),
              (n =
                '<iframe allow="autoplay" id="' +
                h +
                '" src="//fast.wistia.net/embed/iframe/' +
                (l.wistia[4] + c) +
                '" ' +
                a +
                ' class="wistia_embed lg-video-object lg-wistia ' +
                t +
                '" name="wistia_embed" ' +
                r +
                "></iframe>");
          } else if (l.html5) {
            for (var u = "", p = 0; p < i.source.length; p++)
              u +=
                '<source src="' +
                i.source[p].src +
                '" type="' +
                i.source[p].type +
                '">';
            if (i.tracks) {
              var g = function (e) {
                var t = "",
                  s = i.tracks[e];
                Object.keys(s || {}).forEach(function (e) {
                  t += e + '="' + s[e] + '" ';
                }),
                  (u += "<track " + t + ">");
              };
              for (p = 0; p < i.tracks.length; p++) g(p);
            }
            var m = "",
              f = i.attributes || {};
            Object.keys(f || {}).forEach(function (e) {
              m += e + '="' + f[e] + '" ';
            }),
              (n =
                '<video class="lg-video-object lg-html5 ' +
                (this.settings.videojs && this.settings.videojsTheme
                  ? this.settings.videojsTheme + " "
                  : "") +
                " " +
                (this.settings.videojs ? " video-js" : "") +
                '" ' +
                m +
                ">\n                " +
                u +
                "\n                Your browser does not support HTML5 video.\n            </video>");
          }
          return n;
        }),
        (e.prototype.appendVideos = function (e, t) {
          var s,
            i = this.getVideoHtml(t.src, t.addClass, t.index, t.html5Video);
          e.find(".lg-video-cont").append(i);
          var n = e.find(".lg-video-object").first();
          if (
            (t.html5Video &&
              n.on("mousedown.lg.video", function (e) {
                e.stopPropagation();
              }),
            this.settings.videojs &&
              (null ===
                (s = this.core.galleryItems[t.index].__slideVideoInfo) ||
              void 0 === s
                ? void 0
                : s.html5))
          )
            try {
              return videojs(n.get(), this.settings.videojsOptions);
            } catch (e) {
              console.error(
                "lightGallery:- Make sure you have included videojs"
              );
            }
        }),
        (e.prototype.gotoNextSlideOnVideoEnd = function (e, t) {
          var s = this,
            i = this.core.getSlideItem(t).find(".lg-video-object").first(),
            n = this.core.galleryItems[t].__slideVideoInfo || {};
          if (this.settings.gotoNextSlideOnVideoEnd)
            if (n.html5)
              i.on("ended", function () {
                s.core.goToNextSlide();
              });
            else if (n.vimeo)
              try {
                new Vimeo.Player(i.get()).on("ended", function () {
                  s.core.goToNextSlide();
                });
              } catch (e) {
                console.error(
                  "lightGallery:- Make sure you have included //github.com/vimeo/player.js"
                );
              }
            else if (n.wistia)
              try {
                (window._wq = window._wq || []),
                  window._wq.push({
                    id: i.attr("id"),
                    onReady: function (e) {
                      e.bind("end", function () {
                        s.core.goToNextSlide();
                      });
                    },
                  });
              } catch (e) {
                console.error(
                  "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js"
                );
              }
        }),
        (e.prototype.controlVideo = function (e, t) {
          var s = this.core.getSlideItem(e).find(".lg-video-object").first(),
            i = this.core.galleryItems[e].__slideVideoInfo || {};
          if (s.get())
            if (i.youtube)
              try {
                s.get().contentWindow.postMessage(
                  '{"event":"command","func":"' + t + 'Video","args":""}',
                  "*"
                );
              } catch (e) {
                console.error("lightGallery:- " + e);
              }
            else if (i.vimeo)
              try {
                new Vimeo.Player(s.get())[t]();
              } catch (e) {
                console.error(
                  "lightGallery:- Make sure you have included //github.com/vimeo/player.js"
                );
              }
            else if (i.html5)
              if (this.settings.videojs)
                try {
                  videojs(s.get())[t]();
                } catch (e) {
                  console.error(
                    "lightGallery:- Make sure you have included videojs"
                  );
                }
              else s.get()[t]();
            else if (i.wistia)
              try {
                (window._wq = window._wq || []),
                  window._wq.push({
                    id: s.attr("id"),
                    onReady: function (e) {
                      e[t]();
                    },
                  });
              } catch (e) {
                console.error(
                  "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js"
                );
              }
        }),
        (e.prototype.loadVideoOnPosterClick = function (e, t) {
          var s = this;
          if (e.hasClass("lg-video-loaded"))
            t && this.playVideo(this.core.index);
          else if (e.hasClass("lg-has-video")) this.playVideo(this.core.index);
          else {
            e.addClass("lg-has-video");
            var i = void 0,
              n = this.core.galleryItems[this.core.index].src,
              l = this.core.galleryItems[this.core.index].video;
            l && (i = "string" == typeof l ? JSON.parse(l) : l);
            var o = this.appendVideos(e, {
              src: n,
              addClass: "",
              index: this.core.index,
              html5Video: i,
            });
            this.gotoNextSlideOnVideoEnd(n, this.core.index);
            var a = e.find(".lg-object").first().get();
            e.find(".lg-video-cont").first().append(a),
              e.addClass("lg-video-loading"),
              o &&
                o.ready(function () {
                  o.on("loadedmetadata", function () {
                    s.onVideoLoadAfterPosterClick(e, s.core.index);
                  });
                }),
              e
                .find(".lg-video-object")
                .first()
                .on("load.lg error.lg loadedmetadata.lg", function () {
                  setTimeout(function () {
                    s.onVideoLoadAfterPosterClick(e, s.core.index);
                  }, 50);
                });
          }
        }),
        (e.prototype.onVideoLoadAfterPosterClick = function (e, t) {
          e.addClass("lg-video-loaded"), this.playVideo(t);
        }),
        (e.prototype.destroy = function () {
          this.core.LGel.off(".lg.video"), this.core.LGel.off(".video");
        }),
        e
      );
    })();
  const Ct = St,
    Tt = document.querySelectorAll(".video-preview");
  Tt.length &&
    Tt.forEach((e) => {
      e.addEventListener("lgBeforeOpen", () => {
        document.documentElement.classList.add("lock");
      }),
        e.addEventListener("lgAfterClose", () => {
          document.documentElement.classList.remove("lock");
        }),
        ot(e, {
          plugins: [Ct],
          licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
          speed: 500,
        });
    });
  document.querySelectorAll(".sound-button")?.forEach((e) => {
    e.addEventListener("click", () => {
      e.classList.toggle("active");
    });
  }),
    document.querySelectorAll(".subtabs__btn")?.forEach((e) => {
      e.addEventListener("click", (e) => {
        const t = e.currentTarget,
          s = t.closest(".subtabs"),
          i = s.querySelectorAll(".subtabs__btn"),
          n = s.querySelectorAll(".subtabs__one"),
          l = Array.from(i).indexOf(t);
        i.forEach((e) => {
          e.classList.remove("active");
        }),
          n.forEach((e) => {
            e.classList.remove("active");
          }),
          n[l].classList.add("active"),
          t.classList.add("active");
      });
    }),
    (() => {
      const e = document.querySelectorAll(".placement__close");
      document.querySelectorAll(".placement__open").forEach((e) => {
        e.addEventListener("click", (e) => {
          e.currentTarget
            .closest(".placement__marker")
            .querySelector(".placement__caption")
            .classList.add("show");
        });
      }),
        e.forEach((e) => {
          e.addEventListener("click", (e) => {
            e.currentTarget
              .closest(".placement__marker")
              .querySelector(".placement__caption")
              .classList.remove("show");
          });
        });
    })(),
    (() => {
      const e = document.getElementById("city-search"),
        t = document.querySelectorAll(".city__item"),
        s = [];
      t?.forEach((e) => {
        let t = e.querySelector("a").textContent.trim();
        s.push(t);
      }),
        e &&
          t.length > 0 &&
          e.addEventListener("input", (e) => {
            const i = e.target.value,
              n = s.filter((e) => e.toLowerCase().includes(i.toLowerCase()));
            t.forEach((e) => {
              let t = e.querySelector("a").textContent.trim();
              n.includes(t)
                ? (e.style.display = "block")
                : (e.style.display = "none");
            });
          });
    })(),
    (() => {
      let e = new Date(),
        t = !1,
        s = 0,
        i = "",
        n = "";
      const l = document.querySelector(".calendar__days"),
        o = document.querySelector("#today"),
        a = document.querySelector("#clear"),
        r = document.querySelector(".date__month"),
        d = document.querySelector(".date__year"),
        c = document.querySelector(".calendar__btn--next"),
        h = document.querySelector(".calendar__btn--prev");
      let u = [];
      document.querySelector(".calendar__months") &&
        (u = Array.from(
          document.querySelector(".calendar__months").children
        ).map((e) => e.textContent));
      const p = () => {
        e.setDate(1);
        let o = "";
        const a = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate(),
          c = new Date(e.getFullYear(), e.getMonth(), 0).getDate(),
          h = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDay(),
          p = e.getDay(),
          g = 7 - h - 1;
        (r.innerHTML = u[e.getMonth()]), (d.innerHTML = e.getFullYear());
        for (let e = p - 1; e > 0; e--)
          o += `<div class="prev-date">${c - e + 1}</div>`;
        for (let l = 1; l <= a; l++)
          t && l === s && e.getMonth() === i && e.getFullYear() === n
            ? (o += `<div class="day today">${l}</div>`)
            : t ||
              l !== new Date().getDate() ||
              e.getMonth() !== new Date().getMonth() ||
              e.getFullYear() !== new Date().getFullYear()
            ? (l < new Date().getDate() &&
                e.getMonth() === new Date().getMonth()) ||
              (e.getMonth() < new Date().getMonth() &&
                e.getFullYear() === new Date().getFullYear()) ||
              e.getFullYear() < new Date().getFullYear()
              ? (o += `<div class="prev-date">${l}</div>`)
              : (o += `<div class="day">${l}</div>`)
            : (o += `<div class="day today">${l}</div>`);
        for (let e = 1; e <= g + 1; e++)
          o += `<div class="next-date">${e}</div>`;
        l.innerHTML = o;
      };
      l &&
        l.addEventListener("click", (e) => {
          const l = e.target;
          if (l.classList.contains("day")) {
            t = !0;
            document
              .querySelectorAll(".day")
              .forEach((e) => e.classList.remove("today")),
              l.classList.add("today"),
              (s = parseInt(l.textContent)),
              (i = parseInt(u.indexOf(r.textContent))),
              (n = parseInt(d.textContent));
          }
        }),
        h &&
          h.addEventListener("click", () => {
            e.setMonth(e.getMonth() - 1), p();
          }),
        c &&
          c.addEventListener("click", () => {
            e.setMonth(e.getMonth() + 1), p();
          }),
        o &&
          o.addEventListener("click", () => {
            (t = !1),
              e.setMonth(new Date().getMonth()),
              e.setFullYear(new Date().getFullYear()),
              e.setDate(new Date().getDate()),
              p();
          }),
        a &&
          a.addEventListener("click", () => {
            (t = !1),
              e.setMonth(new Date().getMonth()),
              e.setFullYear(new Date().getFullYear()),
              e.setDate(new Date().getDate()),
              p();
          }),
        l && p();
    })(),
    (() => {
      const e = document.querySelectorAll(".timing__hours"),
        t = document.querySelector(".booking__start"),
        s = document.querySelector(".booking__finish"),
        i = document.querySelector(".booking__backlink");
      e &&
        i &&
        (e.forEach((e) => {
          e.addEventListener("click", (e) => {
            e.target.closest(".timing__hour") &&
              (s.classList.add("show"), t.classList.add("hide"));
          });
        }),
        i.addEventListener("click", () => {
          s.classList.remove("show"), t.classList.remove("hide");
        }));
    })(),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".burger-menu");
      e &&
        e.addEventListener("click", function (e) {
          l && (o(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, s) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && l(t);
        let i = c(e, "spollers");
        function l(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  o(e),
                  e.addEventListener("click", a))
                : (e.classList.remove("_spoller-init"),
                  o(e, !1),
                  e.removeEventListener("click", a));
          });
        }
        function o(e, t = !0) {
          const s = e.querySelectorAll("[data-spoller]");
          s.length > 0 &&
            s.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            });
        }
        function a(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const s = t.closest("[data-spoller]"),
              i = s.closest("[data-spollers]"),
              l = !!i.hasAttribute("data-one-spoller");
            i.querySelectorAll("._slide").length ||
              (l && !s.classList.contains("_spoller-active") && r(i),
              s.classList.toggle("_spoller-active"),
              s.parentNode.classList.toggle("_active"),
              s.parentNode.previousElementSibling &&
                s.parentNode.previousElementSibling.classList.toggle("_before"),
              n(s.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function r(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            t.parentNode.classList.remove("_active"),
            t.parentNode.previousElementSibling &&
              t.parentNode.previousElementSibling.classList.remove("_before"),
            s(t.nextElementSibling, 500));
        }
        i &&
          i.length &&
          i.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              l(e.itemsArray, e.matchMedia);
            }),
              l(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    (function () {
      const e = document.querySelectorAll("[data-tabs]");
      let t = [];
      if (e.length > 0) {
        const s = location.hash.replace("#", "");
        s.startsWith("tab-") && (t = s.replace("tab-", "").split("-")),
          e.forEach((e, s) => {
            e.classList.add("_tab-init"),
              e.setAttribute("data-tabs-index", s),
              e.addEventListener("click", l),
              (function (e) {
                const s = e.querySelectorAll("[data-tabs-titles]>*"),
                  i = e.querySelectorAll("[data-tabs-body]>*"),
                  n = e.dataset.tabsIndex,
                  l = t[0] == n;
                if (l) {
                  e.querySelector(
                    "[data-tabs-titles]>._tab-active"
                  ).classList.remove("_tab-active");
                }
                i.length > 0 &&
                  i.forEach((e, i) => {
                    s[i].setAttribute("data-tabs-title", ""),
                      e.setAttribute("data-tabs-item", ""),
                      l && i == t[1] && s[i].classList.add("_tab-active"),
                      (e.hidden = !s[i].classList.contains("_tab-active"));
                  });
              })(e);
          });
        let i = c(e, "tabs");
        i &&
          i.length &&
          i.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              n(e.itemsArray, e.matchMedia);
            }),
              n(e.itemsArray, e.matchMedia);
          });
      }
      function n(e, t) {
        e.forEach((e) => {
          const s = (e = e.item).querySelector("[data-tabs-titles]"),
            i = e.querySelectorAll("[data-tabs-title]"),
            n = e.querySelector("[data-tabs-body]");
          e.querySelectorAll("[data-tabs-item]").forEach((l, o) => {
            t.matches
              ? (n.append(i[o]), n.append(l), e.classList.add("_tab-spoller"))
              : (s.append(i[o]), e.classList.remove("_tab-spoller"));
          });
        });
      }
      function l(e) {
        const t = e.target;
        if (t.closest("[data-tabs-title]")) {
          const n = t.closest("[data-tabs-title]"),
            l = n.closest("[data-tabs]");
          if (
            !n.classList.contains("_tab-active") &&
            !l.querySelectorAll("._slide").length
          ) {
            const e = l.querySelector("[data-tabs-title]._tab-active");
            e && e.classList.remove("_tab-active"),
              n.classList.add("_tab-active"),
              (function (e) {
                const t = e.querySelectorAll("[data-tabs-title]"),
                  n = e.querySelectorAll("[data-tabs-item]"),
                  l = e.dataset.tabsIndex,
                  o = (function (e) {
                    if (e.hasAttribute("data-tabs-animate"))
                      return e.dataset.tabsAnimate > 0
                        ? e.dataset.tabsAnimate
                        : 500;
                  })(e);
                n.length > 0 &&
                  n.forEach((e, n) => {
                    t[n].classList.contains("_tab-active")
                      ? (o ? i(e, o) : (e.hidden = !1),
                        e.closest(".popup") ||
                          (location.hash = `tab-${l}-${n}`))
                      : o
                      ? s(e, o)
                      : (e.hidden = !0);
                  });
              })(l);
          }
          e.preventDefault();
        }
      }
    })(),
    new t({}),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            p.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && p.validateInput(t));
        });
    })(),
    window.addEventListener("DOMContentLoaded", function () {
      [].forEach.call(document.querySelectorAll(".tel"), function (e) {
        var t;
        function s(e) {
          e.keyCode && (t = e.keyCode),
            this.selectionStart < 3 && e.preventDefault();
          var s = "+7 (___) ___ ____",
            i = 0,
            n = s.replace(/\D/g, ""),
            l = this.value.replace(/\D/g, ""),
            o = s.replace(/[_\d]/g, function (e) {
              return i < l.length ? l.charAt(i++) || n.charAt(i) : e;
            });
          -1 != (i = o.indexOf("_")) && (i < 5 && (i = 3), (o = o.slice(0, i)));
          var a = s
            .substr(0, this.value.length)
            .replace(/_+/g, function (e) {
              return "\\d{1," + e.length + "}";
            })
            .replace(/[+()]/g, "\\$&");
          (!(a = new RegExp("^" + a + "$")).test(this.value) ||
            this.value.length < 5 ||
            (t > 47 && t < 58)) &&
            (this.value = o),
            "blur" == e.type && this.value.length < 5 && (this.value = "");
        }
        e.addEventListener("input", s),
          e.addEventListener("focus", s),
          e.addEventListener("blur", s),
          e.addEventListener("keydown", s);
      });
    }),
    (u.selectModule = new h({}));
})();

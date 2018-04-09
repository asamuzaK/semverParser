/* eslint-disable no-magic-numbers */
"use strict";
{
  /* api */
  const {
    escapeChar, getType, isString, logErr, logMsg, logWarn, parseStringifiedInt,
    stringifyPositiveInt, stripHtmlTags, throwErr,
  } = require("../modules/common");
  const {assert} = require("chai");
  const {describe, it} = require("mocha");
  const sinon = require("sinon");

  describe("escapeChar", () => {
    it("should get escaped string", () => {
      const c = "abc";
      const re = /(b)/ig;
      assert.strictEqual(escapeChar(c, re), "a\\bc");
    });

    it("should get null if string is not given", () => {
      const re = /(b)/ig;
      assert.isNull(escapeChar(1, re));
    });

    it("should get null if regexp is not given", () => {
      const c = "abc";
      assert.isNull(escapeChar(c));
    });
  });

  describe("getType", () => {
    it("should get Undefined", () => {
      assert.strictEqual(getType(), "Undefined");
    });

    it("should get Null", () => {
      assert.strictEqual(getType(null), "Null");
    });

    it("should get Object", () => {
      assert.strictEqual(getType({}), "Object");
    });

    it("should get Array", () => {
      assert.strictEqual(getType([]), "Array");
    });

    it("should get Boolean", () => {
      assert.strictEqual(getType(true), "Boolean");
    });

    it("should get Number", () => {
      assert.strictEqual(getType(1), "Number");
    });

    it("should get String", () => {
      assert.strictEqual(getType("a"), "String");
    });
  });

  describe("isString", () => {
    it("should get true if string is given", () => {
      assert.strictEqual(isString("a"), true);
    });

    it("should get false if given argument is not string", () => {
      assert.strictEqual(isString(1), false);
    });
  });

  describe("logErr", () => {
    it("should get false", () => {
      const msg = "Log Error test";
      const consoleError = sinon.stub(console, "error").callsFake(e => {
        assert.strictEqual(e.message, msg);
      });
      const res = logErr(new Error(msg));
      const {calledOnce} = consoleError;
      consoleError.restore();
      assert.isTrue(calledOnce);
      assert.isFalse(res);
    });
  });

  describe("logMsg", () => {
    it("should get string", () => {
      const msg = "Log message test";
      const consoleLog = sinon.stub(console, "log").callsFake(m => {
        assert.strictEqual(m, msg);
      });
      const res = logMsg(msg);
      const {calledOnce} = consoleLog;
      consoleLog.restore();
      assert.isTrue(calledOnce);
      assert.strictEqual(res, msg);
    });
  });

  describe("logWarn", () => {
    it("should get false", () => {
      const msg = "Log warn test";
      const consoleWarn = sinon.stub(console, "warn").callsFake(m => {
        assert.strictEqual(m, msg);
      });
      const res = logWarn(msg);
      const {calledOnce} = consoleWarn;
      consoleWarn.restore();
      assert.isTrue(calledOnce);
      assert.isFalse(res);
    });
  });

  describe("stringifyPositiveInt", () => {
    it("should get string", () => {
      assert.strictEqual(stringifyPositiveInt(1), "1");
    });

    it("should get null if given argument is not positive integer", () => {
      assert.isNull(stringifyPositiveInt());
    });

    it("should get null if 0 is given", () => {
      assert.isNull(stringifyPositiveInt(0));
    });

    it("should treat 0 as positive integer if second argument is true", () => {
      assert.strictEqual(stringifyPositiveInt(0, true), "0");
    });
  });

  describe("parseStringifiedInt", () => {
    it("should be function", () => {
      assert.typeOf(parseStringifiedInt, "function");
    });

    it("should throw if argument is not string", () => {
      assert.throws(() => parseStringifiedInt());
    });

    it("should throw if argument contains non-numeric string", () => {
      assert.throws(() => parseStringifiedInt("1a"));
    });

    it("should throw if argument contains non-numeric string", () => {
      assert.throws(() => parseStringifiedInt("1.0"));
    });

    it("should be integer", () => {
      assert.strictEqual(parseStringifiedInt("0"), 0);
    });

    it("should be integer", () => {
      assert.strictEqual(parseStringifiedInt("1"), 1);
    });

    it("should be integer", () => {
      assert.strictEqual(parseStringifiedInt("-1"), -1);
    });

    it("should be integer", () => {
      assert.strictEqual(parseStringifiedInt("10"), 10);
    });

    it("should throw if leading zero", () => {
      assert.throws(() => parseStringifiedInt("01"));
    });

    it("should be integer if leading zero but second arg is true", () => {
      assert.strictEqual(parseStringifiedInt("01", true), 1);
    });

    it("should throw if leading zero", () => {
      assert.throws(() => parseStringifiedInt("010"));
    });

    it("should be integer if leading zero but second arg is true", () => {
      assert.strictEqual(parseStringifiedInt("010", true), 10);
    });

    it("should throw if negative int leading zero", () => {
      assert.throws(() => parseStringifiedInt("-01"));
    });

    it(
      "should be integer if negative int leading zero but second arg is true",
      () => {
        assert.strictEqual(parseStringifiedInt("-01", true), -1);
      }
    );

    it("should throw if negative int leading zero", () => {
      assert.throws(() => parseStringifiedInt("-010"));
    });

    it(
      "should be integer if negative int leading zero but second arg is true",
      () => {
        assert.strictEqual(parseStringifiedInt("-010", true), -10);
      }
    );
  });

  describe("stripHtmlTags", () => {
    it("should strip HTML tags", () => {
      const p = "<p>test</p>";
      assert.strictEqual(stripHtmlTags(p), "test\n");
    });

    it("should decode HTML entities", () => {
      const p = "&amp;&lt;&gt;&quot;";
      assert.strictEqual(stripHtmlTags(p), "&<>\"");
    });
  });

  describe("throwErr", () => {
    it("should throw", () => {
      const e = new Error("Error");
      assert.throws(() => throwErr(e));
    });
  });
}

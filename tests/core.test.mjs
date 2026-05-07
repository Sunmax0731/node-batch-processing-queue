import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
  "id": "batch-queue-1",
  "title": "ノード・バッチ処理キュー サンプル 1",
  "jobId": "job-001",
  "command": "codex run --dry-run",
  "retryPolicy": "retry once after log review",
  "status": "ready"
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
  const report = analyzeItems({ items: [{
  "id": "batch-queue-missing-required",
  "title": "必須項目不足サンプル",
  "command": "codex run --dry-run",
  "retryPolicy": "retry once after log review",
  "status": "ready"
}] });
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});

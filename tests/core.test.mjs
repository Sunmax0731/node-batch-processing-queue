import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
  "id": "node-batch-processing-queue-1",
  "title": "Nodeバッチ処理キュー サンプル1",
  "status": "ready",
  "jobId": "job-001",
  "command": "codex run --dry-run",
  "retryPolicy": "ログ確認後に1回だけ再実行"
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
  const report = analyzeItems({ items: [{
  "id": "node-batch-processing-queue-missing-required",
  "title": "必須項目不足サンプル",
  "status": "ready",
  "command": "codex run --dry-run",
  "retryPolicy": "ログ確認後に1回だけ再実行"
}] });
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});

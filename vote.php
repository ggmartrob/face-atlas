<?php
// Face Atlas vote collector: appends {file, vote, ts} JSON lines to votes.jsonl.
// CORS open so the GitHub Pages copy can report here too.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('POST only'); }

$d = json_decode(file_get_contents('php://input'), true);
$file = $d['file'] ?? '';
$vote = $d['vote'] ?? '';
if (!preg_match('/^ft[a-z]*_[a-z]+_(male|female)_\d{1,3}\.jpg$/', $file) || !in_array($vote, ['up', 'down'], true)) {
    http_response_code(400); exit('bad payload');
}
$line = json_encode(['file' => $file, 'vote' => $vote, 'ts' => time()]);
file_put_contents(__DIR__ . '/votes.jsonl', $line . "\n", FILE_APPEND | LOCK_EX);
echo 'ok';

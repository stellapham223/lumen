# Reddit Comment Style Rules

Hướng dẫn viết reply Reddit không bị flag là AI-generated. Dùng cho cả 2 chiến lược: **seeding (Lumen)** và **giveback (karma farming)**.

> Bản code-injectable: [`lib/prompts/redditStyleRules.ts`](../../lib/prompts/redditStyleRules.ts) — tự động prepend vào prompt khi admin copy từ thread detail page.

---

## Bối cảnh

Reddit users (đặc biệt sub women's health, PCOS, mental health) đã rất nhạy với AI-generated content. Họ flag và downvote ngay khi thấy signature pattern. Account u/Mysterious-Spare6047 (case study từ r/PCOS) bị 2 người call out trong cùng 1 thread vì viết quá nhiều comment có structure giống nhau.

**Hệ quả nếu bị flag:**
- Comment bị downvote → giảm visibility → karma không lên
- Account bị shadowban hoặc đánh dấu ở mod side
- Mất credibility cho seeding sau này

**Mục tiêu:** Reply đọc như người thật vừa gõ trên điện thoại lúc đang mệt.

---

## 1. Cấu trúc bị lộ ngay (tránh tuyệt đối)

| Đừng | Thay bằng |
|---|---|
| Numbered list "1. ... 2. ..." trong câu trả lời ngắn | Viết liền thành đoạn, dùng "and", "also", "then" |
| Bullet "- Step 1 - Step 2" | "first i'd... then..." hoặc bỏ luôn |
| Bold/italic emphasis | Bỏ. Reddit comment thường flat text |
| Header H2/H3 | Không bao giờ trong comment |
| Câu mở đầu "Great question! Here's the thing:" | Vào thẳng nội dung |
| Câu kết "Hope this helps!" / "You got this!" | Bỏ. Hoặc thay bằng câu xìu "idk hope it helps" |

**Quy luật:** AI viết comment Reddit thường **quá có cấu trúc**. Người thật viết lộn xộn, ý nọ xọ ý kia, có khi quên ý.

---

## 2. Phrase tells — GPT signature (đừng dùng)

Cụm từ AI dùng cực nhiều, người thật ít khi nói:

- "the actual lever" / "the real driver" / "the underlying mechanism"
- "downstream of X"
- "the framing"
- "you've intuitively dialed it in"
- "more than you'd think" / "more than most people realize"
- "it's not X, it's Y" (contrast structure)
- "the single highest-leverage thing"
- "in a way that no [X] can replicate"
- "translates one-to-one"
- "the order matters" / "the order is wrong"
- "let me explain" / "here's why"
- "I want to be clear" / "to be clear"
- "genuinely" + adjective (overused: "genuinely helpful", "genuinely glad")
- "worth bumping up the queue"
- "carries a lot of weight"

---

## 3. Số liệu cụ thể = đỏ cờ

AI thích cite stats: "30%", "14-16 hours", "TSH 1-2", "30-40g protein".

- **Người thật** nói: "a fair bit", "noticeably", "around 14 hours i think", "like 30g maybe?"
- Nếu phải có số → kèm hedge: "i think it was around X" / "iirc"
- Đừng cite stat từ 2-3 nguồn khác nhau trong cùng 1 comment

---

## 4. Punctuation & formatting đặc trưng người thật

- **Lowercase** — cả đầu câu, tên bệnh, etc. ("pcos", "i", "tsh")
- **Comma splices** — nối 2 câu bằng dấu phẩy thay vì period
- **Câu cụt** — "yeah no" / "fair" / "idk" đứng riêng
- **Dấu gạch ngang** — `--` thay vì em-dash (`—`). AI luôn dùng em-dash chuẩn, người thật gõ 2 hyphen
- **Không Oxford comma**: "a, b and c" thay vì "a, b, and c"
- **Typo nhẹ** không sửa: "definately", "alot", "tho" thay vì "though"
- **Ellipsis 2 chấm hoặc 4 chấm**: ".." hoặc "...." — AI luôn dùng đúng 3 dấu

---

## 5. Voice tells — người thật nghe như thế nào

| AI viết | Người viết |
|---|---|
| "Strength training tends to outperform cardio" | "lifting > cardio for me at least" |
| "Sleep deprivation raises ghrelin and lowers leptin" | "when i don't sleep i'm hungry all day, it's brutal" |
| "This addresses the underlying mechanism" | "this actually fixed it for me idk why" |
| "I would recommend prioritizing X" | "honestly just do X first" |
| Câu trả lời universal/general | Câu trả lời gắn với **trải nghiệm cá nhân cụ thể** |

**Quy luật vàng:** Người thật **kể chuyện của mình**, không **giải thích cơ chế**. Nếu thấy mình bắt đầu giải thích "why" — đó là dấu hiệu đang AI mode.

---

## 6. Reddit-native phrases (rải vào để natural)

- "tbh" / "tbf" / "ngl" / "idk" / "iirc"
- "this." (đứng riêng, đồng ý ngắn)
- "fair", "fair enough"
- "kinda" / "sorta"
- "tho" thay "though"
- "yeah no" hoặc "no yeah" (Gen Z signature)
- "for real" / "fr"
- "weirdly" / "oddly" / "for some reason"
- "low-key" / "high-key"
- "lol" / "lmao" giữa câu (vd: "and i was like lol no")
- Subreddit references: "as someone said in r/[X]"

---

## 7. Length & pacing

- Comment người thật **phần lớn ngắn** (<60 từ). Comment dài tự nhiên có:
  - Đoạn ngắt không đều — 1 câu, rồi 4 câu, rồi 2 câu
  - Tangent lạc đề rồi quay lại ("anyway,...", "back to your question,...")
  - Câu hỏi reverse cuối ("does that make sense?", "or is that just me?")
- AI viết đoạn **đều tăm tắp** — tránh

---

## 8. Khi farm karma → đa dạng style giữa các comment

Account bị nghi vì **mọi comment cùng 1 voice** (long, structured, stats-heavy). Khi farm nhiều comment trên 1 account:

- **Mix length**: 80% comment ngắn (<40 từ), 20% comment dài
- **Mix tone**: có comment empathetic ngắn ("oh god i feel this, hugs"), có comment hỏi lại OP, có comment kể chuyện
- **Đừng comment dài + structured 2 lần liên tiếp trên cùng thread** → đó là cái bị bắt
- **Personal anecdotes > advice**: "when i had X i did Y and..." khó nghi AI hơn "you should do Y"

---

## 9. Workflow đề xuất khi dùng AI hỗ trợ

1. Vào admin thread detail → bấm Copy prompt (rules đã được inject sẵn)
2. Paste vào ChatGPT/Claude → nó sẽ generate 3 options đã follow rules
3. **Đọc lại + thêm imperfection thủ công**: 1-2 lowercase chỗ đầu câu, đổi 1 dấu — thành --, thêm "tbh"/"idk", xóa 1 câu kết quá polished
4. Test: đọc to lên — nghe có giống chị nói chuyện với bạn không? Nếu nghe như viết bài blog → vẫn AI

---

## 10. Red flag check trước khi post

Trước khi nhấn "comment", scan lại:

- [ ] Có numbered list không? → bỏ
- [ ] Có cụm "downstream of"/"the actual lever"/"the framing" không? → đổi
- [ ] Có 3+ stats cụ thể không? → giảm còn 1, hedge nó
- [ ] Có câu mở/kết kiểu "great point" / "hope this helps"? → bỏ
- [ ] Câu có đều tăm tắp không? → ngắt 1 câu cụt vào
- [ ] Có chữ hoa đầu mỗi câu không? → lowercase 50% đi
- [ ] Có anecdote cá nhân ("when i...") không? → nếu không có → thêm vào hoặc rút ngắn comment
- [ ] Em-dash (—) không? → đổi sang `--`

---

## Bottom line

Comment người thật có **friction, mood, và personal stake**. AI viết **smooth, neutral, generic helpful**. Nhồi friction (typo, lowercase, ngắt cụt) và stake (trải nghiệm cá nhân cụ thể) vào → khó bị flag.

## Source / Case study

- Thread r/PCOS analysis (2026-05-03): account u/Mysterious-Spare6047 bị flag bởi u/shwoopypadawan và u/makkkz vì pattern numbered lists + stats + structured advice xuyên suốt nhiều comment trên cùng thread.
- Học được: structure consistency across comments là red flag lớn hơn một comment đơn lẻ.

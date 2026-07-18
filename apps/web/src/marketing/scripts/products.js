// Ecosystem canvas
const canvas = document.getElementById('ecoCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); drawEco(); });

  const nodes = [
    { id: 'KGC', label: 'KGC', sub: 'Group', x: 0.5, y: 0.5, r: 28, color: '#FF4500', core: true },
    { id: 'KP', label: 'KemisPay', sub: 'Payments', x: 0.18, y: 0.28, r: 18, color: '#FF4500' },
    { id: 'LB', label: 'LawBey', sub: 'Legal Tech', x: 0.82, y: 0.28, r: 18, color: '#6200FF' },
    { id: 'KE', label: 'KemisEMAIL', sub: 'Email', x: 0.15, y: 0.68, r: 18, color: '#FF4500' },
    { id: 'PI', label: 'PileIt', sub: 'Streaming', x: 0.85, y: 0.68, r: 17, color: '#0047FF' },
    { id: 'GB', label: 'GrandBridge', sub: 'Commerce', x: 0.35, y: 0.82, r: 16, color: '#00C896' },
    { id: 'KR', label: 'KRM Desk', sub: 'Operations', x: 0.68, y: 0.18, r: 17, color: '#0047FF' },
  ];

  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
    [1,6],[3,6],[5,1],[3,1]
  ];

  let hovered = null;
  let tick = 0;

  function getNodePos(n) {
    return { x: n.x * canvas.width, y: n.y * canvas.height };
  }

  function drawEco() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tick++;

    edges.forEach(([a, b]) => {
      const pa = getNodePos(nodes[a]);
      const pb = getNodePos(nodes[b]);
      const pulse = (Math.sin(tick * 0.04 + a * 0.8) + 1) / 2;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.strokeStyle = `rgba(255,255,255,${0.04 + pulse * 0.04})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      const t = ((tick * 0.008 + a * 0.3) % 1);
      const dx = pb.x - pa.x, dy = pb.y - pa.y;
      const dotX = pa.x + dx * t;
      const dotY = pa.y + dy * t;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
      ctx.fillStyle = nodes[a].color + '88';
      ctx.fill();
    });

    nodes.forEach((n, i) => {
      const { x, y } = getNodePos(n);
      const isHov = hovered === i;
      const pulse = n.core ? (Math.sin(tick * 0.05) + 1) / 2 : 0;

      if (n.core) {
        ctx.beginPath();
        ctx.arc(x, y, n.r + 10 + pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = n.color + '22';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (isHov) {
        ctx.beginPath();
        ctx.arc(x, y, n.r + 8, 0, Math.PI * 2);
        ctx.strokeStyle = n.color + '55';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(x, y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = '#0D0F12';
      ctx.fill();
      ctx.strokeStyle = isHov ? n.color : n.color + '66';
      ctx.lineWidth = isHov ? 2 : 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, n.core ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      ctx.font = `500 11px 'DM Sans', sans-serif`;
      ctx.fillStyle = isHov ? '#EDECEA' : '#8A8884';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, x, y + n.r + 16);

      if (isHov) {
        ctx.font = `400 10px 'DM Mono', monospace`;
        ctx.fillStyle = n.color;
        ctx.fillText(n.sub, x, y + n.r + 28);
      }
    });

    requestAnimationFrame(drawEco);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    hovered = null;
    nodes.forEach((n, i) => {
      const { x, y } = getNodePos(n);
      if (Math.hypot(mx - x, my - y) < n.r + 8) hovered = i;
    });
  });

  canvas.addEventListener('mouseleave', () => { hovered = null; });

  drawEco();
}

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // 发送邮件用

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// 处理表单提交
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // 发送邮件（需配置邮箱服务）
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user: '你的邮箱', pass: '密码或应用专用密码' }
  });

  const mailOptions = {
    from: email
    to: '你的邮箱'
    subject: 新留言来自 {name}
    text: message
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      	res.status(500).send('发送失败');
    	} 
	else {
      	res.send('留言成功！');
    	}
  }
}

app.listen(3000, () => console.log('Server running on port 3000'));
















// 1. 平滑滚动导航
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// 2. 搜索功能增强
const searchBox = document.querySelector('.search-box input');
searchBox.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    // 示例：高亮匹配内容
    document.querySelectorAll('article').forEach(article => {
        const text = article.textContent.toLowerCase();
        article.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

// 3. 移动端侧边栏切换
const sidebarToggle = document.createElement('button');
sidebarToggle.textContent = '☰';
sidebarToggle.className = 'sidebar-toggle';
document.body.appendChild(sidebarToggle);

sidebarToggle.addEventListener('click', () => {
    document.querySelector('aside').classList.toggle('active');
    sidebarToggle.classList.toggle('active');
});

// 4. 动态内容加载
window.addEventListener('DOMContentLoaded', () => {
    // 模拟异步加载
    setTimeout(() => {
        const mainContent = document.querySelector('main');
        mainContent.innerHTML += `
            <article>
                <h3>下次再来吧</h3>
                <p>...</p>
            </article>
        `;
    }, 1000);
});

// 5. 复制联系方式
document.querySelector('footer p').addEventListener('click', function() {
    const text = this.textContent.split(': ')[1];
    navigator.clipboard.writeText(text).then(() => {
        alert('联系方式已复制到剪贴板');
    });
});

// 6. 滚动头部效果
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// 7. 响应式处理
function handleResponsive() {
    const aside = document.querySelector('aside');
    if (window.innerWidth <= 768) {
        aside.classList.remove('active');
        sidebarToggle.style.display = 'block';
    } else {
        aside.classList.add('active');
        sidebarToggle.style.display = 'none';
    }
}

// 添加触摸事件支持
let touchStartX = 0;
let touchEndX = 0;
const slider = document.querySelector('.content-slider');

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const delta = touchEndX - touchStartX;
  if (Math.abs(delta) < 50) return; // 忽略微小滑动
  
  const currentIndex = Array.from(sections).findIndex(s => 
    s.classList.contains('active')
  );
  
  if (delta < 0 && currentIndex < sections.length - 1) {
    // 向左滑动：切换到下一项
    navLinks[currentIndex + 1].click();
  } else if (delta > 0 && currentIndex > 0) {
    // 向右滑动：切换到上一项
    navLinks[currentIndex - 1].click();
  }
}



// 获取所有导航链接和内容区块
const navLinks = document.querySelectorAll('.top-nav a:not(.search-box a)');
const sections = document.querySelectorAll('.content-slider section');

// 初始化默认显示第一个区块
sections[0].classList.add('active');
navLinks[0].classList.add('active');

// 点击导航切换内容
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // 1. 移除旧的激活状态
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    
    // 2. 获取目标区块索引
    const targetId = link.getAttribute('href').replace('#', '');
    const targetSection = document.getElementById(targetId);
    
    // 3. 添加新激活状态
    link.classList.add('active');
    targetSection.classList.add('active');
    
    // 4. 计算横向滑动距离
    const slider = document.querySelector('.content-slider');
    const index = Array.from(sections).indexOf(targetSection);
    slider.style.transform = `translateX(-${index * 100}%)`;
  });
});


window.addEventListener('resize', handleResponsive);
handleResponsive(); // 初始化





// 课表


// 自动高亮当天列
        const today = new Date().getDay(); // 0=周日, 1=周一...5=周五
        if(today >= 1 && today <= 5) {
            const rows = document.querySelectorAll('tr');
            rows.forEach(row => {
                if(row.children[today]) {
                    row.children[today].style.backgroundColor = '#e8f4ff';
                }
            });
        }
        
        let currentColor = '#2ecc71';
    let timetableData = [];

    // 初始化表格
    function initTable() {
        const days = ['星期一', '星期二', '星期三', '星期四', '星期五'];
        const times = ['08:00-09:40', '10:00-11:40', '14:00-15:40', '16:00-17:40'];
        
        // 从本地存储加载数据
        const savedData = localStorage.getItem('timetable');
        if(savedData) {
            timetableData = JSON.parse(savedData);
        } else {
            // 初始化默认数据
            timetableData = times.map(time => 
                Array(days.length).fill({content: '', color: currentColor})
            );
        }

        renderTable();
    }

    // 渲染表格
    function renderTable() {
        const table = document.getElementById('timetable');
        table.innerHTML = '';

        // 创建表头
        const headerRow = table.insertRow();
        headerRow.innerHTML = '<th>时间</th>' + 
            Array(timetableData[0].length).fill().map((_,i) => 
                `<th contenteditable="true" onblur="updateDay(this, ${i})">星期${i+1}</th>`
            ).join('');

        // 创建数据行
        timetableData.forEach((rowData, rowIndex) => {
            const tr = table.insertRow();
            tr.innerHTML = `
                <td class="time-column" contenteditable="true" onblur="updateTime(this, ${rowIndex})">
                    ${rowData.time || '点击设置时间'}
                </td>
                ${rowData.map((cell, colIndex) => `
                    <td class="editable" 
                        onclick="startEdit(this, ${rowIndex}, ${colIndex})"
                        style="background-color:${cell.color}">
                        ${cell.content.replace(/\n/g, '<br>')}
                    </td>
                `).join('')}
            `;
        });
    }

    // 开始编辑单元格
    function startEdit(td, row, col) {
        const cell = timetableData[row][col];
        td.innerHTML = `
            <textarea style="width:100%; height:100%; border:none; padding:5px;">
                ${cell.content}
            </textarea>
        `;
        td.querySelector('textarea').focus();
        td.querySelector('textarea').addEventListener('blur', function() {
            cell.content = this.value;
            td.style.backgroundColor = cell.color;
            td.innerHTML = cell.content.replace(/\n/g, '<br>');
        });
    }

    // 颜色选择
    function selectColor(element) {
        document.querySelectorAll('.color-picker').forEach(p => 
            p.classList.remove('selected-color'));
        element.classList.add('selected-color');
        currentColor = element.style.backgroundColor;
    }

    // 保存数据
    function saveTimetable() {
        localStorage.setItem('timetable', JSON.stringify(timetableData));
        alert('保存成功！');
    }

    // 添加时间段
    function addRow() {
        timetableData.push(Array(timetableData[0].length).fill({
            content: '', 
            color: currentColor
        }));
        renderTable();
    }

    // 添加星期
    function addColumn() {
        timetableData.forEach(row => row.push({
            content: '',
            color: currentColor
        }));
        renderTable();
    }

    // 初始化
    initTable();

    function deleteRow(rowIndex) {
        timetableData.splice(rowIndex, 1);
        renderTable();
    }
    
    function deleteColumn(colIndex) {
        timetableData.forEach(row => row.splice(colIndex, 1));
        renderTable();
    }




    function exportData() {
        const dataStr = JSON.stringify(timetableData);
        const blob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'timetable.json';
        a.click();
    }
    
    function importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = e => {
                timetableData = JSON.parse(e.target.result);
                renderTable();
            };
            reader.readAsText(file);
        };
        input.click();
    }




// 在编辑框中添加类型选择下拉菜单
function startEdit(td, row, col) {
    const cell = timetableData[row][col];
    td.innerHTML = `
        <div style="position: relative;">
            <textarea style="width:100%; height:80%;">${cell.content}</textarea>
            <select style="width:100%; margin-top:5px;" 
                    onchange="cell.type = this.value">
                <option value="">选择课程类型</option>
                <option value="major">专业课</option>
                <option value="public">公共课</option>
                <option value="elective">选修课</option>
            </select>
        </div>
    `;
}



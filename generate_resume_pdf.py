import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_resume():
    # Define output path in static directory
    static_dir = os.path.join('portfolio', 'static', 'resume')
    os.makedirs(static_dir, exist_ok=True)
    pdf_path = os.path.join(static_dir, 'siddhi_thale_resume.pdf')
    
    # Page setup - tight margins to fit everything beautifully on a single page
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    story = []
    
    # Curated modern color scheme
    PRIMARY_COLOR = colors.HexColor('#0F172A')  # Slate 900 (Main headings)
    SECONDARY_COLOR = colors.HexColor('#475569') # Slate 600 (Meta text / dates)
    TEXT_COLOR = colors.HexColor('#1E293B')      # Slate 800 (Body text)
    ACCENT_COLOR = colors.HexColor('#6366F1')    # Indigo (Accent highlights)
    LINE_COLOR = colors.HexColor('#E2E8F0')      # Slate 200 (Dividers)
    
    # Styles Setup
    styles = getSampleStyleSheet()
    
    name_style = ParagraphStyle(
        'Name',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=PRIMARY_COLOR,
        alignment=TA_CENTER
    )
    
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=ACCENT_COLOR,
        alignment=TA_CENTER
    )
    
    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=SECONDARY_COLOR,
        alignment=TA_CENTER
    )
    
    section_title_style = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=PRIMARY_COLOR,
        spaceBefore=6,
        spaceAfter=2
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=TEXT_COLOR
    )
    
    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=TEXT_COLOR,
        leftIndent=12,
        firstLineIndent=-6
    )
    
    # 1. Header
    story.append(Paragraph("Siddhi Thale", name_style))
    story.append(Paragraph("FULL STACK DEVELOPER", title_style))
    story.append(Spacer(1, 2))
    
    contact_text = "Navi Mumbai &bull; siddhithale01@gmail.com &bull; +91 7020789219 &bull; <font color='#6366F1'>linkedin.com/in/siddhi-thale</font> &bull; <font color='#6366F1'>github.com/SiddhiThale</font>"
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY_COLOR, spaceAfter=6))
    
    # 2. Summary
    story.append(Paragraph("Summary", section_title_style))
    summary_text = "Self-driven Full Stack Web Developer skilled in Python, JavaScript, Django, and React.js. Experienced in developing scalable backend systems, interactive frontend interfaces, and REST APIs. Dedicated to building efficient, production-ready applications and continuously enhancing development skills through real projects."
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))
    
    # 3. Projects
    story.append(Paragraph("Projects", section_title_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=4))
    
    # Project 1
    p1_title = "<b>AS-Mart &ndash; Online Grocery Shop</b> &bull; <font color='#6366F1'>Django, Python, MySQL, HTML, CSS, JavaScript</font>"
    p1_date = "<b>2025</b>"
    t1 = Table([[Paragraph(p1_title, body_style), Paragraph(p1_date, ParagraphStyle('Date1', parent=body_style, alignment=TA_RIGHT))]], colWidths=[460, 80])
    t1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t1)
    
    p1_bullets = [
        "Developed a full-stack e-commerce platform using Django with user registration, shopping cart, and checkout flow.",
        "Implemented secure customer authentication, session management, and database logs tracking.",
        "Designed highly responsive visual grids and layouts using HTML, CSS, and custom JavaScript.",
        "Optimized SQLite/MySQL query structures via Django ORM to improve page load speed by 25%.",
        "Configured custom admin dashboard parameters for streamlined product lists and order tracking."
    ]
    for bullet in p1_bullets:
        story.append(Paragraph(f"&bull;&nbsp;&nbsp;{bullet}", bullet_style))
    story.append(Spacer(1, 4))
    
    # Project 2
    p2_title = "<b>Ideal Classes &ndash; E-learning Management System</b> &bull; <font color='#6366F1'>Django, Python, MySQL, Bootstrap</font>"
    p2_date = "<b>2026</b>"
    t2 = Table([[Paragraph(p2_title, body_style), Paragraph(p2_date, ParagraphStyle('Date2', parent=body_style, alignment=TA_RIGHT))]], colWidths=[460, 80])
    t2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t2)
    
    p2_bullets = [
        "Developed a responsive student dashboard portal featuring academic lecture hubs and fees tracking logs.",
        "Implemented role-based dashboard authentication panels securing student and instructor account paths.",
        "Built seamless video streaming pipelines, downloadable file catalogs, and structural progress metrics.",
        "Integrated high-speed search filters to allow rapid indexing of academic notes database entries."
    ]
    for bullet in p2_bullets:
        story.append(Paragraph(f"&bull;&nbsp;&nbsp;{bullet}", bullet_style))
    story.append(Spacer(1, 4))

    # Project 3
    p3_title = "<b>Amazon Homepage Clone</b> &bull; <font color='#6366F1'>HTML5, CSS3, JavaScript</font>"
    p3_date = "<b>2024</b>"
    t3 = Table([[Paragraph(p3_title, body_style), Paragraph(p3_date, ParagraphStyle('Date3', parent=body_style, alignment=TA_RIGHT))]], colWidths=[460, 80])
    t3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t3)
    
    p3_bullets = [
        "Built a responsive replica of Amazon's visual storefront homepage using CSS grid and Flexbox systems.",
        "Created an interactive product category carousel slider utilizing vanilla JavaScript logic controllers.",
        "Designed clean custom hover cards, visual menu dropdowns, and responsive navigation anchors."
    ]
    for bullet in p3_bullets:
        story.append(Paragraph(f"&bull;&nbsp;&nbsp;{bullet}", bullet_style))
    story.append(Spacer(1, 4))

    # 4. Technical Skills
    story.append(Paragraph("Technical Skills", section_title_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=4))
    
    skills_data = [
        [Paragraph("<b>Languages:</b> HTML5, CSS3, JavaScript, Python, MySQL", body_style)],
        [Paragraph("<b>Frameworks & Libraries:</b> Django, React.js, Bootstrap 5", body_style)],
        [Paragraph("<b>Development Tools:</b> VS Code, MySQL Workbench, PyCharm, Git, GitHub", body_style)],
        [Paragraph("<b>AI Tools:</b> GitHub Copilot", body_style)],
        [Paragraph("<b>Soft Skills:</b> Clear Communication, Analytical Problem Solving, Leadership, Teamwork", body_style)]
    ]
    t_skills = Table(skills_data, colWidths=[540])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 4))

    # 5. Education
    story.append(Paragraph("Education", section_title_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=4))
    
    edu_data = [
        [
            Paragraph("<b>Chhatrapati Shivaji Maharaj University, Panvel</b><br/>B.Tech in Computer Science &mdash; SGPA: 8.66 (7th SEM)", body_style),
            Paragraph("<b>2022 &ndash; 2026</b>", ParagraphStyle('EduDate1', parent=body_style, alignment=TA_RIGHT))
        ],
        [
            Paragraph("<b>Sarvajanik Vidyamandir, Pen</b><br/>HSC Class 12 &mdash; Percentage: 62.40%", body_style),
            Paragraph("<b>2021 &ndash; 2022</b>", ParagraphStyle('EduDate2', parent=body_style, alignment=TA_RIGHT))
        ]
    ]
    t_edu = Table(edu_data, colWidths=[440, 100])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 4))

    # 6. Certifications
    story.append(Paragraph("Certifications", section_title_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE_COLOR, spaceAfter=4))
    
    story.append(Paragraph("&bull;&nbsp;&nbsp;<b>Full Stack Development Internship</b> &ndash; InLighnx (Database mapping, workflows, and REST integrations)", bullet_style))
    story.append(Paragraph("&bull;&nbsp;&nbsp;<b>Full Stack Development Course</b> &ndash; Quastech (Intensive Python, Django models/views, and UI layout architecture)", bullet_style))

    # Build PDF
    doc.build(story)
    print("Resume PDF successfully generated in portfolio/static/resume/siddhi_thale_resume.pdf!")

if __name__ == '__main__':
    create_resume()

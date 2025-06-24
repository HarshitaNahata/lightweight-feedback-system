import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generatePDF(feedbacks) {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Feedback Report', 14, 22);

    const tableColumn = ['Date', 'Employee', 'Strengths', 'Areas for Improvement', 'Sentiment', 'Tags'];
    const tableRows = [];

    feedbacks.forEach(feedback => {
        const feedbackData = [
            feedback.date,
            feedback.employeeName || 'N/A',
            feedback.strengths,
            feedback.areas,
            feedback.sentiment,
            feedback.tags ? feedback.tags.join(', ') : ''
        ];
        tableRows.push(feedbackData);
    });

    // Correct usage of autoTable
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        styles: { fontSize: 10 },
        headStyles: { fillColor: '#1976d2', textColor: '#fff' }
    });

    doc.save('feedback_report.pdf');
}

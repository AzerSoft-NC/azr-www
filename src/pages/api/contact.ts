export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { Resend } from 'resend';
import siteConfig from '@/config/site.config';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.email('Adresse courriel invalide'),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(5000),
  honeypot: z.string().max(0), // Anti-spam: must be empty
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const data = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      subject: formData.get('subject')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      honeypot: formData.get('honeypot')?.toString() || '',
    };

    // Validate
    const result = contactSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const error of result.error.issues) {
        const field = error.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(error.message);
      }

      return new Response(JSON.stringify({ success: false, errors: fieldErrors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Honeypot check (bot detection)
    if (result.data.honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email via Resend
    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return new Response(
        JSON.stringify({
          success: false,
          errors: { form: ["L'envoi de courriels n'est pas configuré sur le serveur."] },
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(apiKey);

    const toEmail = siteConfig.email;
    const fromEmail = import.meta.env.RESEND_FROM_EMAIL || toEmail;
    const siteLabel = siteConfig.name;

    const subject = result.data.subject
      ? `[${siteLabel}] ${result.data.subject}`
      : `[${siteLabel}] Nouveau message de ${result.data.name}`;

    const { error } = await resend.emails.send({
      from: `Formulaire de contact <${fromEmail}>`,
      to: toEmail,
      replyTo: result.data.email,
      subject,
      html: `
        <p><strong>Nom :</strong> ${result.data.name}</p>
        <p><strong>Courriel :</strong> ${result.data.email}</p>
        <p><strong>Message :</strong></p>
        <p>${result.data.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          errors: { form: [error.message || "L'envoi du courriel a échoué"] },
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        errors: { form: ['Une erreur inattendue est survenue. Veuillez réessayer.'] },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

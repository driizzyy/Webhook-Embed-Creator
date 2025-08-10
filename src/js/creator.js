// Discord Embed Creator JavaScript
class DiscordEmbedCreator {
    constructor() {
        this.embedData = {
            webhook: {
                url: '',
                username: 'Webhook Bot',
                avatarUrl: ''
            },
            content: '',
            embed: {
                title: '',
                description: '',
                url: '',
                color: 0x5865f2,
                author: {
                    name: '',
                    url: '',
                    iconUrl: ''
                },
                thumbnail: {
                    url: ''
                },
                image: {
                    url: ''
                },
                fields: [],
                footer: {
                    text: '',
                    iconUrl: ''
                },
                timestamp: null
            }
        };
        
        this.fieldCounter = 0;
        this.maxFields = 25; // Discord's limit
        this.init();
    }

    init() {
        this.bindEvents();
        this.updatePreview();
        this.loadSavedTemplates();
    }

    bindEvents() {
        // Webhook settings
        document.getElementById('webhook-url').addEventListener('input', (e) => {
            this.embedData.webhook.url = e.target.value;
            this.validateWebhookUrl(e.target.value);
        });

        document.getElementById('webhook-username').addEventListener('input', (e) => {
            this.embedData.webhook.username = e.target.value || 'Webhook Bot';
            this.updatePreview();
        });

        document.getElementById('webhook-avatar').addEventListener('input', (e) => {
            this.embedData.webhook.avatarUrl = e.target.value;
            this.updatePreview();
        });

        // Message content
        const messageContent = document.getElementById('message-content');
        messageContent.addEventListener('input', (e) => {
            this.embedData.content = e.target.value;
            this.updateCharCounter('message-counter', e.target.value.length, 2000);
            this.updatePreview();
        });

        // Embed basic info
        document.getElementById('embed-title').addEventListener('input', (e) => {
            this.embedData.embed.title = e.target.value;
            this.updateCharCounter('title-counter', e.target.value.length, 256);
            this.updatePreview();
        });

        document.getElementById('embed-description').addEventListener('input', (e) => {
            this.embedData.embed.description = e.target.value;
            this.updateCharCounter('description-counter', e.target.value.length, 4096);
            this.updatePreview();
        });

        document.getElementById('embed-url').addEventListener('input', (e) => {
            this.embedData.embed.url = e.target.value;
            this.updatePreview();
        });

        // Color handling
        const colorInput = document.getElementById('embed-color');
        const colorHex = document.getElementById('embed-color-hex');
        
        colorInput.addEventListener('input', (e) => {
            const hex = e.target.value;
            colorHex.value = hex;
            this.embedData.embed.color = parseInt(hex.replace('#', ''), 16);
            this.updatePreview();
        });

        colorHex.addEventListener('input', (e) => {
            const hex = e.target.value;
            if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                colorInput.value = hex;
                this.embedData.embed.color = parseInt(hex.replace('#', ''), 16);
                this.updatePreview();
            }
        });

        // Color presets
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                colorInput.value = color;
                colorHex.value = color;
                this.embedData.embed.color = parseInt(color.replace('#', ''), 16);
                this.updateColorPresetActive(e.target);
                this.updatePreview();
            });
        });

        // Toggle sections
        this.bindToggleSection('author');
        this.bindToggleSection('thumbnail');
        this.bindToggleSection('image');
        this.bindToggleSection('footer');

        // Author fields
        document.getElementById('author-name').addEventListener('input', (e) => {
            this.embedData.embed.author.name = e.target.value;
            this.updatePreview();
        });

        document.getElementById('author-url').addEventListener('input', (e) => {
            this.embedData.embed.author.url = e.target.value;
            this.updatePreview();
        });

        document.getElementById('author-icon').addEventListener('input', (e) => {
            this.embedData.embed.author.iconUrl = e.target.value;
            this.updatePreview();
        });

        // Thumbnail
        document.getElementById('thumbnail-url').addEventListener('input', (e) => {
            this.embedData.embed.thumbnail.url = e.target.value;
            this.updatePreview();
        });

        // Image
        document.getElementById('image-url').addEventListener('input', (e) => {
            this.embedData.embed.image.url = e.target.value;
            this.updatePreview();
        });

        // Footer
        document.getElementById('footer-text').addEventListener('input', (e) => {
            this.embedData.embed.footer.text = e.target.value;
            this.updatePreview();
        });

        document.getElementById('footer-icon').addEventListener('input', (e) => {
            this.embedData.embed.footer.iconUrl = e.target.value;
            this.updatePreview();
        });

        document.getElementById('footer-timestamp').addEventListener('change', (e) => {
            this.embedData.embed.timestamp = e.target.checked ? new Date().toISOString() : null;
            this.updatePreview();
        });

        // Fields
        document.getElementById('add-field').addEventListener('click', () => {
            this.addField();
        });

        // Actions
        document.getElementById('send-embed').addEventListener('click', () => {
            this.sendEmbed();
        });

        document.getElementById('save-template').addEventListener('click', () => {
            this.showSaveModal();
        });

        document.getElementById('load-template').addEventListener('click', () => {
            this.showLoadModal();
        });

        document.getElementById('export-json').addEventListener('click', () => {
            this.exportJSON();
        });

        // Preview theme toggle
        document.getElementById('preview-light').addEventListener('click', () => {
            this.setPreviewTheme('light');
        });

        document.getElementById('preview-dark').addEventListener('click', () => {
            this.setPreviewTheme('dark');
        });

        // Modal events
        this.bindModalEvents();
    }

    bindToggleSection(section) {
        const toggle = document.getElementById(`${section}-enabled`);
        const dependentFields = document.querySelectorAll(`[data-depends="${section}-enabled"]`);

        toggle.addEventListener('change', (e) => {
            dependentFields.forEach(field => {
                if (e.target.checked) {
                    field.classList.add('enabled');
                } else {
                    field.classList.remove('enabled');
                }
            });

            // Clear data if disabled
            if (!e.target.checked) {
                this.clearSectionData(section);
            }

            this.updatePreview();
        });
    }

    clearSectionData(section) {
        switch (section) {
            case 'author':
                this.embedData.embed.author = { name: '', url: '', iconUrl: '' };
                break;
            case 'thumbnail':
                this.embedData.embed.thumbnail = { url: '' };
                break;
            case 'image':
                this.embedData.embed.image = { url: '' };
                break;
            case 'footer':
                this.embedData.embed.footer = { text: '', iconUrl: '' };
                this.embedData.embed.timestamp = null;
                break;
        }
    }

    updateCharCounter(counterId, current, max) {
        const counter = document.getElementById(counterId);
        counter.textContent = current;
        
        const parent = counter.parentElement;
        parent.classList.remove('warning', 'error');
        
        if (current > max * 0.9) {
            parent.classList.add('warning');
        }
        if (current > max) {
            parent.classList.add('error');
        }
    }

    updateColorPresetActive(activePreset) {
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.classList.remove('active');
        });
        activePreset.classList.add('active');
    }

    validateWebhookUrl(url) {
        const webhookRegex = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/;
        const input = document.getElementById('webhook-url');
        
        if (url && !webhookRegex.test(url)) {
            input.style.borderColor = 'var(--danger-color)';
            this.showNotification('Invalid webhook URL format', 'error');
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    }

    addField() {
        if (this.embedData.embed.fields.length >= this.maxFields) {
            this.showNotification(`Maximum ${this.maxFields} fields allowed`, 'warning');
            return;
        }

        const fieldId = ++this.fieldCounter;
        const field = {
            name: '',
            value: '',
            inline: false
        };

        this.embedData.embed.fields.push(field);

        const fieldElement = this.createFieldElement(fieldId, field);
        document.getElementById('fields-container').appendChild(fieldElement);

        this.updatePreview();
    }

    createFieldElement(fieldId, field) {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'field-item';
        fieldDiv.dataset.fieldId = fieldId;

        fieldDiv.innerHTML = `
            <div class="field-header">
                <h4><i class="fas fa-grip-vertical"></i> Field ${fieldId}</h4>
                <button class="field-remove" onclick="embedCreator.removeField(${fieldId})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="form-group">
                <label>Field Name *</label>
                <input type="text" class="field-name" placeholder="Field name..." maxlength="256" required>
                <div class="char-counter"><span class="field-name-counter">0</span>/256</div>
            </div>
            <div class="form-group">
                <label>Field Value *</label>
                <textarea class="field-value" placeholder="Field value..." rows="3" maxlength="1024" required></textarea>
                <div class="char-counter"><span class="field-value-counter">0</span>/1024</div>
            </div>
            <div class="field-inline-toggle">
                <label class="toggle-switch">
                    <input type="checkbox" class="field-inline">
                    <span class="slider"></span>
                    Inline Field
                </label>
            </div>
        `;

        // Bind events for the new field
        const nameInput = fieldDiv.querySelector('.field-name');
        const valueInput = fieldDiv.querySelector('.field-value');
        const inlineInput = fieldDiv.querySelector('.field-inline');

        nameInput.addEventListener('input', (e) => {
            const index = this.getFieldIndex(fieldId);
            if (index !== -1) {
                this.embedData.embed.fields[index].name = e.target.value;
                this.updateCharCounter(fieldDiv.querySelector('.field-name-counter'), e.target.value.length, 256);
                this.updatePreview();
            }
        });

        valueInput.addEventListener('input', (e) => {
            const index = this.getFieldIndex(fieldId);
            if (index !== -1) {
                this.embedData.embed.fields[index].value = e.target.value;
                this.updateCharCounter(fieldDiv.querySelector('.field-value-counter'), e.target.value.length, 1024);
                this.updatePreview();
            }
        });

        inlineInput.addEventListener('change', (e) => {
            const index = this.getFieldIndex(fieldId);
            if (index !== -1) {
                this.embedData.embed.fields[index].inline = e.target.checked;
                this.updatePreview();
            }
        });

        return fieldDiv;
    }

    removeField(fieldId) {
        const index = this.getFieldIndex(fieldId);
        if (index !== -1) {
            this.embedData.embed.fields.splice(index, 1);
            document.querySelector(`[data-field-id="${fieldId}"]`).remove();
            this.updatePreview();
        }
    }

    getFieldIndex(fieldId) {
        const fieldElement = document.querySelector(`[data-field-id="${fieldId}"]`);
        if (!fieldElement) return -1;
        
        const allFields = document.querySelectorAll('.field-item');
        return Array.from(allFields).indexOf(fieldElement);
    }

    updateCharCounter(element, current, max) {
        if (typeof element === 'string') {
            element = document.querySelector(`.${element}`);
        }
        if (element) {
            element.textContent = current;
            
            const parent = element.parentElement;
            parent.classList.remove('warning', 'error');
            
            if (current > max * 0.9) {
                parent.classList.add('warning');
            }
            if (current > max) {
                parent.classList.add('error');
            }
        }
    }

    updatePreview() {
        // Update webhook info
        const usernameEl = document.getElementById('preview-username');
        const avatarEl = document.getElementById('preview-avatar');
        
        usernameEl.textContent = this.embedData.webhook.username || 'Webhook Bot';
        avatarEl.src = this.embedData.webhook.avatarUrl || 'https://cdn.discordapp.com/embed/avatars/0.png';

        // Update message content
        const messageTextEl = document.getElementById('preview-text');
        if (this.embedData.content) {
            messageTextEl.textContent = this.embedData.content;
            messageTextEl.style.display = 'block';
        } else {
            messageTextEl.style.display = 'none';
        }

        // Update embed
        this.updateEmbedPreview();
    }

    updateEmbedPreview() {
        const embedEl = document.getElementById('preview-embed');
        const embed = this.embedData.embed;

        // Check if embed has any content
        const hasContent = embed.title || embed.description || embed.author.name || 
                          embed.thumbnail.url || embed.image.url || embed.fields.length > 0 || 
                          embed.footer.text;

        if (!hasContent) {
            embedEl.style.display = 'none';
            return;
        }

        embedEl.style.display = 'block';
        embedEl.style.borderLeftColor = `#${embed.color.toString(16).padStart(6, '0')}`;

        let embedHTML = '<div class="embed-content">';

        // Author
        if (embed.author.name) {
            embedHTML += '<div class="embed-author">';
            if (embed.author.iconUrl) {
                embedHTML += `<img src="${this.escapeHtml(embed.author.iconUrl)}" class="embed-author-icon" alt="Author Icon">`;
            }
            if (embed.author.url) {
                embedHTML += `<a href="${this.escapeHtml(embed.author.url)}" target="_blank" class="embed-author-name">${this.escapeHtml(embed.author.name)}</a>`;
            } else {
                embedHTML += `<span class="embed-author-name">${this.escapeHtml(embed.author.name)}</span>`;
            }
            embedHTML += '</div>';
        }

        // Thumbnail
        if (embed.thumbnail.url) {
            embedHTML += `<img src="${this.escapeHtml(embed.thumbnail.url)}" class="embed-thumbnail" alt="Thumbnail">`;
        }

        // Title
        if (embed.title) {
            const titleClass = embed.url ? 'embed-title clickable' : 'embed-title';
            if (embed.url) {
                embedHTML += `<a href="${this.escapeHtml(embed.url)}" target="_blank" class="${titleClass}">${this.escapeHtml(embed.title)}</a>`;
            } else {
                embedHTML += `<div class="${titleClass}">${this.escapeHtml(embed.title)}</div>`;
            }
        }

        // Description
        if (embed.description) {
            embedHTML += `<div class="embed-description">${this.escapeHtml(embed.description).replace(/\n/g, '<br>')}</div>`;
        }

        // Fields
        if (embed.fields.length > 0) {
            embedHTML += '<div class="embed-fields">';
            embed.fields.forEach(field => {
                if (field.name && field.value) {
                    const fieldClass = field.inline ? 'embed-field inline' : 'embed-field';
                    embedHTML += `
                        <div class="${fieldClass}">
                            <div class="embed-field-name">${this.escapeHtml(field.name)}</div>
                            <div class="embed-field-value">${this.escapeHtml(field.value).replace(/\n/g, '<br>')}</div>
                        </div>
                    `;
                }
            });
            embedHTML += '</div>';
        }

        // Image
        if (embed.image.url) {
            embedHTML += `<img src="${this.escapeHtml(embed.image.url)}" class="embed-image" alt="Embed Image">`;
        }

        // Footer
        if (embed.footer.text || embed.timestamp) {
            embedHTML += '<div class="embed-footer">';
            if (embed.footer.iconUrl) {
                embedHTML += `<img src="${this.escapeHtml(embed.footer.iconUrl)}" class="embed-footer-icon" alt="Footer Icon">`;
            }
            let footerText = '';
            if (embed.footer.text) {
                footerText += this.escapeHtml(embed.footer.text);
            }
            if (embed.timestamp) {
                if (footerText) footerText += ' • ';
                footerText += new Date(embed.timestamp).toLocaleString();
            }
            embedHTML += `<span>${footerText}</span>`;
            embedHTML += '</div>';
        }

        embedHTML += '</div>';
        embedEl.innerHTML = embedHTML;
    }

    setPreviewTheme(theme) {
        const preview = document.getElementById('discord-preview');
        const lightBtn = document.getElementById('preview-light');
        const darkBtn = document.getElementById('preview-dark');

        if (theme === 'light') {
            preview.classList.add('light');
            lightBtn.classList.add('active');
            darkBtn.classList.remove('active');
        } else {
            preview.classList.remove('light');
            darkBtn.classList.add('active');
            lightBtn.classList.remove('active');
        }
    }

    async sendEmbed() {
        if (!this.embedData.webhook.url) {
            this.showNotification('Please enter a webhook URL', 'error');
            return;
        }

        const webhookRegex = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/;
        if (!webhookRegex.test(this.embedData.webhook.url)) {
            this.showNotification('Invalid webhook URL format', 'error');
            return;
        }

        // Validate embed has content
        const embed = this.embedData.embed;
        const hasEmbedContent = embed.title || embed.description || embed.author.name || 
                               embed.thumbnail.url || embed.image.url || embed.fields.length > 0 || 
                               embed.footer.text;

        if (!this.embedData.content && !hasEmbedContent) {
            this.showNotification('Please add some content to your message or embed', 'warning');
            return;
        }

        const sendButton = document.getElementById('send-embed');
        const originalText = sendButton.innerHTML;
        sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        sendButton.disabled = true;

        try {
            const payload = {
                username: this.embedData.webhook.username,
                avatar_url: this.embedData.webhook.avatarUrl || undefined
            };

            if (this.embedData.content) {
                payload.content = this.embedData.content;
            }

            if (hasEmbedContent) {
                payload.embeds = [this.buildEmbedPayload()];
            }

            const response = await fetch(this.embedData.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                this.showNotification('Embed sent successfully!', 'success');
            } else {
                const error = await response.text();
                console.error('Webhook error:', error);
                this.showNotification('Failed to send embed. Check webhook URL.', 'error');
            }
        } catch (error) {
            console.error('Send error:', error);
            this.showNotification('Network error. Please try again.', 'error');
        } finally {
            sendButton.innerHTML = originalText;
            sendButton.disabled = false;
        }
    }

    buildEmbedPayload() {
        const embed = { ...this.embedData.embed };
        
        // Clean up empty values
        if (!embed.title) delete embed.title;
        if (!embed.description) delete embed.description;
        if (!embed.url) delete embed.url;
        if (!embed.author.name) delete embed.author;
        if (!embed.thumbnail.url) delete embed.thumbnail;
        if (!embed.image.url) delete embed.image;
        if (!embed.footer.text && !embed.timestamp) delete embed.footer;
        if (embed.fields.length === 0) delete embed.fields;

        // Filter out empty fields
        if (embed.fields) {
            embed.fields = embed.fields.filter(field => field.name && field.value);
        }

        return embed;
    }

    exportJSON() {
        const payload = {
            webhook: this.embedData.webhook,
            content: this.embedData.content || undefined,
            embeds: []
        };

        const embedPayload = this.buildEmbedPayload();
        if (Object.keys(embedPayload).length > 1) { // More than just color
            payload.embeds.push(embedPayload);
        }

        const dataStr = JSON.stringify(payload, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'discord-embed.json';
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('JSON exported successfully!', 'success');
    }

    // Template management
    showSaveModal() {
        document.getElementById('save-modal').classList.add('show');
        document.getElementById('template-name').focus();
    }

    showLoadModal() {
        document.getElementById('load-modal').classList.add('show');
        this.loadSavedTemplates();
    }

    saveTemplate() {
        const name = document.getElementById('template-name').value.trim();
        if (!name) {
            this.showNotification('Please enter a template name', 'warning');
            return;
        }

        const templates = JSON.parse(localStorage.getItem('discordEmbedTemplates') || '[]');
        const template = {
            id: Date.now(),
            name: name,
            data: JSON.parse(JSON.stringify(this.embedData)),
            created: new Date().toISOString()
        };

        templates.push(template);
        localStorage.setItem('discordEmbedTemplates', JSON.stringify(templates));

        this.hideModal('save-modal');
        this.showNotification('Template saved successfully!', 'success');
        document.getElementById('template-name').value = '';
    }

    loadSavedTemplates() {
        const templates = JSON.parse(localStorage.getItem('discordEmbedTemplates') || '[]');
        const container = document.getElementById('templates-list');

        if (templates.length === 0) {
            container.innerHTML = '<div class="no-templates">No saved templates found.</div>';
            return;
        }

        container.innerHTML = templates.map(template => `
            <div class="template-item" onclick="embedCreator.loadTemplate(${template.id})">
                <h4>${this.escapeHtml(template.name)}</h4>
                <p>${template.data.embed.title || template.data.content || 'No title'}</p>
                <div class="template-date">Created: ${new Date(template.created).toLocaleDateString()}</div>
                <div class="template-actions">
                    <button class="template-delete" onclick="event.stopPropagation(); embedCreator.deleteTemplate(${template.id})">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadTemplate(id) {
        const templates = JSON.parse(localStorage.getItem('discordEmbedTemplates') || '[]');
        const template = templates.find(t => t.id === id);

        if (!template) {
            this.showNotification('Template not found', 'error');
            return;
        }

        // Clear existing fields
        document.getElementById('fields-container').innerHTML = '';
        this.fieldCounter = 0;

        // Load template data
        this.embedData = JSON.parse(JSON.stringify(template.data));

        // Update form fields
        this.populateForm();
        this.updatePreview();

        this.hideModal('load-modal');
        this.showNotification('Template loaded successfully!', 'success');
    }

    deleteTemplate(id) {
        if (!confirm('Are you sure you want to delete this template?')) return;

        const templates = JSON.parse(localStorage.getItem('discordEmbedTemplates') || '[]');
        const filtered = templates.filter(t => t.id !== id);
        localStorage.setItem('discordEmbedTemplates', JSON.stringify(filtered));

        this.loadSavedTemplates();
        this.showNotification('Template deleted', 'success');
    }

    populateForm() {
        // Webhook settings
        document.getElementById('webhook-url').value = this.embedData.webhook.url || '';
        document.getElementById('webhook-username').value = this.embedData.webhook.username || 'Webhook Bot';
        document.getElementById('webhook-avatar').value = this.embedData.webhook.avatarUrl || '';

        // Message content
        document.getElementById('message-content').value = this.embedData.content || '';

        // Embed basic info
        document.getElementById('embed-title').value = this.embedData.embed.title || '';
        document.getElementById('embed-description').value = this.embedData.embed.description || '';
        document.getElementById('embed-url').value = this.embedData.embed.url || '';

        // Color
        const colorHex = `#${this.embedData.embed.color.toString(16).padStart(6, '0')}`;
        document.getElementById('embed-color').value = colorHex;
        document.getElementById('embed-color-hex').value = colorHex;

        // Author
        const authorEnabled = this.embedData.embed.author.name;
        document.getElementById('author-enabled').checked = authorEnabled;
        this.toggleDependentFields('author-enabled', authorEnabled);
        document.getElementById('author-name').value = this.embedData.embed.author.name || '';
        document.getElementById('author-url').value = this.embedData.embed.author.url || '';
        document.getElementById('author-icon').value = this.embedData.embed.author.iconUrl || '';

        // Thumbnail
        const thumbnailEnabled = this.embedData.embed.thumbnail.url;
        document.getElementById('thumbnail-enabled').checked = thumbnailEnabled;
        this.toggleDependentFields('thumbnail-enabled', thumbnailEnabled);
        document.getElementById('thumbnail-url').value = this.embedData.embed.thumbnail.url || '';

        // Image
        const imageEnabled = this.embedData.embed.image.url;
        document.getElementById('image-enabled').checked = imageEnabled;
        this.toggleDependentFields('image-enabled', imageEnabled);
        document.getElementById('image-url').value = this.embedData.embed.image.url || '';

        // Footer
        const footerEnabled = this.embedData.embed.footer.text || this.embedData.embed.timestamp;
        document.getElementById('footer-enabled').checked = footerEnabled;
        this.toggleDependentFields('footer-enabled', footerEnabled);
        document.getElementById('footer-text').value = this.embedData.embed.footer.text || '';
        document.getElementById('footer-icon').value = this.embedData.embed.footer.iconUrl || '';
        document.getElementById('footer-timestamp').checked = !!this.embedData.embed.timestamp;

        // Fields
        this.embedData.embed.fields.forEach((field, index) => {
            this.addField();
            const fieldElement = document.querySelector(`[data-field-id="${this.fieldCounter}"]`);
            fieldElement.querySelector('.field-name').value = field.name;
            fieldElement.querySelector('.field-value').value = field.value;
            fieldElement.querySelector('.field-inline').checked = field.inline;
        });
    }

    toggleDependentFields(toggleId, enabled) {
        const dependentFields = document.querySelectorAll(`[data-depends="${toggleId}"]`);
        dependentFields.forEach(field => {
            if (enabled) {
                field.classList.add('enabled');
            } else {
                field.classList.remove('enabled');
            }
        });
    }

    // Modal management
    bindModalEvents() {
        // Save modal
        document.getElementById('modal-save').addEventListener('click', () => {
            this.saveTemplate();
        });

        document.getElementById('modal-cancel').addEventListener('click', () => {
            this.hideModal('save-modal');
        });

        // Load modal
        document.getElementById('modal-close-load').addEventListener('click', () => {
            this.hideModal('load-modal');
        });

        // Close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal.id);
            });
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target.id);
            }
        });

        // Enter key in template name
        document.getElementById('template-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveTemplate();
            }
        });
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const icon = notification.querySelector('.notification-icon');
        const messageEl = notification.querySelector('.notification-message');

        // Set icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        icon.className = `notification-icon ${icons[type] || icons.info}`;
        messageEl.textContent = message;

        // Set notification type
        notification.className = `notification ${type}`;
        
        // Show notification
        notification.classList.add('show');

        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Utility function
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the embed creator
let embedCreator;
document.addEventListener('DOMContentLoaded', () => {
    embedCreator = new DiscordEmbedCreator();
    console.log('🚀 Discord Embed Creator initialized!');
});

namespace Activities
{
    partial class InscriptionActivities
    {
        /// <summary>
        /// Variable nécessaire au concepteur.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Nettoyage des ressources utilisées.
        /// </summary>
        /// <param name="disposing">true si les ressources managées doivent être supprimées ; sinon, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Code généré par le Concepteur Windows Form

        /// <summary>
        /// Méthode requise pour la prise en charge du concepteur - ne modifiez pas
        /// le contenu de cette méthode avec l'éditeur de code.
        /// </summary>
        private void InitializeComponent()
        {
            this.BtnRegister = new System.Windows.Forms.Button();
            this.InscriptionBox = new System.Windows.Forms.GroupBox();
            this.PasswordRepeatInput = new System.Windows.Forms.TextBox();
            this.PasswordRepeatLabel = new System.Windows.Forms.Label();
            this.EmailInput = new System.Windows.Forms.TextBox();
            this.PasswordInput = new System.Windows.Forms.TextBox();
            this.PasswordLabel = new System.Windows.Forms.Label();
            this.EmailLabel = new System.Windows.Forms.Label();
            this.InscriptionBox.SuspendLayout();
            this.SuspendLayout();
            // 
            // BtnRegister
            // 
            this.BtnRegister.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.BtnRegister.ForeColor = System.Drawing.SystemColors.ControlText;
            this.BtnRegister.Location = new System.Drawing.Point(95, 300);
            this.BtnRegister.Name = "BtnRegister";
            this.BtnRegister.Size = new System.Drawing.Size(108, 33);
            this.BtnRegister.TabIndex = 0;
            this.BtnRegister.Text = "S\'inscrire";
            this.BtnRegister.UseVisualStyleBackColor = true;
            this.BtnRegister.Click += new System.EventHandler(this.BtnRegister_Click);
            // 
            // InscriptionBox
            // 
            this.InscriptionBox.Controls.Add(this.PasswordRepeatInput);
            this.InscriptionBox.Controls.Add(this.PasswordRepeatLabel);
            this.InscriptionBox.Controls.Add(this.EmailInput);
            this.InscriptionBox.Controls.Add(this.BtnRegister);
            this.InscriptionBox.Controls.Add(this.PasswordInput);
            this.InscriptionBox.Controls.Add(this.PasswordLabel);
            this.InscriptionBox.Controls.Add(this.EmailLabel);
            this.InscriptionBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.InscriptionBox.Location = new System.Drawing.Point(154, 28);
            this.InscriptionBox.Name = "InscriptionBox";
            this.InscriptionBox.Padding = new System.Windows.Forms.Padding(10);
            this.InscriptionBox.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.InscriptionBox.Size = new System.Drawing.Size(300, 400);
            this.InscriptionBox.TabIndex = 1;
            this.InscriptionBox.TabStop = false;
            this.InscriptionBox.Text = "Inscription";
            this.InscriptionBox.Enter += new System.EventHandler(this.groupBox1_Enter);
            // 
            // PasswordRepeatInput
            // 
            this.PasswordRepeatInput.Location = new System.Drawing.Point(13, 207);
            this.PasswordRepeatInput.Name = "PasswordRepeatInput";
            this.PasswordRepeatInput.Size = new System.Drawing.Size(268, 31);
            this.PasswordRepeatInput.TabIndex = 5;
            // 
            // PasswordRepeatLabel
            // 
            this.PasswordRepeatLabel.AutoSize = true;
            this.PasswordRepeatLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.PasswordRepeatLabel.Location = new System.Drawing.Point(13, 188);
            this.PasswordRepeatLabel.Name = "PasswordRepeatLabel";
            this.PasswordRepeatLabel.Size = new System.Drawing.Size(157, 16);
            this.PasswordRepeatLabel.TabIndex = 4;
            this.PasswordRepeatLabel.Text = "Répétez le mot de passe";
            // 
            // EmailInput
            // 
            this.EmailInput.Location = new System.Drawing.Point(13, 68);
            this.EmailInput.Name = "EmailInput";
            this.EmailInput.Size = new System.Drawing.Size(268, 31);
            this.EmailInput.TabIndex = 3;
            // 
            // PasswordInput
            // 
            this.PasswordInput.Location = new System.Drawing.Point(13, 137);
            this.PasswordInput.Name = "PasswordInput";
            this.PasswordInput.Size = new System.Drawing.Size(268, 31);
            this.PasswordInput.TabIndex = 2;
            // 
            // PasswordLabel
            // 
            this.PasswordLabel.AutoSize = true;
            this.PasswordLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.PasswordLabel.Location = new System.Drawing.Point(13, 118);
            this.PasswordLabel.Name = "PasswordLabel";
            this.PasswordLabel.Size = new System.Drawing.Size(174, 16);
            this.PasswordLabel.TabIndex = 1;
            this.PasswordLabel.Text = "Choisissez un mot de passe";
            // 
            // EmailLabel
            // 
            this.EmailLabel.AutoSize = true;
            this.EmailLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.EmailLabel.Location = new System.Drawing.Point(13, 49);
            this.EmailLabel.Name = "EmailLabel";
            this.EmailLabel.Size = new System.Drawing.Size(134, 16);
            this.EmailLabel.TabIndex = 0;
            this.EmailLabel.Text = "Saisissez votre email";
            // 
            // InscriptionActivities
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(580, 457);
            this.Controls.Add(this.InscriptionBox);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.MaximizeBox = false;
            this.Name = "InscriptionActivities";
            this.Padding = new System.Windows.Forms.Padding(50, 25, 50, 25);
            this.Text = "Inscription - Activities";
            this.InscriptionBox.ResumeLayout(false);
            this.InscriptionBox.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button BtnRegister;
        private System.Windows.Forms.GroupBox InscriptionBox;
        private System.Windows.Forms.TextBox EmailInput;
        private System.Windows.Forms.TextBox PasswordInput;
        private System.Windows.Forms.Label PasswordLabel;
        private System.Windows.Forms.Label EmailLabel;
        private System.Windows.Forms.TextBox PasswordRepeatInput;
        private System.Windows.Forms.Label PasswordRepeatLabel;
    }
}


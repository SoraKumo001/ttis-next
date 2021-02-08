import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FastifyReply } from 'fastify';
@Controller('files')
export class FilesController {
  constructor(private readonly service: FilesService) {}

  @Get(':id')
  async getTest(@Param('id') id: string, @Res() res: FastifyReply) {
    const { service } = this;
    const file = await service.getFile(id);
    if (!file) {
      res.status(404);
      res.raw.end('not found');
      return;
    }
    let httpDisposition = 'inline;';
    const fileName = file.name as string;
    const ext = fileName.split('.').pop();
    let contentType = 'application/octet-stream;';
    if (ext) {
      switch (ext.toLowerCase()) {
        case 'txt':
          contentType = 'text/plain';
          break;
        case 'html':
          contentType = 'text/html';
          break;
        case 'png':
          contentType = 'image/png';
          break;
        case 'svg':
          contentType = 'image/svg+xml';
          break;
        case 'jpeg':
        case 'jpg':
          contentType = 'image/jpeg';
          break;
        case 'gif':
          contentType = 'image/gif';
          break;
        default:
          httpDisposition = 'attachment;';
          break;
      }
    }
    res.header('Content-type', contentType);
    res.header('Content-length', (file.size as number).toString());
    res.header('Last-Modified', new Date(file.date).toUTCString());
    res.header(
      'Content-Disposition',
      `${httpDisposition} filename*=utf-8'jp'${encodeURI(fileName)}`,
    );
    res.raw.end(file.value, 'binary');
  }
}
